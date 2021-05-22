import React, {Suspense, lazy, useEffect} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Loading from "./Helpers/components/Loading/Loading";
import {getRole, getToken} from "./Helpers/Constants";
import store from "./redux/store";
import {addNotification} from "./redux/User/userActions";
import firebase from "./firebase";
import 'firebase/messaging';

const Home = lazy(() => import('./Home/Home'));
const Auth = lazy(() => import('./Auth/Auth'));
const User = lazy(() => import('./User/User'));
const Admin = lazy(() => import('./Admin/Admin'));

function App() {

    useEffect(() => {
        const messaging = firebase.messaging();
        messaging.requestPermission().then(() => {
            return messaging.getToken({ vapidKey: 'BMG5erzYk7uh46d7Sl6M6b6bhS55j0ZkC-VsDWTEMdoLwt8txep00PKGCw-PZBYDhek-Y6F1_qSTVUJTqhfrNTw' })
        }).then((currentToken) => {
            localStorage.setItem('deviceToken', currentToken)
        }).catch(function(err) {
            console.log('Unable to get permission to notify. ', err);
        });
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
    }, [])

    return (
        <Suspense fallback={''}>
            <Switch>
                <Route exact path='/' component={() => {
                    if (getToken()) {
                        return <Redirect to={`/${getRole().toLowerCase()}`}/>
                    } else {
                        return <Redirect to='/auth/login'/>
                    }
                }}/>

                <Route path='/auth' component={() => {
                    if (getToken()) {
                        return <Redirect to='/'/>
                    } else {
                        return <Auth/>
                    }
                }}/>
                <Route path='/user'
                       render={props => {
                           console.log(props)
                           return (
                               getToken() ? (<User/>)
                               :
                               (
                                   <Redirect to={{
                                       pathname: '/auth/login',
                                       state: {from: props.location, role: 'USER'}
                                   }}
                                   />
                               )
                       )}}/>
                <Route path='/admin' component={() => {
                    if (getToken()) {
                        return <Admin/>
                    } else {
                        return <Redirect to='/auth/login'/>
                    }
                }}/>
                <Route exact path='**' component={() => (<div>error 404</div>)}/>
            </Switch>
        </Suspense>
    );
}

export default App;
