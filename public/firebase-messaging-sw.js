importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyB6xax9YOloCNGCO2SVtq6hd99BGSY24iA",
    authDomain: "fndrisr-6c1d7.firebaseapp.com",
    projectId: "fndrisr-6c1d7",
    storageBucket: "fndrisr-6c1d7.appspot.com",
    messagingSenderId: "259252763000",
    appId: "1:259252763000:web:27921350440f4f21cfb08d",
    measurementId: "G-E4ZELPX905"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();