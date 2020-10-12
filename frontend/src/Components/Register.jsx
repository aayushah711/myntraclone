import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
const Register = (props) => {
    window.document.title = 'Register';

    // const isAuth = useSelector((state) => state.auth.isAuth);
    const state = useSelector((state) => state);
    const { message } = state.auth;
    const [ error, setError ] = useState(false);

    const [ data, setData ] = useState({
        email: '',
        password: '',
        fullName: '',
        mobile: '',
        gender: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const dispatch = useDispatch();
    const handleRegister = (e) => {
        e.preventDefault();
        // dispatch(userRegister(data));
    };
    const { email, password, fullName, mobile, gender } = data;

    if (error) {
        return <Redirect to="/login" />;
    } else {
        return (
            <div>
                <form name="registerForm">
                    <h1>Register Form</h1>
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
                    <div>
                        <label>
                            Full Name:
                            <input type="text" name="fullName" value={fullName} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Mobile:
                            <input type="tel" name="mobile" value={mobile} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Gender:
                            <input type="text" name="gender" value={gender} onChange={handleChange} />
                        </label>
                    </div>

                    <input type="submit" value="register" onClick={handleRegister} />
                </form>

                {message && <div>{message}</div>}
            </div>
        );
    }
};

export default Register;
