// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCrvtbUqTW5A3TyQs0JBc28zgmaIvUrqe0",
  authDomain: "webproject1020-bee54.firebaseapp.com",
  projectId: "webproject1020-bee54",
  storageBucket: "webproject1020-bee54.appspot.com",
  messagingSenderId: "583316194697",
  appId: "1:583316194697:web:726f0c774d3febd14e8d58"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore(app);
export const storage = getStorage(app);