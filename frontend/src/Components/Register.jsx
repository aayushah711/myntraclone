import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../Redux/axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { changeSpinner, openSnackbar } from '../Redux/app/actions';
import { useDispatch } from 'react-redux';

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

const Register = (props) => {
    window.document.title = 'Register';
    const classes = useStyles(props);

    // const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    const [ error, setError ] = useState(true);

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

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(changeSpinner(true));
        const { email, password, fullName, mobile, gender } = data;
        try {
            let res = await axios({
                method: 'post',
                url: '/register',
                data: {
                    email,
                    password,
                    fullName,
                    mobile,
                    gender
                }
            });
            console.log('res', res);
            dispatch(
                openSnackbar({
                    message: 'Success',
                    severity: 'success'
                })
            );
            setError(false);
            dispatch(changeSpinner(false));
        } catch (err) {
            console.log('err', err);
            dispatch(
                openSnackbar({
                    message: err.response.data,
                    severity: 'error'
                })
            );
            setError(true);
            dispatch(changeSpinner(false));
        }
    };
    const { email, password, fullName, mobile, gender } = data;

    if (!error) {
        return (
            <div>
                <Redirect to="/login" />
            </div>
        );
    } else {
        return (
            <div>
                <Box className={classes.layout}>
                    <Box className={classes.authPage}>
                        <FormControl fullWidth={true}>
                            <Box className={classes.header}>Register as new user</Box>
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

                            <Box>
                                <TextField
                                    required
                                    variant="outlined"
                                    size="small"
                                    label="fullName"
                                    type="text"
                                    name="fullName"
                                    value={fullName}
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
                                    label="mobile"
                                    type="number"
                                    name="mobile"
                                    value={mobile}
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
                                    label="gender"
                                    type="text"
                                    name="gender"
                                    value={gender}
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

                            <Button variant="contained" type="submit" color="primary" onClick={handleRegister}>
                                Register
                            </Button>
                        </FormControl>
                    </Box>
                </Box>
            </div>
        );
    }
};

export default Register;
