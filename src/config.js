import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database'; 

const firebaseConfig = {
  apiKey: "AIzaSyCyPQEOPIZ44JwfhmmwSj5wQyHj56Ozfks",
  authDomain: "freshbreeze-39eca.firebaseapp.com",
  databaseURL: "https://freshbreeze-39eca-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "freshbreeze-39eca",
  storageBucket: "freshbreeze-39eca.firebasestorage.app",
  messagingSenderId: "57386539490",
  appId: "1:57386539490:web:86357c42c4f20ebddb81bb",
  measurementId: "G-ZXNFTJHBJL"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, onValue };
