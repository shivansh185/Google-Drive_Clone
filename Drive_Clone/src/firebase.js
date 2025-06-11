// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, serverTimestamp, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AddFolder from "./components/Drive-Clone/AddFolder";

// Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Modular SDK
const firestore = getFirestore(app);
const storage = getStorage(app);

export const database = {
  folders: collection(firestore, "folders"),
  AddFolder:(data)=> addDoc(collection(firestore, "folders"), data),
  files: collection(firestore, "files"),
    AddFile: (data) => addDoc(collection(firestore, "files"), data),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
getCurrentTimestamp: () => serverTimestamp(),
};

export const auth = getAuth(app);
export { firestore, storage };
export default app;
