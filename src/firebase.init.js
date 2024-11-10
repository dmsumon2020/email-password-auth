// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4oYqOllASa9XmuKJ0HpOhjUhTWq_esgU",
  authDomain: "email-password-auth-4fe42.firebaseapp.com",
  projectId: "email-password-auth-4fe42",
  storageBucket: "email-password-auth-4fe42.firebasestorage.app",
  messagingSenderId: "337732212261",
  appId: "1:337732212261:web:0c827ce9060a8ee5e951cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
