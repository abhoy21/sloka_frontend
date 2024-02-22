// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBneu-Mc8XrTBoqcg6Hf1ss5wZQxgaOR9M",
  authDomain: "sloka-fc955.firebaseapp.com",
  projectId: "sloka-fc955",
  storageBucket: "sloka-fc955.appspot.com",
  messagingSenderId: "921235910353",
  appId: "1:921235910353:web:d5ec01bb06139fa9e55ff0",
  measurementId: "G-KTVT8G7BTE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);
// const analytics = getAnalytics(app);
