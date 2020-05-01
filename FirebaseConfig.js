import * as firebase from 'firebase';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCkFsaY2smwvPBtLiog4dW58TCM7RBJXyY",
  authDomain: "rssfeed-4e916.firebaseapp.com",
  databaseURL: "https://rssfeed-4e916.firebaseio.com",
  projectId: "rssfeed-4e916",
  storageBucket: "rssfeed-4e916.appspot.com",
  messagingSenderId: "701655634053",
  appId: "1:701655634053:web:72c308ccae21848ab399ec"
};

console.log(process.env.AUTH_DOMAIN);
let app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
export const firestore = firebase.firestore(app);
export const auth = app.auth();