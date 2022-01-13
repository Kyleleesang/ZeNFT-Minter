// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2sk9ieS0n4s9ZXLt0PFzkR2_hXTfvOLk",
  authDomain: "zenft-site.firebaseapp.com",
  projectId: "zenft-site",
  storageBucket: "zenft-site.appspot.com",
  messagingSenderId: "703732687630",
  appId: "1:703732687630:web:03f9b0572d61c3ad6ead5f",
  measurementId: "G-8BHTVB0XWE"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const storage = getStorage(fire);
const analytics = getAnalytics(fire);

  export {storage, fire as default};