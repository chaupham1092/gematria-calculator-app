import React from 'react';
import { View, Text, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function DownloadPage() {
  const openAppStore = () => {
    Linking.openURL('https://apps.apple.com/us/app/gematria-calculator-decode/id6744337544');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Download Gematria Calculator App</Text>
      
      <View style={styles.content}>
        <Text style={styles.intro}>
          Unlock the power of numbers—our Gematria Calculator now supports major Hebrew and English ciphers, 
          with improved accuracy and custom cipher options!
        </Text>

        <View style={styles.downloadCards}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Gematria Calculator for iOS</Text>
            <Text style={styles.cardText}>
              Available now on the Apple App Store. Calculate gematria values instantly on your iPhone or iPad.
            </Text>
            <TouchableOpacity style={styles.iosButton} onPress={openAppStore}>
              <Text style={styles.buttonText}>Download for iOS</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Gematria Calculator for Android</Text>
            <Text style={styles.badge}>Coming Soon</Text>
            <Text style={styles.cardText}>
              Our Android version is currently in development. Sign up to be notified when it launches!
            </Text>
            <View style={[styles.androidButton, styles.comingSoon]}>
              <Text style={styles.buttonText}>Coming Soon</Text>
            </View>
          </View>
        </View>

        <Text style={styles.heading}>App Features</Text>
        <View style={styles.featureColumns}>
          <View style={styles.featureColumn}>
            <Text style={styles.bulletPoint}>• Supports Hebrew and English Ciphers</Text>
            <Text style={styles.bulletPoint}>• Real-time calculation as you type</Text>
            <Text style={styles.bulletPoint}>• Letter-by-letter breakdown of values</Text>
            <Text style={styles.bulletPoint}>• Multi-cipher comparison in one view</Text>
          </View>
          <View style={styles.featureColumn}>
            <Text style={styles.bulletPoint}>• Educational insights about each cipher</Text>
            <Text style={styles.bulletPoint}>• Request custom ciphers through the app</Text>
            <Text style={styles.bulletPoint}>• Clean, simple interface</Text>
            <Text style={styles.bulletPoint}>• Works offline - no internet needed</Text>
          </View>
        </View>

        <Text style={styles.paragraph}>
          Explore hidden meanings in words with the Gematria Calculator. This app makes it easy to calculate 
          the numerical value of any word or phrase using traditional gematria systems. Whether you're studying 
          ancient texts, exploring spiritual symbolism, or just curious, this tool helps you decode with accuracy 
          and ease.
        </Text>

        <Text style={styles.heading}>System Requirements</Text>
        <View style={styles.requirementsGrid}>
          <View style={styles.requirement}>
            <Text style={styles.requirementTitle}>iOS</Text>
            <Text style={styles.requirementText}>Requires iOS 14.0 or later</Text>
            <Text style={styles.requirementText}>Compatible with iPhone, iPad, and iPod touch</Text>
          </View>
          <View style={styles.requirement}>
            <Text style={styles.requirementTitle}>Android</Text>
            <Text style={styles.requirementText}>Will require Android 8.0 or later</Text>
            <Text style={styles.requirementText}>Coming in late 2025</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  content: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  intro: {
    fontSize: 18,
    lineHeight: 28,
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: 30,
    padding: 20,
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    textAlign: 'center',
  },
  downloadCards: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 40,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  badge: {
    backgroundColor: '#f39c12',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
  },
  iosButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  androidButton: {
    backgroundColor: '#34A853',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  comingSoon: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 40,
    marginBottom: 20,
  },
  featureColumns: {
    flexDirection: 'row',
    gap: 30,
    marginBottom: 30,
  },
  featureColumn: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
    marginBottom: 15,
    textAlign: 'justify',
  },
  requirementsGrid: {
    flexDirection: 'row',
    gap: 30,
    marginTop: 20,
  },
  requirement: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  requirementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  requirementText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 5,
  },
});
