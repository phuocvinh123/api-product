// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDucppPzGCTffFlj0ZJC4I8NX-3nJxX9oU',
  authDomain: 'homepagechat-a2795.firebaseapp.com',
  databaseURL: 'https://homepagechat-a2795-default-rtdb.firebaseio.com',
  projectId: 'homepagechat-a2795',
  storageBucket: 'homepagechat-a2795.appspot.com',
  messagingSenderId: '718070927206',
  appId: '1:718070927206:web:59eaa5bccd602f6060c2a7',
  measurementId: 'G-JG8QJ39FWK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbf = getFirestore(app);

export { db, dbf };
