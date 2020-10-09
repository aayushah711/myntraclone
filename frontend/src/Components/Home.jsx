import React from 'react';
import { useSelector } from 'react-redux';

const Home = (props) => {
    window.document.title = 'Welcome!';

    const isAuth = useSelector((state) => state.auth.isAuth);
    const fullName = useSelector((state) => state.auth.fullName);
    return <div>{isAuth ? 'Hello ' + fullName : 'Hello stranger'}</div>;
};

export default Home;
