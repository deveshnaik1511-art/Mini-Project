import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBH8nPVs5r1czUqIuJoHAEHd0Gs2s2Lz4s",
  authDomain: "studenthub-a8ce6.firebaseapp.com",
  databaseURL: "https://studenthub-a8ce6-default-rtdb.firebaseio.com",
  projectId: "studenthub-a8ce6",
  storageBucket: "studenthub-a8ce6.firebasestorage.app",
  messagingSenderId: "1078326642339",
  appId: "1:1078326642339:web:acbda4016dd7923742a116",
  measurementId: "G-RNQD492PY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);