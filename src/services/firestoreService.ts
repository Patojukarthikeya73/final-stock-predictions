// services/firestoreService.ts
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Save stock symbol to Firestore
export const saveStockSymbol = async (userId: string, stockSymbol: string) => {
  try {
    await addDoc(collection(db, 'stocks'), {
      userId,
      stockSymbol,
      createdAt: new Date(),
    });
    console.log('Stock symbol saved successfully.');
  } catch (error) {
    console.error('Error saving stock symbol:', error);
  }
};

// Retrieve stock symbols for a user
export const getStockSymbols = async (userId: string) => {
  try {
    const stocksQuery = query(collection(db, 'stocks'), where('userId', '==', userId));
    const querySnapshot = await getDocs(stocksQuery);

    const stocks = querySnapshot.docs.map(doc => doc.data().stockSymbol);
    return stocks;
  } catch (error) {
    console.error('Error retrieving stock symbols:', error);
    return [];
  }
};
