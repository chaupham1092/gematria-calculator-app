document.addEventListener('DOMContentLoaded', function() {
    // Initialize the cipher system from Code 1
    Gem_Launch();

    // Get DOM elements
    const inputText = document.getElementById('input-text');
    const resultsContainer = document.getElementById('results-container');
    const summaryContainer = document.getElementById('summary-container');
    const selectAllBtn = document.getElementById('select-all-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const cipherFiltersContainer = document.getElementById('cipher-filters');
    const cipherSearchInput = document.getElementById('cipher-search');

    // New elements for enhanced functionality
    const themeSelect = document.getElementById('theme-select');
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeDisplay = document.getElementById('font-size-display');
    const targetNumberInput = document.getElementById('target-number');
    const clearTargetBtn = document.getElementById('clear-target-btn');
    const targetMatchesContainer = document.getElementById('target-matches');
    const targetMatchesList = document.getElementById('target-matches-list');
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    const saveWordBtn = document.getElementById('save-word-btn');
    const savedWordsBtn = document.getElementById('saved-words-btn');
    const toggleViewBtn = document.getElementById('toggle-view-btn');
    const comparisonBtn = document.getElementById('comparison-btn');
    const comparisonContainer = document.getElementById('comparison-container');
    const comparisonText1 = document.getElementById('comparison-text-1');
    const comparisonText2 = document.getElementById('comparison-text-2');
    const comparisonResults1 = document.getElementById('comparison-results-1');
    const comparisonResults2 = document.getElementById('comparison-results-2');

    // Store selected ciphers using cipher names
    let selectedCiphers = {};

    // Application state
    let currentTheme = 'light';
    let isCompactView = false;
    let isComparisonMode = false;
    let targetNumber = null;
    let textHistory = [];
    let historyIndex = -1;
    let savedWords = JSON.parse(localStorage.getItem('gematria-saved-words') || '[]');
    let customCipherNames = JSON.parse(localStorage.getItem('gematria-custom-names') || '{}');
    let customCiphers = JSON.parse(localStorage.getItem('gematria-custom-ciphers') || '[]');

    // Theme Management Functions
    function applyTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('gematria-theme', theme);

        if (theme === 'custom') {
            showCustomThemeModal();
        }
    }

    function applyFontSettings() {
        const fontFamily = fontFamilySelect.value;
        const fontSize = fontSizeSlider.value;

        let fontFamilyValue;
        switch(fontFamily) {
            case 'serif': fontFamilyValue = 'Georgia, serif'; break;
            case 'monospace': fontFamilyValue = 'Consolas, monospace'; break;
            case 'arial': fontFamilyValue = 'Arial, sans-serif'; break;
            case 'times': fontFamilyValue = 'Times New Roman, serif'; break;
            default: fontFamilyValue = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }

        document.documentElement.style.setProperty('--font-family', fontFamilyValue);
        document.documentElement.style.setProperty('--font-size', fontSize + 'px');
        fontSizeDisplay.textContent = fontSize + 'px';

        localStorage.setItem('gematria-font-family', fontFamily);
        localStorage.setItem('gematria-font-size', fontSize);
    }

    function showCustomThemeModal() {
        const modal = document.getElementById('custom-theme-modal');
        modal.classList.remove('hidden');
    }

    // Text History Management
    function addToHistory(text) {
        if (historyIndex < textHistory.length - 1) {
            textHistory = textHistory.slice(0, historyIndex + 1);
        }
        textHistory.push(text);
        historyIndex = textHistory.length - 1;
        updateUndoRedoButtons();
    }

    function updateUndoRedoButtons() {
        undoBtn.disabled = historyIndex <= 0;
        redoBtn.disabled = historyIndex >= textHistory.length - 1;
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            inputText.value = textHistory[historyIndex];
            updateUndoRedoButtons();
            calculateGematria();
        }
    }

    function redo() {
        if (historyIndex < textHistory.length - 1) {
            historyIndex++;
            inputText.value = textHistory[historyIndex];
            updateUndoRedoButtons();
            calculateGematria();
        }
    }

    // Target Number Management
    function checkTargetMatches(results) {
        if (!targetNumber) {
            targetMatchesContainer.classList.add('hidden');
            return;
        }

        const matches = results.filter(result => result.totalValue === targetNumber);

        if (matches.length > 0) {
            targetMatchesContainer.classList.remove('hidden');
            targetMatchesList.innerHTML = matches.map(match =>
                `<span class="target-match-item">${match.name}</span>`
            ).join('');

            // Highlight matching result items
            setTimeout(() => {
                const resultItems = document.querySelectorAll('.cipher-result');
                resultItems.forEach(item => {
                    const cipherName = item.querySelector('.cipher-name').textContent;
                    if (matches.some(match => match.name === cipherName)) {
                        item.classList.add('target-match');
                    } else {
                        item.classList.remove('target-match');
                    }
                });
            }, 100);
        } else {
            targetMatchesContainer.classList.add('hidden');
            // Remove all target match highlights
            setTimeout(() => {
                const resultItems = document.querySelectorAll('.cipher-result');
                resultItems.forEach(item => item.classList.remove('target-match'));
            }, 100);
        }
    }

    // Saved Words Management
    function saveCurrentWord() {
        const text = inputText.value.trim();
        if (!text) return;

        if (!savedWords.includes(text)) {
            savedWords.push(text);
            localStorage.setItem('gematria-saved-words', JSON.stringify(savedWords));
            showNotification('Word saved successfully!');
        } else {
            showNotification('Word already saved!');
        }
    }

    function showSavedWordsModal() {
        const modal = document.getElementById('saved-words-modal');
        const savedWordsList = document.getElementById('saved-words-list');

        savedWordsList.innerHTML = savedWords.map((word, index) => `
            <div class="saved-word-item">
                <span class="saved-word-text" onclick="useWord('${word.replace(/'/g, "\\'")}')">${word}</span>
                <div class="saved-word-actions">
                    <button class="use-word-btn" onclick="useWord('${word.replace(/'/g, "\\'")}')">Use</button>
                    <button class="delete-word-btn" onclick="deleteSavedWord(${index})">Delete</button>
                </div>
            </div>
        `).join('');

        modal.classList.remove('hidden');
    }

    function useWord(word) {
        inputText.value = word;
        addToHistory(word);
        calculateGematria();
        document.getElementById('saved-words-modal').classList.add('hidden');
    }

    function deleteSavedWord(index) {
        savedWords.splice(index, 1);
        localStorage.setItem('gematria-saved-words', JSON.stringify(savedWords));
        showSavedWordsModal(); // Refresh the modal
    }

    function clearAllSavedWords() {
        savedWords = [];
        localStorage.setItem('gematria-saved-words', JSON.stringify(savedWords));
        showSavedWordsModal(); // Refresh the modal
    }

    // View Management
    function toggleView() {
        isCompactView = !isCompactView;
        const mainContent = document.querySelector('.main-content');

        if (isCompactView) {
            mainContent.classList.add('compact');
            toggleViewBtn.textContent = 'Expanded View';
        } else {
            mainContent.classList.remove('compact');
            toggleViewBtn.textContent = 'Compact View';
        }
    }

    function toggleComparison() {
        isComparisonMode = !isComparisonMode;

        if (isComparisonMode) {
            comparisonContainer.classList.remove('hidden');
            comparisonBtn.textContent = 'Hide Comparison';
            comparisonBtn.classList.add('active');
        } else {
            comparisonContainer.classList.add('hidden');
            comparisonBtn.textContent = 'Side-by-Side';
            comparisonBtn.classList.remove('active');
        }
    }

    // Utility Functions
    function showNotification(message) {
        // Simple notification system
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--success-color);
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Cipher Management Functions
    function showCipherManagementModal() {
        const modal = document.getElementById('cipher-management-modal');
        populateRenameSystemsList();
        modal.classList.remove('hidden');
    }

    function populateRenameSystemsList() {
        const container = document.getElementById('rename-systems-list');
        container.innerHTML = '';

        allCiphers.forEach((cipher, index) => {
            const originalName = cipher.Nickname;
            const displayName = customCipherNames[originalName] || originalName;
            const category = cipherArray[originalName] || "Other";

            const item = document.createElement('div');
            item.className = 'rename-system-item';
            item.innerHTML = `
                <input type="text" class="system-name-input" value="${displayName}"
                       data-original="${originalName}" onblur="updateCipherName(this)">
                <span class="system-category">${category}</span>
            `;

            container.appendChild(item);
        });
    }

    function updateCipherName(input) {
        const originalName = input.dataset.original;
        const newName = input.value.trim();

        if (newName && newName !== originalName) {
            customCipherNames[originalName] = newName;
            localStorage.setItem('gematria-custom-names', JSON.stringify(customCipherNames));

            // Update the cipher display name
            const cipher = allCiphers.find(c => c.Nickname === originalName);
            if (cipher) {
                cipher.DisplayName = newName;
            }

            // Refresh the filters and recalculate
            populateCipherFilters();
            calculateGematria();
            showNotification('System renamed successfully!');
        }
    }

    function setupCustomSystemCreation() {
        const systemTypeSelect = document.getElementById('custom-system-type');
        const customValuesSection = document.getElementById('custom-values-section');
        const customValuesGrid = document.getElementById('custom-values-grid');

        systemTypeSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customValuesSection.classList.remove('hidden');
                populateCustomValuesGrid();
            } else {
                customValuesSection.classList.add('hidden');
            }
        });

        function populateCustomValuesGrid() {
            customValuesGrid.innerHTML = '';
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            for (let i = 0; i < alphabet.length; i++) {
                const letter = alphabet[i];
                const item = document.createElement('div');
                item.className = 'custom-value-item';
                item.innerHTML = `
                    <label>${letter}</label>
                    <input type="number" min="0" max="999" value="${i + 1}" data-letter="${letter}">
                `;
                customValuesGrid.appendChild(item);
            }
        }
    }

    function createCustomSystem() {
        const nameInput = document.getElementById('custom-system-name');
        const typeSelect = document.getElementById('custom-system-type');
        const systemName = nameInput.value.trim();
        const systemType = typeSelect.value;

        if (!systemName) {
            showNotification('Please enter a system name!');
            return;
        }

        // Check if name already exists
        const existingNames = allCiphers.map(c => c.DisplayName || c.Nickname);
        if (existingNames.includes(systemName)) {
            showNotification('A system with this name already exists!');
            return;
        }

        let values = {};
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        switch (systemType) {
            case 'ordinal':
                for (let i = 0; i < alphabet.length; i++) {
                    values[alphabet[i]] = i + 1;
                }
                break;
            case 'reverse':
                for (let i = 0; i < alphabet.length; i++) {
                    values[alphabet[i]] = 26 - i;
                }
                break;
            case 'reduction':
                for (let i = 0; i < alphabet.length; i++) {
                    values[alphabet[i]] = ((i % 9) + 1);
                }
                break;
            case 'custom':
                const customInputs = document.querySelectorAll('#custom-values-grid input');
                customInputs.forEach(input => {
                    const letter = input.dataset.letter;
                    const value = parseInt(input.value) || 0;
                    values[letter] = value;
                });
                break;
        }

        // Create the custom cipher object
        const customCipher = {
            name: systemName,
            type: systemType,
            values: values,
            created: new Date().toISOString()
        };

        customCiphers.push(customCipher);
        localStorage.setItem('gematria-custom-ciphers', JSON.stringify(customCiphers));

        // Add to allCiphers array
        const newCipher = new cipher(systemName, "Custom", 128, 0, 128);
        newCipher.CustomValues = values;
        newCipher.IsCustom = true;

        // Override the Gematria method for custom cipher
        newCipher.Gematria = function(text, type) {
            let total = 0;
            for (let i = 0; i < text.length; i++) {
                const char = text[i].toUpperCase();
                if (this.CustomValues[char]) {
                    total += this.CustomValues[char];
                }
            }
            return total;
        };

        allCiphers.push(newCipher);
        cipherArray[systemName] = "Other";

        // Refresh UI
        populateCipherFilters();
        document.getElementById('cipher-management-modal').classList.add('hidden');
        showNotification('Custom system created successfully!');

        // Reset form
        resetCustomForm();
    }

    function resetCustomForm() {
        document.getElementById('custom-system-name').value = '';
        document.getElementById('custom-system-type').value = 'ordinal';
        document.getElementById('custom-values-section').classList.add('hidden');
    }

    // Populate cipher filters using the new cipher system
    function populateCipherFilters() {
        cipherFiltersContainer.innerHTML = '';

        // Group ciphers by category using the new system
        const categories = {};

        // Initialize categories from catArr
        for (let i = 0; i < catArr.length; i++) {
            categories[catArr[i]] = [];
        }

        // Group ciphers by their category
        for (let i = 0; i < allCiphers.length; i++) {
            const cipher = allCiphers[i];
            const category = cipherArray[cipher.Nickname] || "Other";

            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push(cipher);
        }

        // Create category sections and add ciphers
        for (const category in categories) {
            if (categories[category].length === 0) continue;

            // Create category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'cipher-category-header';
            categoryHeader.textContent = category;
            categoryHeader.dataset.category = category;
            cipherFiltersContainer.appendChild(categoryHeader);

            // Create container for category items
            const categoryItemsContainer = document.createElement('div');
            categoryItemsContainer.className = 'cipher-category-items';
            categoryItemsContainer.dataset.category = category;
            cipherFiltersContainer.appendChild(categoryItemsContainer);

            // Add click event to toggle category items
            categoryHeader.addEventListener('click', function(e) {
                // Prevent checkbox clicks from triggering this
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'LABEL') {
                    return;
                }

                const categoryItems = document.querySelector(`.cipher-category-items[data-category="${category}"]`);
                if (categoryItems.style.display === 'none') {
                    categoryItems.style.display = 'block';
                    this.classList.remove('collapsed');
                } else {
                    categoryItems.style.display = 'none';
                    this.classList.add('collapsed');
                }
            });

            // Add ciphers for this category
            categories[category].forEach(cipher => {
                const cipherName = cipher.Nickname;

                // Create filter item
                const filterItem = document.createElement('div');
                filterItem.className = 'cipher-filter-item';

                // Create checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = cipherName.replace(/\s+/g, '-').toLowerCase();
                checkbox.checked = openCiphers.includes(cipherName); // Use openCiphers from Code 1

                // Create label
                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                // Use custom name if available
                const displayName = customCipherNames[cipherName] || cipherName;
                label.textContent = displayName;

                // Add to filter item
                filterItem.appendChild(checkbox);
                filterItem.appendChild(label);

                // Add to category container
                categoryItemsContainer.appendChild(filterItem);

                // Store initial state
                selectedCiphers[cipherName] = checkbox.checked;

                // Add event listener
                checkbox.addEventListener('change', function() {
                    selectedCiphers[cipherName] = this.checked;
                    calculateGematria();
                });
            });
        }
    }

    // Initialize by selecting all ciphers
    function initializeFilters() {
        populateCipherFilters();

        // Add event listeners to buttons
        selectAllBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.cipher-filter-item input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
                // Find cipher name from label
                const label = checkbox.nextElementSibling;
                const cipherName = label.textContent;
                selectedCiphers[cipherName] = true;
            });
            calculateGematria();
        });

        clearAllBtn.addEventListener('click', function() {
            const checkboxes = document.querySelectorAll('.cipher-filter-item input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                // Find cipher name from label
                const label = checkbox.nextElementSibling;
                const cipherName = label.textContent;
                selectedCiphers[cipherName] = false;
            });
            calculateGematria();
        });

        // Add select all and clear all buttons for each category
        document.querySelectorAll('.cipher-category-header').forEach(header => {
            const categoryName = header.dataset.category;

            // Add right-click functionality to toggle all ciphers in that category
            header.addEventListener('contextmenu', function(e) {
                e.preventDefault(); // Prevent the default context menu

                const categoryContainer = document.querySelector(`.cipher-category-items[data-category="${categoryName}"]`);

                if (!categoryContainer) return;

                const categoryItems = categoryContainer.querySelectorAll('.cipher-filter-item');

                // Check if all items are checked
                const allChecked = Array.from(categoryItems).every(item =>
                    item.querySelector('input[type="checkbox"]').checked
                );

                // Toggle all items
                categoryItems.forEach(item => {
                    const checkbox = item.querySelector('input[type="checkbox"]');
                    const label = checkbox.nextElementSibling;
                    const cipherName = label.textContent;
                    checkbox.checked = !allChecked;
                    selectedCiphers[cipherName] = !allChecked;
                });

                calculateGematria();
            });
        });

        // Add search functionality
        cipherSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filterItems = document.querySelectorAll('.cipher-filter-item');
            const categoryHeaders = document.querySelectorAll('.cipher-category-header');
            const categoryContainers = document.querySelectorAll('.cipher-category-items');

            // Create a map to track which categories have visible items
            const categoriesWithVisibleItems = {};

            // Initialize all categories as having no visible items
            categoryHeaders.forEach(header => {
                const category = header.dataset.category;
                categoriesWithVisibleItems[category] = false;
            });

            // Check each filter item
            filterItems.forEach(item => {
                const label = item.querySelector('label');
                const cipherName = label.textContent.toLowerCase();

                // Get the parent category container
                const categoryContainer = item.closest('.cipher-category-items');
                const category = categoryContainer ? categoryContainer.dataset.category : null;

                if (cipherName.includes(searchTerm) || (category && category.toLowerCase().includes(searchTerm))) {
                    item.style.display = 'flex';
                    if (category) {
                        categoriesWithVisibleItems[category] = true;
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide category headers and containers based on whether they have visible items
            categoryHeaders.forEach(header => {
                const category = header.dataset.category;
                if (categoriesWithVisibleItems[category]) {
                    header.style.display = 'block';
                    // Find and show the corresponding container
                    const container = document.querySelector(`.cipher-category-items[data-category="${category}"]`);
                    if (container) {
                        container.style.display = 'block';
                        // Make sure the header is not collapsed
                        header.classList.remove('collapsed');
                    }
                } else {
                    header.style.display = 'none';
                    // Find and hide the corresponding container
                    const container = document.querySelector(`.cipher-category-items[data-category="${category}"]`);
                    if (container) {
                        container.style.display = 'none';
                    }
                }
            });

            // If search is empty, restore all categories
            if (searchTerm === '') {
                categoryHeaders.forEach(header => {
                    header.style.display = 'block';
                });
                categoryContainers.forEach(container => {
                    container.style.display = 'block';
                });
            }
        });
    }

    // Set up auto-calculation with debounce
    let debounceTimer;
    inputText.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
            calculateGematria();
        }, 300); // 300ms debounce delay
    });

    // Add event listener for Enter key in textarea
    inputText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            calculateGematria();
        }
    });

    // Main function to calculate gematria values using Code 1 system
    function calculateGematria() {
        const text = inputText.value.trim();

        if (!text) {
            resultsContainer.innerHTML = '<p class="empty-result">Please enter some text to calculate</p>';
            summaryContainer.innerHTML = '<p class="empty-result">Enter text to see summary</p>';
            return;
        }

        // Clear previous results
        resultsContainer.innerHTML = '';
        summaryContainer.innerHTML = '';

        // Store results grouped by category
        const resultsByCategory = {};
        const summaryResults = [];

        // Process each cipher using the new system
        for (let i = 0; i < allCiphers.length; i++) {
            const cipher = allCiphers[i];
            const cipherName = cipher.Nickname;

            // Skip if cipher is not selected
            if (!selectedCiphers[cipherName]) continue;

            // Calculate using Code 1's Gematria method
            const totalValue = cipher.Gematria(text, 1);
            const category = cipherArray[cipherName] || "Other";

            // Group results by category
            if (!resultsByCategory[category]) {
                resultsByCategory[category] = [];
            }

            resultsByCategory[category].push({
                cipher: cipher,
                cipherName: cipherName,
                totalValue: totalValue,
                category: category
            });

            // Store result for summary
            summaryResults.push({
                name: cipherName,
                totalValue: totalValue,
                category: category,
                rgb: cipher.RGB
            });
        }

        // Display results grouped by category
        displayGroupedResults(resultsByCategory, text);

        // Create summary elements in the same order as main results
        createSummaryElements(summaryResults);

        // Check for target matches
        checkTargetMatches(summaryResults);

        // Show message if no ciphers are selected
        if (resultsContainer.children.length === 0) {
            resultsContainer.innerHTML = '<p class="empty-result">No ciphers selected. Please select at least one cipher from the sidebar.</p>';
            summaryContainer.innerHTML = '<p class="empty-result">No ciphers selected. Please select at least one cipher from the sidebar.</p>';
        }
    }

    // Display results grouped by category
    function displayGroupedResults(resultsByCategory, text) {
        // Define category order
        const categoryOrder = ["English", "Reverse", "Jewish", "Kabbalah", "Mathematical", "Other"];

        for (const category of categoryOrder) {
            if (!resultsByCategory[category] || resultsByCategory[category].length === 0) continue;

            // Create category container (no header needed for grid layout)
            const categoryContainer = document.createElement('div');
            categoryContainer.className = 'result-category-container';

            // Add each cipher result in this category
            for (const result of resultsByCategory[category]) {
                const resultElement = createResultElement(result.cipher, result.totalValue, text);
                categoryContainer.appendChild(resultElement);
            }

            resultsContainer.appendChild(categoryContainer);
        }
    }

    // Create result element for a cipher using detailed layout
    function createResultElement(cipher, totalValue, inputText) {
        const div = document.createElement('div');
        div.className = 'cipher-result';

        // Create cipher header with name, category tag, and value
        const header = document.createElement('div');
        header.className = 'cipher-header';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'cipher-name';
        // Clean the cipher name to remove any appended category names
        let cleanName = cipher.Nickname;
        const categories = ["English", "Reverse", "Jewish", "Kabbalah", "Mathematical", "Other"];
        let category = "Other"; // default
        for (const cat of categories) {
            if (cleanName.endsWith(cat)) {
                cleanName = cleanName.substring(0, cleanName.length - cat.length).trim();
                category = cat;
                break;
            }
        }
        // Find category from cipher properties if not found in name
        if (category === "Other") {
            category = getCipherCategory(cipher);
        }
        nameSpan.textContent = cleanName;

        // Create category tag
        const categoryTag = document.createElement('span');
        categoryTag.className = 'cipher-category-tag';
        categoryTag.textContent = category;

        const valueSpan = document.createElement('span');
        valueSpan.className = 'cipher-value';
        valueSpan.textContent = totalValue;

        header.appendChild(nameSpan);
        header.appendChild(categoryTag);
        header.appendChild(valueSpan);

        // Create cipher description (alphabet mapping)
        const description = document.createElement('div');
        description.className = 'cipher-description';
        description.textContent = getCipherDescription(cipher);

        // Create word breakdown
        const wordBreakdown = document.createElement('div');
        wordBreakdown.className = 'word-breakdown';

        const breakdownTitle = document.createElement('h4');
        breakdownTitle.textContent = 'Word Breakdown:';
        wordBreakdown.appendChild(breakdownTitle);

        // Get input text and calculate word-by-word breakdown
        if (inputText && inputText.trim()) {
            const words = inputText.trim().split(/\s+/);
            words.forEach(word => {
                const wordElement = createWordBreakdownElement(word, cipher);
                wordBreakdown.appendChild(wordElement);
            });
        }

        // Assemble the result element
        div.appendChild(header);
        div.appendChild(description);
        div.appendChild(wordBreakdown);

        return div;
    }

    // Helper function to get cipher category
    function getCipherCategory(cipher) {
        const name = cipher.Nickname.toLowerCase();
        if (name.includes('reverse')) return 'Reverse';
        if (name.includes('jewish') || name.includes('hebrew')) return 'Jewish';
        if (name.includes('kabbalah') || name.includes('qabbal')) return 'Kabbalah';
        if (name.includes('mathematical') || name.includes('math')) return 'Mathematical';
        if (name.includes('english') || name.includes('ordinal') || name.includes('reduction')) return 'English';
        return 'Other';
    }

    // Helper function to get cipher description (complete alphabet mapping)
    function getCipherDescription(cipher) {
        const name = cipher.Nickname;

        // Handle specific new ciphers with predefined mappings
        if (name === 'Elizabethan 360') {
            return 'A=1, B=2, C=3, D=4, E=5, F=6, G=8, H=9, I=10, J=10, K=12, L=15, M=18, N=20, O=24, P=30, Q=36, R=40, S=45, T=60, U=72, V=72, W=90, X=120, Y=180, Z=360';
        }

        if (name === 'William G. Gray') {
            return 'A=0, E=0, I=0, O=0, U=0, B=11, C=12, D=13, F=14, G=15, H=16, J=17, K=18, L=19, M=20, N=21, P=22, Q=23, R=24, S=25, T=26, V=27, W=28, X=29, Y=30, Z=31';
        }

        if (name === 'Synx') {
            return '0=1, 1=2, 2=3, 3=4, 4=5, 5=6, 6=7, 7=9, 8=10, 9=12, A=14, B=15, C=18, D=20, E=21, F=28, G=30, H=35, I=36, J=42, K=45, L=60, M=63, N=70, O=84, P=90, Q=105, R=126, S=140, T=180, U=210, V=252, W=315, X=420, Y=630, Z=1260';
        }

        if (name === 'Beatus of Liebana') {
            return 'A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9, J=9, K=10, L=20, M=30, N=40, O=50, P=60, Q=70, R=80, S=90, T=100, U=200, V=200, W=200, X=300, Y=400, Z=500';
        }

        if (name === 'Prime Qabalah') {
            return 'A=1, E=2, I=3, O=5, U=7, B=11, C=13, D=17, F=19, G=23, H=29, J=31, K=37, L=41, M=43, N=47, P=53, Q=59, R=61, S=67, T=71, V=73, W=79, X=83, Y=89, Z=97';
        }

        if (name === 'False Kabbalah') {
            return '0=36, 1=37, 2=38, 3=39, 4=40, 5=41, 6=42, 7=43, 8=44, 9=45, A=46, B=47, C=48, D=49, E=50, F=51, G=52, H=53, I=54, J=55, K=56, L=57, M=58, N=59, O=60, P=61, Q=62, R=63, S=64, T=65, U=66, V=67, W=68, X=69, Y=70, Z=71';
        }

        // For other ciphers, generate mapping dynamically
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const mappings = [];

        // Generate complete alphabet mapping by calculating each letter's value
        for (let i = 0; i < alphabet.length; i++) {
            const letter = alphabet[i];
            const value = cipher.Gematria(letter, 1);
            if (value > 0) {
                mappings.push(`${letter} = ${value}`);
            }
        }

        // If we have mappings, return them, otherwise return a default description
        if (mappings.length > 0) {
            return mappings.join(', ');
        }

        // Fallback for special ciphers that might not work with single letters
        const lowerName = name.toLowerCase();
        if (lowerName.includes('jewish') && lowerName.includes('reduction')) {
            return 'Reduce Jewish Gematria values to single digits';
        }
        if (lowerName.includes('alphanumeric') || lowerName.includes('qabbala')) {
            return 'Base-36 notation: 0=0, 1=1, 2=2, 3=3, 4=4, 5=5, 6=6, 7=7, 8=8, 9=9, A=10, B=11, C=12, D=13, E=14, F=15, G=16, H=17, I=18, J=19, K=20, L=21, M=22, N=23, O=24, P=25, Q=26, R=27, S=28, T=29, U=30, V=31, W=32, X=33, Y=34, Z=35';
        }

        return 'Custom cipher mapping';
    }

    // Helper function to create word breakdown element
    function createWordBreakdownElement(word, cipher) {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word-item';

        // Calculate word value
        const wordValue = calculateWordValue(word, cipher);

        // Create word name and value header
        const wordHeader = document.createElement('div');
        wordHeader.className = 'word-name';

        const wordNameSpan = document.createElement('span');
        wordNameSpan.textContent = word.toLowerCase();

        const wordValueSpan = document.createElement('span');
        wordValueSpan.className = 'word-value';
        wordValueSpan.textContent = wordValue;

        wordHeader.appendChild(wordNameSpan);
        wordHeader.appendChild(wordValueSpan);

        // Create letter breakdown
        const letterBreakdown = document.createElement('div');
        letterBreakdown.className = 'letter-breakdown';
        letterBreakdown.textContent = getLetterBreakdown(word, cipher);

        wordDiv.appendChild(wordHeader);
        wordDiv.appendChild(letterBreakdown);

        return wordDiv;
    }

    // Helper function to calculate word value using cipher's Gematria method directly
    function calculateWordValue(word, cipher) {
        // Use the cipher's own Gematria method to calculate the word value
        return cipher.Gematria(word, 1);
    }

    // Helper function to get letter breakdown string using cipher's Gematria method
    function getLetterBreakdown(word, cipher) {
        const breakdown = [];

        // Calculate each letter individually
        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            const value = cipher.Gematria(char, 1);
            if (value > 0) {
                breakdown.push(`${char.toLowerCase()}=${value}`);
            }
        }

        return breakdown.join(' ');
    }

    // Create summary elements using Code 1 system
    function createSummaryElements(summaryResults) {
        // Group summary results by category
        const categorizedResults = {};

        // Initialize categories from catArr
        for (let i = 0; i < catArr.length; i++) {
            categorizedResults[catArr[i]] = [];
        }

        // Group results by category
        summaryResults.forEach(result => {
            const category = result.category;

            if (!categorizedResults[category]) {
                categorizedResults[category] = [];
            }

            categorizedResults[category].push(result);
        });

        // Create summary items grouped by category
        for (const category in categorizedResults) {
            if (categorizedResults[category].length === 0) continue;

            // Create category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'summary-category-header';
            categoryHeader.textContent = category;
            categoryHeader.dataset.category = category;
            summaryContainer.appendChild(categoryHeader);

            // Create container for this category's items
            const categoryItemsContainer = document.createElement('div');
            categoryItemsContainer.className = 'summary-category-items';
            categoryItemsContainer.dataset.category = category;
            summaryContainer.appendChild(categoryItemsContainer);

            // Add items for this category
            categorizedResults[category].forEach(result => {
                const summaryItem = document.createElement('div');
                summaryItem.className = 'summary-item';
                summaryItem.dataset.category = category;

                const nameSpan = document.createElement('span');
                nameSpan.className = 'summary-name';
                nameSpan.textContent = result.name;

                const valuesSpan = document.createElement('span');
                valuesSpan.className = 'summary-values';

                // Only show the total value
                valuesSpan.textContent = result.totalValue.toString();

                summaryItem.appendChild(nameSpan);
                summaryItem.appendChild(valuesSpan);

                categoryItemsContainer.appendChild(summaryItem);
            });

            // Add click event to toggle category items
            categoryHeader.addEventListener('click', function() {
                const categoryItems = document.querySelector(`.summary-category-items[data-category="${category}"]`);
                if (categoryItems.style.display === 'none') {
                    categoryItems.style.display = 'block';
                    this.classList.remove('collapsed');
                } else {
                    categoryItems.style.display = 'none';
                    this.classList.add('collapsed');
                }
            });
        }
    }

    // Comparison calculation function
    function calculateComparison() {
        const text1 = comparisonText1.value.trim();
        const text2 = comparisonText2.value.trim();

        if (!text1 && !text2) {
            comparisonResults1.innerHTML = '<p class="empty-result">Enter text to compare</p>';
            comparisonResults2.innerHTML = '<p class="empty-result">Enter text to compare</p>';
            return;
        }

        // Calculate for text 1
        if (text1) {
            const results1 = calculateForText(text1);
            displayComparisonResults(results1, comparisonResults1, text1);
        } else {
            comparisonResults1.innerHTML = '<p class="empty-result">Enter first text</p>';
        }

        // Calculate for text 2
        if (text2) {
            const results2 = calculateForText(text2);
            displayComparisonResults(results2, comparisonResults2, text2);
        } else {
            comparisonResults2.innerHTML = '<p class="empty-result">Enter second text</p>';
        }
    }

    function calculateForText(text) {
        const results = [];

        for (let i = 0; i < allCiphers.length; i++) {
            const cipher = allCiphers[i];
            const cipherName = cipher.Nickname;

            if (!selectedCiphers[cipherName]) continue;

            const totalValue = cipher.Gematria(text, 1);
            const category = cipherArray[cipherName] || "Other";

            results.push({
                cipher: cipher,
                cipherName: cipherName,
                totalValue: totalValue,
                category: category,
                rgb: cipher.RGB
            });
        }

        return results;
    }

    function displayComparisonResults(results, container, text) {
        const resultsByCategory = {};

        // Group results by category
        results.forEach(result => {
            if (!resultsByCategory[result.category]) {
                resultsByCategory[result.category] = [];
            }
            resultsByCategory[result.category].push(result);
        });

        container.innerHTML = '';

        // Display results in compact format
        const categoryOrder = ["English", "Reverse", "Jewish", "Kabbalah", "Mathematical", "Other"];

        categoryOrder.forEach(category => {
            if (resultsByCategory[category] && resultsByCategory[category].length > 0) {
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'comparison-category';
                categoryDiv.innerHTML = `<h4>${category}</h4>`;

                const resultsDiv = document.createElement('div');
                resultsDiv.className = 'comparison-results';

                resultsByCategory[category].forEach(result => {
                    const resultDiv = document.createElement('div');
                    resultDiv.className = 'comparison-result-item';
                    resultDiv.innerHTML = `
                        <span class="cipher-name">${result.cipherName}</span>
                        <span class="cipher-value">${result.totalValue}</span>
                    `;

                    // Highlight if matches target
                    if (targetNumber && result.totalValue === targetNumber) {
                        resultDiv.classList.add('target-match');
                    }

                    resultsDiv.appendChild(resultDiv);
                });

                categoryDiv.appendChild(resultsDiv);
                container.appendChild(categoryDiv);
            }
        });
    }

    // Initialize filters
    initializeFilters();

    // Event Listeners for new functionality

    // Theme controls
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });

    fontFamilySelect.addEventListener('change', applyFontSettings);
    fontSizeSlider.addEventListener('input', applyFontSettings);

    // Target number controls
    targetNumberInput.addEventListener('input', function() {
        const value = parseInt(this.value);
        targetNumber = isNaN(value) ? null : value;
        calculateGematria();
        if (isComparisonMode) calculateComparison();
    });

    clearTargetBtn.addEventListener('click', function() {
        targetNumberInput.value = '';
        targetNumber = null;
        calculateGematria();
        if (isComparisonMode) calculateComparison();
    });

    // Text history controls
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);

    // Saved words controls
    saveWordBtn.addEventListener('click', saveCurrentWord);
    savedWordsBtn.addEventListener('click', showSavedWordsModal);

    // View controls
    toggleViewBtn.addEventListener('click', toggleView);
    comparisonBtn.addEventListener('click', toggleComparison);

    // Comparison text inputs
    comparisonText1.addEventListener('input', function() {
        if (isComparisonMode) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(calculateComparison, 300);
        }
    });

    comparisonText2.addEventListener('input', function() {
        if (isComparisonMode) {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(calculateComparison, 300);
        }
    });

    // Modal controls
    document.getElementById('close-saved-words').addEventListener('click', function() {
        document.getElementById('saved-words-modal').classList.add('hidden');
    });

    document.getElementById('close-custom-theme').addEventListener('click', function() {
        document.getElementById('custom-theme-modal').classList.add('hidden');
    });

    document.getElementById('clear-saved-words').addEventListener('click', clearAllSavedWords);

    // Cipher management controls
    document.getElementById('manage-ciphers-btn').addEventListener('click', showCipherManagementModal);
    document.getElementById('close-cipher-management').addEventListener('click', function() {
        document.getElementById('cipher-management-modal').classList.add('hidden');
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;

            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update tab content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.getElementById(tabName + '-tab').classList.remove('hidden');
        });
    });

    // Custom system creation
    document.getElementById('create-custom-system').addEventListener('click', createCustomSystem);
    document.getElementById('reset-custom-form').addEventListener('click', resetCustomForm);

    // Custom theme controls
    document.getElementById('apply-custom-theme').addEventListener('click', function() {
        const bgColor = document.getElementById('bg-color').value;
        const textColor = document.getElementById('text-color').value;
        const accentColor = document.getElementById('accent-color').value;
        const highlightColor = document.getElementById('highlight-color').value;

        document.documentElement.style.setProperty('--bg-primary', bgColor);
        document.documentElement.style.setProperty('--bg-secondary', bgColor);
        document.documentElement.style.setProperty('--text-primary', textColor);
        document.documentElement.style.setProperty('--accent-primary', accentColor);
        document.documentElement.style.setProperty('--highlight-color', highlightColor);

        localStorage.setItem('gematria-custom-theme', JSON.stringify({
            bgColor, textColor, accentColor, highlightColor
        }));

        document.getElementById('custom-theme-modal').classList.add('hidden');
        showNotification('Custom theme applied!');
    });

    document.getElementById('reset-custom-theme').addEventListener('click', function() {
        document.getElementById('bg-color').value = '#ffffff';
        document.getElementById('text-color').value = '#333333';
        document.getElementById('accent-color').value = '#3498db';
        document.getElementById('highlight-color').value = '#e74c3c';
    });

    // Enhanced input handling with history
    let lastInputValue = '';
    inputText.addEventListener('input', function() {
        const currentValue = this.value;
        if (currentValue !== lastInputValue && currentValue.trim() !== '') {
            addToHistory(currentValue);
            lastInputValue = currentValue;
        }
    });

    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.add('hidden');
        }
    });

    // Load saved settings
    function loadSavedSettings() {
        const savedTheme = localStorage.getItem('gematria-theme');
        const savedFontFamily = localStorage.getItem('gematria-font-family');
        const savedFontSize = localStorage.getItem('gematria-font-size');
        const savedCustomTheme = localStorage.getItem('gematria-custom-theme');

        if (savedTheme) {
            themeSelect.value = savedTheme;
            applyTheme(savedTheme);
        }

        if (savedFontFamily) {
            fontFamilySelect.value = savedFontFamily;
        }

        if (savedFontSize) {
            fontSizeSlider.value = savedFontSize;
        }

        if (savedCustomTheme && savedTheme === 'custom') {
            const customTheme = JSON.parse(savedCustomTheme);
            document.getElementById('bg-color').value = customTheme.bgColor;
            document.getElementById('text-color').value = customTheme.textColor;
            document.getElementById('accent-color').value = customTheme.accentColor;
            document.getElementById('highlight-color').value = customTheme.highlightColor;

            document.documentElement.style.setProperty('--bg-primary', customTheme.bgColor);
            document.documentElement.style.setProperty('--bg-secondary', customTheme.bgColor);
            document.documentElement.style.setProperty('--text-primary', customTheme.textColor);
            document.documentElement.style.setProperty('--accent-primary', customTheme.accentColor);
            document.documentElement.style.setProperty('--highlight-color', customTheme.highlightColor);
        }

        applyFontSettings();
        updateUndoRedoButtons();
    }

    // Load settings on startup
    loadSavedSettings();

    // Initialize custom system creation
    setupCustomSystemCreation();

    // Load custom ciphers
    loadCustomCiphers();

    function loadCustomCiphers() {
        customCiphers.forEach(customCipher => {
            const newCipher = new cipher(customCipher.name, "Custom", 128, 0, 128);
            newCipher.CustomValues = customCipher.values;
            newCipher.IsCustom = true;

            // Override the Gematria method for custom cipher
            newCipher.Gematria = function(text, type) {
                let total = 0;
                for (let i = 0; i < text.length; i++) {
                    const char = text[i].toUpperCase();
                    if (this.CustomValues[char]) {
                        total += this.CustomValues[char];
                    }
                }
                return total;
            };

            allCiphers.push(newCipher);
            cipherArray[customCipher.name] = "Other";
        });
    }

    // Initial calculation if there's text in the input
    calculateGematria();

    // Make functions globally available for onclick handlers
    window.useWord = useWord;
    window.deleteSavedWord = deleteSavedWord;
    window.updateCipherName = updateCipherName;
});