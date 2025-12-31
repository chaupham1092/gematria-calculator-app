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

    // Store selected ciphers using cipher names
    let selectedCiphers = {};

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
                label.textContent = cipherName;

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
        const name = cipher.Nickname.toLowerCase();
        if (name.includes('jewish') && name.includes('reduction')) {
            return 'Reduce Jewish Gematria values to single digits';
        }
        if (name.includes('alphanumeric') || name.includes('qabbala')) {
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

    // Initialize filters
    initializeFilters();

    // Initial calculation if there's text in the input
    calculateGematria();
});