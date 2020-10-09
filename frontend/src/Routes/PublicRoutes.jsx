import React from 'react';
import { Link, Route } from 'react-router-dom';
import Home from '../Components/Home.jsx';
import Login from '../Components/Login';
import Register from '../Components/Register';

export default function Routing(props) {
    return (
        <div>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/register">Register</Link>
            </div>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
        </div>
    );
}
