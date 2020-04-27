import * as firebase from 'firebase';
import '@firebase/firestore';


var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

let app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const firestore = firebase.firestore(app);
export const auth = app.auth();