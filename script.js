// Load quotes from the JSON file
async function getQuotes() {
  try {
    const response = await fetch('quotes.json');

    if (!response.ok) {
      throw new Error(`Error loading quotes: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data.quotes || !Array.isArray(data.quotes)) {
      throw new Error('Invalid JSON format or missing "quotes" array.');
    }

    return data.quotes;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

// Function to display a random quote
async function getRandomQuote() {
  const quotes = await getQuotes();

  if (quotes.length === 0) {
    console.warn('No quotes available.');
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteElement = document.getElementById('quote');
  const authorElement = document.getElementById('author');

  quoteElement.textContent = quotes[randomIndex].quote;
  authorElement.textContent = `– ${quotes[randomIndex].author}`;
}

// Call getRandomQuote when the script is executed
getRandomQuote();
