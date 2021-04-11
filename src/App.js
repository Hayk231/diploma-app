import React, {Suspense, lazy} from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import Loading from "./Helpers/components/Loading/Loading";
import {getToken} from "./Helpers/Constants";

const Home = lazy(() => import('./Home/Home'));
const Auth = lazy(() => import('./Auth/Auth'));
const User = lazy(() => import('./User/User'));

function App() {
    return (
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route exact path='/' component={() => {
                    if (getToken()) {
                        return <Redirect to='/user'/>
                    } else {
                        return <Home/>
                    }
                }}/>

                <Route path='/auth' component={() => {
                    if (getToken()) {
                        return <Redirect to='/'/>
                    } else {
                        return <Auth/>
                    }
                }}/>
                <Route path='/user' component={() => {
                    if (getToken()) {
                        return <User/>
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
