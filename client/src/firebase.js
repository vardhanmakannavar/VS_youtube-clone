import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAVRYD0KiDQkOtA9s3Cjuypp4F9LlGhugg",
  authDomain: "video-a27b6.firebaseapp.com",
  projectId: "video-a27b6",
  storageBucket: "video-a27b6.appspot.com",
  messagingSenderId: "426471395347",
  appId: "1:426471395347:web:689ba61e78b2c8c1b46fe6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;