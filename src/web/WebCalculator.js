import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { calculateGematria, getAvailableCiphers, getCipherCategories } from '../utils/calculator';
import { decodeCalculation } from '../utils/shareUtils';
import { decodeSharedCollection } from '../utils/researchStorage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DownloadPage from './pages/DownloadPage';
import ResearchCollection from './components/ResearchCollection';
import { saveToResearch } from '../utils/researchStorage';

export default function WebCalculator() {
  const [currentPage, setCurrentPage] = useState('home');
  const [inputText, setInputText] = useState('');
  const [selectedCiphers, setSelectedCiphers] = useState({});
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [allCiphers, setAllCiphers] = useState([]);
  const [categories, setCategories] = useState({});
  const [showResearch, setShowResearch] = useState(false);
  const [targetNumber, setTargetNumber] = useState('');

  // Initialize ciphers and categories
  useEffect(() => {
    const ciphersObj = getAvailableCiphers();
    const cats = getCipherCategories();

    // Convert ciphers object to array for easier iteration
    const ciphersArray = Object.keys(ciphersObj).map(key => ({
      key: key,
      ...ciphersObj[key]
    }));

    setAllCiphers(ciphersArray);

    // Convert categories object to proper format
    const categoriesFormatted = {};
    Object.keys(cats).forEach(category => {
      categoriesFormatted[category] = cats[category].map(cipherKey => {
        const cipher = ciphersObj[cipherKey];
        return {
          key: cipherKey,
          name: cipher.name,
          category: category
        };
      });
    });

    setCategories(categoriesFormatted);

    // Initialize selected ciphers - only select default 4 ciphers
    const defaultCiphers = [
      'English Ordinal',
      'Full Reduction',
      'Reverse Ordinal',
      'Reverse Full Reduction'
    ];

    const initial = {};
    ciphersArray.forEach(cipher => {
      initial[cipher.name] = defaultCiphers.includes(cipher.name);
    });
    setSelectedCiphers(initial);
  }, []);

  // Check for shared calculation in URL - run after ciphers are loaded
  useEffect(() => {
    if (allCiphers.length > 0) {
      handleSharedCalculation();
    }
  }, [allCiphers]);

  // Handle incoming shared calculations
  const handleSharedCalculation = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const calcParam = urlParams.get('calc');
      const collectionParam = urlParams.get('collection');

      console.log('Checking URL params:', { calcParam, collectionParam });

      if (calcParam) {
        const decoded = decodeCalculation(calcParam);
        if (decoded && decoded.text) {
          setInputText(decoded.text);

          // Update selected ciphers if provided
          if (decoded.ciphers && decoded.ciphers.length > 0) {
            const newSelection = {};
            allCiphers.forEach(cipher => {
              newSelection[cipher.name] = decoded.ciphers.includes(cipher.name);
            });
            setSelectedCiphers(newSelection);
          }
        }
      } else if (collectionParam) {
        console.log('Processing collection parameter...');

        // Handle shared collection - import and show research page
        const entries = decodeSharedCollection(collectionParam);
        console.log('Decoded entries:', entries);

        if (entries && entries.length > 0) {
          // Import all entries into localStorage
          const { saveToResearch } = require('../utils/researchStorage');

          entries.forEach(entry => {
            console.log('Processing entry:', entry);

            // Build cipher selection object
            const cipherSelection = {};
            allCiphers.forEach(cipher => {
              cipherSelection[cipher.name] = entry.ciphers && entry.ciphers.includes(cipher.name);
            });

            console.log('Cipher selection:', cipherSelection);

            // Calculate results for this entry using the same logic as the main calculator
            const results = calculateGematria(entry.text, cipherSelection);
            console.log('Calculated results:', results);

            // Save to research collection with calculated results
            saveToResearch(entry.text, cipherSelection, results, entry.note || '', entry.tags || []);
          });

          console.log('Navigating to research page...');
          // Navigate to research page
          setCurrentPage('research');

          // Clear URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    } catch (error) {
      console.error('Error loading shared calculation:', error);
    }
  };

  const handleLoadResearch = (text, ciphers) => {
    setInputText(text);
    setSelectedCiphers(ciphers);
    setCurrentPage('home'); // Go back to home page
  };

  const handleSaveToResearch = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to save');
      return;
    }

    // Make sure we have results calculated
    if (results.length === 0) {
      alert('Please wait for calculations to complete');
      return;
    }

    try {
      console.log('Saving to research:', {
        text: inputText,
        ciphers: selectedCiphers,
        resultsCount: results.length,
        sampleResult: results[0]
      });

      await saveToResearch(inputText, selectedCiphers, results, '', []);
      alert('Saved to Research List!');
    } catch (error) {
      alert(error.message);
    }
  };

  // Calculate results when input or selected ciphers change
  useEffect(() => {
    if (inputText.trim() && allCiphers.length > 0) {
      const results = calculateGematria(inputText, selectedCiphers);
      setResults(results);
    } else {
      setResults([]);
    }
  }, [inputText, selectedCiphers, allCiphers]);

  const toggleCipher = (cipherName) => {
    setSelectedCiphers(prev => ({
      ...prev,
      [cipherName]: !prev[cipherName]
    }));
  };

  const selectAll = () => {
    const all = {};
    allCiphers.forEach(cipher => {
      all[cipher.name] = true;
    });
    setSelectedCiphers(all);
  };

  const clearAll = () => {
    const none = {};
    allCiphers.forEach(cipher => {
      none[cipher.name] = false;
    });
    setSelectedCiphers(none);
  };

  const toggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Filter ciphers based on search
  const filteredCiphers = Object.keys(categories).reduce((acc, category) => {
    const filtered = categories[category].filter(cipher =>
      cipher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  // Filter results by target number if specified
  const filteredResults = targetNumber.trim()
    ? results.filter(result => result.totalValue.toString() === targetNumber.trim())
    : results;

  // Group results by category
  const groupedResults = filteredResults.reduce((acc, result) => {
    const category = result.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(result);
    return acc;
  }, {});

  const openPrivacyPolicy = () => {
    Linking.openURL('https://gematriacalculator.xyz/pages/privacy.html');
  };

  const openTerms = () => {
    Linking.openURL('https://gematriacalculator.xyz/pages/terms.html');
  };

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'research':
        return (
          <View style={styles.fullPageContent}>
            <ResearchCollection
              currentText={inputText}
              currentCiphers={selectedCiphers}
              currentResults={results}
              onLoadResearch={handleLoadResearch}
            />
          </View>
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'download':
        return <DownloadPage />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => {
    return (
      <View style={styles.mainContent}>
        {/* Left Sidebar - Filter Ciphers */}
        <View style={styles.leftSidebar}>
          <Text style={styles.sidebarTitle}>Filter Ciphers</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Search ciphers..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <View style={styles.filterActions}>
            <TouchableOpacity style={styles.actionButton} onPress={selectAll}>
              <Text style={styles.actionButtonText}>Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={clearAll}>
              <Text style={styles.actionButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.cipherList}>
            {Object.keys(filteredCiphers).map(category => (
              <View key={category}>
                <TouchableOpacity
                  style={styles.categoryHeader}
                  onPress={() => toggleCategory(category)}
                >
                  <Text style={styles.categoryHeaderText}>{category}</Text>
                  <Text style={styles.categoryArrow}>
                    {collapsedCategories[category] ? '▶' : '▼'}
                  </Text>
                </TouchableOpacity>

                {!collapsedCategories[category] && filteredCiphers[category].map(cipher => (
                  <TouchableOpacity
                    key={cipher.name}
                    style={styles.cipherItem}
                    onPress={() => toggleCipher(cipher.name)}
                  >
                    <View style={[
                      styles.checkbox,
                      selectedCiphers[cipher.name] && styles.checkboxChecked
                    ]}>
                      {selectedCiphers[cipher.name] && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.cipherName}>{cipher.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Center - Input and Results */}
        <View style={styles.centerContent}>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter text to calculate its gematria value across multiple ciphers..."
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={styles.saveToResearchButton}
              onPress={handleSaveToResearch}
            >
              <Text style={styles.saveToResearchButtonText}>💾 Save to Research List</Text>
            </TouchableOpacity>

            <View style={styles.filterSection}>
              <Text style={styles.filterLabel}>Filter by Number (optional):</Text>
              <TextInput
                style={styles.numberInput}
                placeholder="e.g., 33"
                value={targetNumber}
                onChangeText={setTargetNumber}
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={styles.resultsTitle}>Results</Text>
          <ScrollView style={styles.resultsSection}>
            {results.length === 0 ? (
              <Text style={styles.emptyText}>Enter text to see results</Text>
            ) : targetNumber.trim() && filteredResults.length === 0 ? (
              <View style={styles.noMatchContainer}>
                <Text style={styles.noMatchIcon}>🔍</Text>
                <Text style={styles.noMatchText}>No ciphers match the number {targetNumber}</Text>
                <Text style={styles.noMatchSubtext}>Try a different number or clear the filter</Text>
              </View>
            ) : (
              <View style={styles.resultsGrid}>
                {filteredResults.map((result, index) => (
                  <View key={index} style={styles.resultCard}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultCipherName}>{result.name}</Text>
                      <Text style={styles.resultCategory}>{result.category}</Text>
                      <Text style={styles.resultValue}>{result.totalValue}</Text>
                    </View>

                    {result.description && (
                      <Text style={styles.cipherDescription}>{result.description}</Text>
                    )}

                    <View style={styles.wordBreakdown}>
                      <Text style={styles.wordBreakdownTitle}>Word Breakdown:</Text>
                      {result.wordValues && result.wordValues.map((wordObj, wordIndex) => (
                        <View key={wordIndex} style={styles.wordItem}>
                          <View style={styles.wordHeader}>
                            <Text style={styles.wordText}>{wordObj.word}</Text>
                            <Text style={styles.wordValue}>{wordObj.value}</Text>
                          </View>
                          {result.letterBreakdowns && result.letterBreakdowns[wordIndex] && (
                            <Text style={styles.letterBreakdown}>{result.letterBreakdowns[wordIndex]}</Text>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>

        {/* Right Sidebar - Summary */}
        <View style={styles.rightSidebar}>
          <Text style={styles.sidebarTitle}>Summary</Text>
          <ScrollView style={styles.summaryList}>
            {results.length === 0 ? (
              <Text style={styles.emptyText}>Enter text to see summary</Text>
            ) : targetNumber.trim() && filteredResults.length === 0 ? (
              <Text style={styles.emptyText}>No matches for {targetNumber}</Text>
            ) : (
              Object.keys(groupedResults).map(category => (
                <View key={category}>
                  <TouchableOpacity
                    style={styles.summaryCategoryHeader}
                    onPress={() => toggleCategory(`summary-${category}`)}
                  >
                    <Text style={styles.summaryCategoryText}>{category}</Text>
                    <Text style={styles.categoryArrow}>
                      {collapsedCategories[`summary-${category}`] ? '▶' : '▼'}
                    </Text>
                  </TouchableOpacity>

                  {!collapsedCategories[`summary-${category}`] && groupedResults[category].map((result, index) => (
                    <View key={index} style={styles.summaryItem}>
                      <Text style={styles.summaryName}>{result.name}</Text>
                      <Text style={styles.summaryValue}>{result.totalValue}</Text>
                    </View>
                  ))}
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Navigation */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gematria Calculator</Text>
        <View style={styles.nav}>
          <TouchableOpacity onPress={() => {
            setCurrentPage('home');
            setShowResearch(false);
          }}>
            <Text style={[styles.navLink, currentPage === 'home' && styles.navLinkActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setCurrentPage('research');
            setShowResearch(false);
          }}>
            <Text style={[styles.navLink, currentPage === 'research' && styles.navLinkActive]}>Research List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setCurrentPage('about');
            setShowResearch(false);
          }}>
            <Text style={[styles.navLink, currentPage === 'about' && styles.navLinkActive]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setCurrentPage('contact');
            setShowResearch(false);
          }}>
            <Text style={[styles.navLink, currentPage === 'contact' && styles.navLinkActive]}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setCurrentPage('download');
            setShowResearch(false);
          }}>
            <Text style={[styles.navLink, currentPage === 'download' && styles.navLinkActive]}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Page Content */}
      {renderPage()}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Gematria Calculator © 2025</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={openPrivacyPolicy}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openTerms}>
            <Text style={styles.footerLink}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  nav: {
    flexDirection: 'row',
    gap: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  navLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  navLinkActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
  },
  fullPageContent: {
    flex: 1,
    padding: 20,
    maxWidth: 1400,
    alignSelf: 'center',
    width: '100%',
  },
  leftSidebar: {
    width: 250,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  rightSidebar: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 15,
    fontSize: 14,
  },
  filterActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  cipherList: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
    marginTop: 15,
    marginBottom: 5,
  },
  categoryHeaderText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2c3e50',
  },
  categoryArrow: {
    fontSize: 10,
    color: '#2c3e50',
  },
  cipherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginLeft: 10,
    borderRadius: 4,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3498db',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cipherName: {
    fontSize: 14,
    color: '#333',
  },
  centerContent: {
    width: 550,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  inputSection: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  saveToResearchButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveToResearchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  filterSection: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  noMatchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noMatchIcon: {
    fontSize: 48,
    marginBottom: 15,
  },
  noMatchText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 8,
  },
  noMatchSubtext: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultsSection: {
    flex: 1,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    padding: 15,
    marginBottom: 15,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  resultCipherName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  resultCategory: {
    backgroundColor: '#3498db',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    marginHorizontal: 10,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    minWidth: 60,
    textAlign: 'right',
  },
  cipherDescription: {
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
    padding: 6,
    backgroundColor: '#fafafa',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  wordBreakdown: {
    marginTop: 10,
  },
  wordBreakdownTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  wordItem: {
    backgroundColor: '#e8f4f8',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  wordText: {
    fontWeight: 'bold',
  },
  wordValue: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  letterBreakdown: {
    fontSize: 11,
    color: '#666',
  },
  summaryList: {
    flex: 1,
  },
  summaryCategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    padding: 8,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
    marginTop: 15,
    marginBottom: 5,
  },
  summaryCategoryText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2c3e50',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginLeft: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
    marginBottom: 8,
  },
  summaryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    backgroundColor: '#2c3e50',
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    marginBottom: 15,
  },
  footerLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerLink: {
    color: 'white',
    fontSize: 14,
  },
});
