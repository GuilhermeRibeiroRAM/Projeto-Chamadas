// Conexão com o FireBase

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAOz4zOlSD6RdGLjZQ6T9cIihgIKwDmr4M",
    authDomain: "tickets-2f6b0.firebaseapp.com",
    projectId: "tickets-2f6b0",
    storageBucket: "tickets-2f6b0.firebasestorage.app",
    messagingSenderId: "982876483309",
    appId: "1:982876483309:web:2006b09d3f4447cbc526e4",
    measurementId: "G-8DGN1M7CL4"
};

const fireBaseApp = initializeApp(firebaseConfig);

const auth = getAuth(fireBaseApp);
const db = getFirestore(fireBaseApp);
const storage = getStorage(fireBaseApp);

export { auth, db, storage };