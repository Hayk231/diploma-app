import './App.css';
import React, { Suspense, lazy } from "react";
import { Route, Switch, Redirect } from 'react-router-dom';

const Home = lazy(() => import('./Home/Home'));
const Auth = lazy(() => import('./Auth/Auth'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Загрузка...</div>}>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/auth' component={Auth}/>
          <Route exact path='**' component={Auth}/>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
