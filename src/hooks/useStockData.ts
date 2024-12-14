import { useState, useEffect } from 'react';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig'; // Import Firestore configuration
import { auth } from '../services/firebaseConfig'; // Import Firebase Auth

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const useStockData = (symbol: string) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchStockData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch stock data from Finnhub API
        const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=cte68rhr01qt478l5sggcte68rhr01qt478l5sh0`);
        
        // Handle rate limiting (status 429)
        if (response.status === 429) {
          throw new Error('Rate limit exceeded, please try again later.');
        }

        const data = response.data;

        const stockData = {
          symbol: symbol,
          price: data.c,
          change: data.c - data.pc,
          changePercent: ((data.c - data.pc) / data.pc) * 100,
        };

        setStockData(stockData);

        // Check if a user is logged in
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid; // Get the UID of the logged-in user
          const docRef = doc(db, 'userStockData', `${userId}_${symbol}`);
          await setDoc(docRef, {
            ...stockData,
            userId, // Associate stock data with the user's UID
            timestamp: new Date().toISOString(), // Add a timestamp
          });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch stock data');
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  return { stockData, loading, error };
};

export default useStockData;
