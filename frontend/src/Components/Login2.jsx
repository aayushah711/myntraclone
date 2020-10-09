import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../Redux/auth/actions';

const Login = (props) => {
    window.document.title = 'Login';

    const isAuth = useSelector((state) => state.auth.isAuth);
    const [ data, setData ] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(userLogin(data));
    };
    const { email, password } = data;
    console.log(isAuth);

    return (
        <div>
            <form name="loginForm">
                <h1>Login Form</h1>
                <div>
                    <label>
                        Email:
                        <input type="text" name="email" value={email} onChange={handleChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" name="password" value={password} onChange={handleChange} />
                    </label>
                </div>

                <input type="submit" value="Login" onClick={handleLogin} />
            </form>
        </div>
    );
};

export default Login;
