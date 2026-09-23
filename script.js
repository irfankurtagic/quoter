let cachedQuotes = null;

async function getQuotes() {
  if (cachedQuotes) return cachedQuotes;

  try {
    const response = await fetch('/quoter/quotes.json');
    if (!response.ok) {
      throw new Error(`Error loading quotes: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.quotes)) {
      throw new Error('Invalid quotes format');
    }

    cachedQuotes = data.quotes;
    return cachedQuotes;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}


// Function to display a random quote
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');

let shuffledQuotes = [];
let currentIndex = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function showNextQuote() {
  if (shuffledQuotes.length === 0 || currentIndex >= shuffledQuotes.length) {
    const quotes = await getQuotes();
    shuffledQuotes = [...quotes];
    shuffleArray(shuffledQuotes);
    currentIndex = 0;
  }

  const quote = shuffledQuotes[currentIndex++];

  if (!quote) return;


  quoteElement.textContent = quote.quote || '…';
  authorElement.textContent = quote.author ? `– ${quote.author}` : '';
}

// Show a quote on page load
showNextQuote();

