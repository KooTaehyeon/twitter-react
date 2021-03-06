import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyD_7mpR7v9WCEWeIxmc4ZL1JyJymvaQ-QI',
  authDomain: 'twitter-react-7c4f5.firebaseapp.com',
  projectId: 'twitter-react-7c4f5',
  storageBucket: 'twitter-react-7c4f5.appspot.com',
  messagingSenderId: '799535032807',
  appId: '1:799535032807:web:df892c55f19cd671c83542',
};
initializeApp(firebaseConfig);

export const firebaseInitialize = initializeApp(firebaseConfig);

export const auth = getAuth();

export const dbService = getFirestore();

export const storageService = getStorage();
