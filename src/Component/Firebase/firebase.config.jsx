import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtj5-KATnJcjVC6IjnXF4S5CijZjzyCN0",
  authDomain: "egroceryapp-5be35.firebaseapp.com",
  projectId: "egroceryapp-5be35",
  storageBucket: "egroceryapp-5be35.appspot.com",
  messagingSenderId: "489593962284",
  appId: "1:489593962284:web:ec2de28b5592fddae9f689",
  measurementId: "G-R7CW2576KL"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);