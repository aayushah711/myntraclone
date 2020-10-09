import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../Redux/auth/actions';
import { Box, TextField, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    layout: {
        backgroundColor: 'red',
        height: '80vh',
        background: 'linear-gradient(to bottom right,#feedf6,#fcf0e2)',
        padding: '30px'
    },
    authPage: {
        margin: 'auto',
        width: '260px',
        height: '410px',
        background: 'white',
        padding: '60px 40px 40px'
    },
    header: {
        textAlign: 'left',
        fontSize: '20px',
        fontWeight: '500',
        color: '#424553',
        marginBottom: '20px'
    },
    formFields: {
        margin: '10px 0',
        fontSize: '12px'
    }
});

const Login = (props) => {
    window.document.title = 'Login';

    const classes = useStyles(props);
    const isAuth = useSelector((state) => state.auth.isAuth);
    let history = useHistory();
    if (isAuth) {
        history.push('/');
    }
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

    return (
        <Box className={classes.layout}>
            <Box className={classes.authPage}>
                <FormControl>
                    <Box className={classes.header}>Login to your account</Box>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className={classes.formFields}
                    />
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />

                    <Button variant="contained" type="submit" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
};

export default Login;
