import './App.css';
import React, {Suspense, lazy} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';

const Home = lazy(() => import('./Home/Home'));
const Auth = lazy(() => import('./Auth/Auth'));
const User = lazy(() => import('./User/User'));

function App() {
    return (
        <div className="App">
            <Suspense fallback={<div>Загрузка...</div>}>
                <Switch>
                    <Route exact path='/' component={() => {
                        if (localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')) {
                            return <Redirect to='/user'/>
                        } else {
                            return <Home/>
                        }
                    }}/>

                    <Route path='/auth' component={() => {
                        if (localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')) {
                            return <Redirect to='/'/>
                        } else {
                            return <Auth/>
                        }
                    }}/>
                    <Route path='/user' component={() => {
                        if (localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')) {
                            return <User/>
                        } else {
                            return <Redirect to='/auth/login'/>
                        }
                    }}/>
                    <Route exact path='**' component={() => (<div>error 404</div>)}/>
                </Switch>
            </Suspense>
        </div>
    );
};

export default App;
