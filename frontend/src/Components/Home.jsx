import Button from '@material-ui/core/Button';
import Axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/auth/actions';
import { changeSpinner } from '../Redux/app/actions';

const Home = (props) => {
    window.document.title = 'Welcome!';

    const isAuth = useSelector((state) => state.auth.isAuth);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const dispatch = useDispatch();
    const [ fullName, setFullName ] = useState('');

    useEffect(
        () => {
            if (isAuth) {
                dispatch(changeSpinner(true));
                Axios({
                    method: 'GET',
                    url: 'http://localhost:5000/api/users',
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                })
                    .then((res) => {
                        dispatch(changeSpinner(false));
                        setFullName(res.data.fullName);
                    })
                    .catch((err) => {
                        dispatch(changeSpinner(false));
                        console.log(err);
                    });
            }
        },
        [ isAuth, accessToken ]
    );

    return (
        <div>
            <div>{isAuth ? `Hello ${fullName}` : 'Welcome'}</div>
            <div>
                {isAuth ? (
                    <Button variant="contained" type="submit" color="primary" onClick={() => dispatch(logoutUser())}>
                        Logout
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default Home;
