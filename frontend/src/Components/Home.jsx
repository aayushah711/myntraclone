import Button from '@material-ui/core/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Redux/auth/actions';

const Home = (props) => {
    window.document.title = 'Welcome!';

    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();

    return (
        <div>
            <div>{isAuth ? 'Hello ' : 'Welcome'}</div>
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
