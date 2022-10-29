import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBKW8Rio4JNiIGLMpPPoqspHrPVaLBEUFQ",
    authDomain: "sistema-aps-a39e7.firebaseapp.com",
    projectId: "sistema-aps-a39e7",
    storageBucket: "sistema-aps-a39e7.appspot.com",
    messagingSenderId: "408951567776",
    appId: "1:408951567776:web:b27e2eddd3e4b482c4e0c5",
    measurementId: "G-4WC1L7CE5C"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
  
