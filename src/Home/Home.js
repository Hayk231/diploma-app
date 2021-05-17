import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <Link to='/auth/login'>
                    <button>Login</button>
                </Link>
                <Link to='/auth/signup'>
                    <button>Sign Up</button>
                </Link>
            </div>

        );
    }
}

export default Home;
