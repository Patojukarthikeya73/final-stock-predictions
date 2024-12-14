import React, { useState, useEffect } from 'react';
import { auth, provider, db } from '../services/firebaseConfig'; // Import Firestore db
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface NavbarProps {
  user: User | null;  // User prop to track the current user
  onLogin: (user: User | null) => void;  // Function to update user state in parent component
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        onLogin(currentUser);  // Update user state when authenticated
      } else {
        onLogin(null);  // If not authenticated, set user to null
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [onLogin]);

  const handleLogin = async () => {
    if (user) return; // If the user is already signed in, do nothing

    try {
      setIsLoading(true);
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      onLogin(currentUser);  // Pass the user to the parent component

      // Check if the user is already in the Firestore database
      const userRef = doc(db, 'users', currentUser.uid);

      // Create a new user document if it doesn't exist
      await setDoc(userRef, {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        createdAt: new Date(),
      });
    } catch (error: any) {
      console.error('Error signing in with Google:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogin(null); // Set user to null on logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-bold">
          Stock Dashboard
        </Link>
        <div className="space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.displayName || 'User'}!</span>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg text-white">
                {isLoading ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 px-4 py-2 rounded-lg text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In with Google'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
