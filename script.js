document.addEventListener('DOMContentLoaded', () => {
    // --- DATA ---
    // Array of quote objects. Each quote has text, author, and a category.
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Inspirational" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "Philosophy" },
        { text: "Get busy living or get busy dying.", author: "Stephen King", category: "Life" },
        { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "Life" },
        { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison", category: "Inspirational" },
        { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein", category: "Wisdom" },
        { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", category: "Inspirational" },
        { text: "Money and success don’t change people; they merely amplify what is already there.", author: "Will Smith", category: "Life" },
        { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs", category: "Wisdom" },
        { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca", category: "Philosophy" },
        { text: "The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.", author: "Henry Ford", category: "Success" },
        { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde", category: "Philosophy" },
        { text: "Go confidently in the direction of your dreams! Live the life you’ve imagined.", author: "Henry David Thoreau", category: "Inspirational" },
        { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard", category: "Philosophy" },
        { text: "The unexamined life is not worth living.", author: "Socrates", category: "Philosophy" },
        { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", category: "Wisdom" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "Success" },
        { text: "The great pleasure in life is doing what people say you cannot do.", author: "Walter Bagehot", category: "Success" },
        { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House", category: "Tech" },
        { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "Tech" },
        { text: "The best error message is the one that never appears.", author: "Thomas Fuchs", category: "Tech" },
        { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison", category: "Success" },
        { text: "A good plan violently executed now is better than a perfect plan executed next week.", author: "George S. Patton", category: "Success" },
        { text: "There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.", author: "C.A.R. Hoare", category: "Tech" },
        { text: "It’s not a bug – it’s an undocumented feature.", author: "Anonymous", category: "Humor" },
        { text: "I'm not a great programmer; I'm just a good programmer with great habits.", author: "Kent Beck", category: "Tech" },
        { text: "I'm not superstitious, but I am a little stitious.", author: "Michael Scott", category: "Humor" },
        { text: "Before you criticize someone, you should walk a mile in their shoes. That way, when you criticize them, you're a mile away and you have their shoes.", author: "Jack Handey", category: "Humor" },
        { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu", category: "Wisdom" },
    ];
    
    // Fallback quote in case something goes wrong.
    const fallbackQuote = { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt", category: "Wisdom" };

    // --- STATE ---
    let currentQuotes = [];
    let shuffledIndices = [];
    let currentIndex = 0;
    let currentQuote = {};

    // --- DOM ELEMENTS ---
    const body = document.body;
    const quoteTextElem = document.querySelector('.quote-text');
    const quoteAuthorElem = document.querySelector('.quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const copyBtn = document.getElementById('copy-btn');
    const tweetBtn = document.getElementById('tweet-btn');
    const copyBtnText = document.getElementById('copy-btn-text');
    const quoteDisplay = document.getElementById('quote-display');
    const themeToggle = document.getElementById('theme-toggle');
    const categoryFilter = document.getElementById('category-filter');

    // --- FUNCTIONS ---

    /**
     * Shuffles an array of indices using the Fisher-Yates algorithm.
     * This avoids shuffling the actual quote objects.
     * @param {number[]} array - The array of indices to shuffle.
     */
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    /**
     * Populates the category filter dropdown from the quotes data.
     */
    const populateCategories = () => {
        const categories = [...new Set(quotes.map(q => q.category))];
        categories.sort().forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    };

    /**
     * Filters quotes based on the selected category and resets the shuffle.
     */
    const filterAndShuffle = () => {
        const selectedCategory = categoryFilter.value;
        currentQuotes = (selectedCategory === 'all')
            ? [...quotes]
            : quotes.filter(q => q.category === selectedCategory);
        
        // Create an array of indices [0, 1, 2, ...]
        shuffledIndices = Array.from(Array(currentQuotes.length).keys());
        shuffleArray(shuffledIndices);
        currentIndex = 0;
    };

    /**
     * Displays a new quote on the screen.
     */
    const displayQuote = () => {
        try {
            // Check if all quotes in the current category have been shown
            if (currentIndex >= shuffledIndices.length) {
                shuffleArray(shuffledIndices); // Reshuffle
                currentIndex = 0; // Reset index
            }
            
            const quoteIndex = shuffledIndices[currentIndex];
            currentQuote = currentQuotes[quoteIndex] || fallbackQuote;
            
            quoteTextElem.textContent = currentQuote.text;
            quoteAuthorElem.textContent = currentQuote.author;
            
            // Trigger fade-in animation
            quoteDisplay.classList.remove('fade-out');

            currentIndex++;
            
            // Save the displayed quote to localStorage
            localStorage.setItem('lastQuote', JSON.stringify(currentQuote));
        } catch (error) {
            console.error("Failed to display quote:", error);
            // Display fallback quote on error
            quoteTextElem.textContent = fallbackQuote.text;
            quoteAuthorElem.textContent = fallbackQuote.author;
        }
    };

    /**
     * Handles the process of getting a new quote with animations.
     */
    const getNewQuote = () => {
        // Trigger fade-out animation
        quoteDisplay.classList.add('fade-out');
        // Wait for the animation to finish before updating the content
        setTimeout(displayQuote, 400);
    };

    /**
     * Copies the current quote text and author to the clipboard.
     */
    const copyQuote = () => {
        if (navigator.clipboard && currentQuote.text) {
            const textToCopy = `"${currentQuote.text}" — ${currentQuote.author}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Provide user feedback
                copyBtnText.textContent = 'Copied!';
                copyBtn.disabled = true;
                setTimeout(() => {
                    copyBtnText.textContent = 'Copy';
                    copyBtn.disabled = false;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers
                try {
                    const textArea = document.createElement("textarea");
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // User feedback for fallback
                    copyBtnText.textContent = 'Copied!';
                    copyBtn.disabled = true;
                    setTimeout(() => {
                        copyBtnText.textContent = 'Copy';
                        copyBtn.disabled = false;
                    }, 2000);
                } catch (err) {
                    console.error('Fallback copy failed', err);
                }
            });
        }
    };

    /**
     * Opens a Twitter compose window with the current quote.
     */
    const tweetQuote = () => {
        if (currentQuote.text) {
            const tweetText = `"${currentQuote.text}" — ${currentQuote.author}`;
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
            window.open(twitterUrl, '_blank');
        }
    };
    
    /**
     * Handles theme switching and saves the preference.
     */
    const switchTheme = () => {
        const isLight = themeToggle.checked;
        body.classList.toggle('light-theme', isLight);
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    };

    /**
     * Loads theme from localStorage on page load.
     */
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            themeToggle.checked = true;
            body.classList.add('light-theme');
        } else {
            themeToggle.checked = false;
            body.classList.remove('light-theme');
        }
    };
    
    /**
     * Handles keyboard shortcuts.
     * @param {KeyboardEvent} e - The keyboard event.
     */
    const handleKeyboardShortcuts = (e) => {
        // Prevent shortcuts when user is typing in a form field (like the select dropdown)
        if (document.activeElement === categoryFilter) return;

        if (e.code === 'Space') {
            e.preventDefault(); // Prevent page from scrolling
            getNewQuote();
        } else if (e.key.toLowerCase() === 'c') {
            e.preventDefault();
            copyQuote();
        }
    };

    /**
     * Initializes the application.
     */
    const init = () => {
        // Setup Theme
        loadTheme();

        // Setup Categories
        populateCategories();
        filterAndShuffle(); // Initial shuffle with "All Categories"

        // Load last quote from localStorage or get a new one
        const lastQuote = JSON.parse(localStorage.getItem('lastQuote'));
        if (lastQuote && lastQuote.text) {
            currentQuote = lastQuote;
            quoteTextElem.textContent = currentQuote.text;
            quoteAuthorElem.textContent = currentQuote.author;
        } else {
            displayQuote();
        }
        
        // --- EVENT LISTENERS ---
        newQuoteBtn.addEventListener('click', getNewQuote);
        copyBtn.addEventListener('click', copyQuote);
        tweetBtn.addEventListener('click', tweetQuote);
        themeToggle.addEventListener('change', switchTheme);
        categoryFilter.addEventListener('change', () => {
            filterAndShuffle();
            getNewQuote();
        });
        document.addEventListener('keydown', handleKeyboardShortcuts);
    };
    
    // Start the application
    init();
});
