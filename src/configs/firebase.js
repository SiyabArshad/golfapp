// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfSE12NJf1VGF5OP1XSTYJ7vtWOvG1C0Y",
  authDomain: "justgolf-28d1a.firebaseapp.com",
  projectId: "justgolf-28d1a",
  storageBucket: "justgolf-28d1a.appspot.com",
  messagingSenderId: "24438273471",
  appId: "1:24438273471:web:4ce73a5f0e5e5e89b95d0a",
  measurementId: "G-06P7NR14CH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;