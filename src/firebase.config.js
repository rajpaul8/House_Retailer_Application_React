// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCglVIfInAvVp14ykIo2yxBZHyZ8sARtk4",
  authDomain: "house-retailer-app.firebaseapp.com",
  projectId: "house-retailer-app",
  storageBucket: "house-retailer-app.appspot.com",
  messagingSenderId: "341451477495",
  appId: "1:341451477495:web:3c398540df44fd3ba95ef2",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
