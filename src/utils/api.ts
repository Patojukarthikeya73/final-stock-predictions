import axios from 'axios';

const FINNHUB_API_KEY = 'cte68rhr01qt478l5sggcte68rhr01qt478l5sh0';
const BASE_URL = 'https://finnhub.io/api/v1';

// Utility function for retrying with exponential backoff
const fetchWithRetry = async (url: string, retryCount: number = 0): Promise<any> => {
  try {
    const response = await axios.get(url);

    // Check for rate-limiting (HTTP 429) and retry if needed
    if (response.status === 429 && retryCount < 5) {
      const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
      console.log(`Rate-limited. Retrying in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retryCount + 1); // Retry the request
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow error after logging it
  }
};

// Fetch stock quote
export async function getStockQuote(symbol: string) {
  const url = `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
  return await fetchWithRetry(url);
}

// Fetch market news
export async function getMarketNews() {
  const url = `${BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`;
  return await fetchWithRetry(url);
}
