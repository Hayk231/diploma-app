import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';

console.log('homein@')

class Home extends Component {
    render() {
        return (
            <div>
                <Link to='/auth/login'>
                    <button>Login</button>
                </Link>
                <Link to='/auth/signup'>
                    <button>Sign Up</button>
                </Link>
                <Link to='/auth/signup'>
                    <button>Sign Up</button>
                </Link>
                <Link to='/auth/signup'>
                    <button>Sign Up</button>
                </Link>
            </div>

        );
    }
}

export default Home;
