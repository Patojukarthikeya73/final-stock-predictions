import { db } from './firebaseConfig'; // Assuming firebaseConfig exports the initialized Firestore instance
import { collection, addDoc, getDocs } from 'firebase/firestore';

const stockDataCollection = collection(db, 'stockData');

interface StockData {
    id?: string;
    userId: string;
    createdAt: Date;
    // Add other stock data fields as necessary
}

export const saveStockData = async (userId: string, stockData: Omit<StockData, 'userId'>) => {
    try {
        await addDoc(stockDataCollection, {
            userId,
            ...stockData,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error("Error saving stock data: ", error);
    }
};

export const getStockData = async (userId: string) => {
    try {
        const querySnapshot = await getDocs(stockDataCollection);
        const stocks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StockData[];
        return stocks.filter(stock => stock.userId === userId);
    } catch (error) {
        console.error("Error retrieving stock data: ", error);
        return [];
    }
};
