import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBWDl2MtPlIfcgq8O1BziUViOMRZ7CUTqo",
    authDomain: "b3runtimedev-cc9d4.firebaseapp.com",
    databaseURL: "https://b3runtimedev-cc9d4.firebaseio.com",
    projectId: "b3runtimedev-cc9d4",
    storageBucket: "b3runtimedev-cc9d4.appspot.com",
    messagingSenderId: "792814669342",
    appId: "1:792814669342:web:e814f000fcc1bd9faba80f"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const fieldPath = firebase.firestore.FieldPath;
export const fieldValue = firebase.firestore.FieldValue;

export default firebase;