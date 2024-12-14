# **Stock Market Dashboard**

A React-based web application that provides real-time stock market insights, including stock quotes, market news, and a personalized watchlist. Built with Firebase for authentication and deployed on Netlify.

---

## **Features**
- User authentication via Google.
- Real-time stock quotes for watched stocks.
- Latest market news.
- Responsive design for mobile and desktop.

---

## **Getting Started**

### **Prerequisites**
Make sure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- A Firebase account
- A Netlify account

---

### **Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo-name/stock-dashboard.git
   cd stock-dashboard


   import { initializeApp } from "firebase/app";
   import { getAuth, GoogleAuthProvider } from "firebase/auth";
   
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
   };
   
   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const provider = new GoogleAuthProvider();


   **env**
   REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID

