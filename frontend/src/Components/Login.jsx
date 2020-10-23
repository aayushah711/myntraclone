import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../Redux/auth/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import GitHubLogin from 'react-github-login';
import { loginUserSuccess } from '../Redux/auth/actions';

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
        marginBottom: '10px',
        width: '100%',
        '& > *': {
            fontSize: '12px'
        }
    }
});

const Login = (props) => {
    window.document.title = 'Login';

    const classes = useStyles(props);
    const isAuth = useSelector((state) => state.auth.isAuth);
    let history = useHistory();

    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(userLogin(data));
    };
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

    const onSuccess = ({ code }) => {
        console.log('hello', code);
        // dispatch(loginUserSuccess(response));
    };
    const onFailure = (response) => console.error('bye', response);

    const githubAuth = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/users/login/github'
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    const { email, password } = data;

    if (isAuth) {
        return <Redirect to="/" />;
    } else {
        return (
            <Box className={classes.layout}>
                <Box className={classes.authPage}>
                    <FormControl fullWidth={true}>
                        <Box className={classes.header}>Login to your account</Box>
                        <Box>
                            <TextField
                                required
                                variant="outlined"
                                size="small"
                                label="Email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                className={classes.formFields}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 12
                                    },
                                    width: '100%'
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: 12
                                    }
                                }}
                            />
                        </Box>
                        <Box>
                            <TextField
                                required
                                variant="outlined"
                                size="small"
                                label="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className={classes.formFields}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 12
                                    }
                                }}
                                InputProps={{
                                    style: {
                                        fontSize: 12
                                    }
                                }}
                            />
                        </Box>

                        <Button variant="contained" type="submit" color="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </FormControl>
                    {/* <GitHubLogin
                        clientId="Iv1.975107356642b2fb"
                        redirectUri="http://localhost:5000/api/users/login/github/callback"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                    /> */}
                    <button onClick={githubAuth}>Github</button>
                    <Divider style={{ margin: '50px 0' }} variant="middle" />
                    <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        color="secondary"
                        onClick={() => history.push('/register')}
                    >
                        CREATE NEW ACCOUNT
                    </Button>
                </Box>
            </Box>
        );
    }
};

export default Login;
