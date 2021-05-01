import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import firebase from "firebase/app";
import 'firebase/messaging';
import {addNotification} from "./redux/User/userActions";

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
messaging.getToken({ vapidKey: 'BMG5erzYk7uh46d7Sl6M6b6bhS55j0ZkC-VsDWTEMdoLwt8txep00PKGCw-PZBYDhek-Y6F1_qSTVUJTqhfrNTw' }).then((currentToken) => localStorage.setItem('deviceToken', currentToken))
messaging.onMessage((payload) => {
    navigator.serviceWorker.getRegistration('/firebase-cloud-messaging-push-scope').then(registration => {
        const notificationTitle = payload.data.title;
        const notificationOptions = {
            body: payload.data.description,
        };
        registration.showNotification(notificationTitle, notificationOptions);
    });
    store.dispatch(addNotification(payload.data))
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
