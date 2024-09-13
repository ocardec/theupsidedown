
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const selectBook = document.getElementById('book-select');
    const selectChapter = document.getElementById('chapter-select');
    const selectVerse = document.getElementById('verse-select');
    const displayText = document.getElementById('display-text');

    let bibleData = {}; // To store the list of books
    let currentBook = {}; // To store current book's chapters
    let currentChapter = {}; // To store current chapter's verses

    // Load list of books from books.json
    fetch('data/books.json')
        .then(response => response.json())
        .then(data => {
            bibleData = data;
            populateBooks();
        });

    // Populate book selection dropdown
    function populateBooks() {
        Object.keys(bibleData).forEach(book => {
            const option = document.createElement('option');
            option.value = book;
            option.textContent = bibleData[book].name; // Use book name
            selectBook.appendChild(option);
        });
    }

    // Event listener for when a book is selected
    selectBook.addEventListener('change', () => {
        selectChapter.innerHTML = ''; // Clear previous chapter options
        selectVerse.innerHTML = ''; // Clear previous verse options
        const selectedBookId = selectBook.value;
        if (!selectedBookId) return;

        // Fetch the first chapter to get the total number of chapters
        fetch(`./data/${selectedBookId}/1.json`) // Assume first chapter to get book info
            .then(response => response.json())
            .then(data => {
                currentBook = data;
                populateChapters(currentBook.book.numberOfChapters);
            });
    });

    // Populate chapter dropdown based on the selected book
    function populateChapters(totalChapters) {
        for (let i = 1; i <= totalChapters; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Chapter ${i}`;
            selectChapter.appendChild(option);
        }
        selectChapter.dispatchEvent(new Event('change')); // Trigger chapter change to populate verses
    }

    // Event listener for when a chapter is selected
    selectChapter.addEventListener('change', () => {
        selectVerse.innerHTML = ''; // Clear previous verse options
        const selectedBookId = selectBook.value;
        const selectedChapterNumber = selectChapter.value;
        if (!selectedChapterNumber) return;

        // Fetch the selected chapter
        fetch(`./data/${selectedBookId}/${selectedChapterNumber}.json`)
            .then(response => response.json())
            .then(data => {
                currentChapter = data;
                populateVerses(currentChapter.chapter.numberOfVerses);
            });
    });

    // Populate verse dropdown based on the selected chapter
    function populateVerses(totalVerses) {
        for (let i = 1; i <= totalVerses; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Verse ${i}`;
            selectVerse.appendChild(option);
        }
    }

    // Event listener for when a verse is selected
    selectVerse.addEventListener('change', () => {
        const selectedVerseNumber = selectVerse.value;
        if (!selectedVerseNumber) return;

        const verse = currentChapter.chapter.content.find(item => item.type === 'verse' && item.number == selectedVerseNumber);
        const verseText = verse ? verse.content.join(' ') : "Verse not found.";

        displayText.textContent = `${selectBook.options[selectBook.selectedIndex].text} ${selectChapter.value}:${selectVerse.value} - ${verseText}`;
    });
});
