import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarWrappper = styled.div`
    position: sticky;
    top: 0px;
    background-color: white;
    /* width: 100vw; */
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 0 0 10px 0 gainsboro;
    & > * {
        margin: 2px;
        padding: 4px 20px;
        text-decoration: none;
        color: black;
        font-weight: 600;
        font-size: 14px;
    }
    & > a:nth-last-child(3) {
        margin-left: auto;
    }
`;

export default function Navbar(props) {
    return (
        <NavbarWrappper>
            <Link to="/">
                <img src="../myntra-logo.png" alt="M" height="50px" width="50px" />
            </Link>
            <Link to="/men">MEN</Link>
            <Link to="/women">WOMEN</Link>
            <Link to="/kids">KIDS</Link>
            <Link to="/homeLiving">HOME & LIVING</Link>
            <Link to="/essentials">ESSENTIALS</Link>
            <Link to="/login">
                <div>
                    <img src="./resources/profile.png" alt="PROFILE" height="20" width="20" />
                    <div>Profile</div>
                </div>
            </Link>
            <Link to="/wishlist">
                <div>
                    <img src="./resources/wishlist.png" alt="WISHLIST" height="20" width="20" />
                    <div>Wishlist</div>
                </div>
            </Link>
            <Link to="/bag">
                <div>
                    <img src="./resources/shopping-bag.png" alt="BAG" height="20" width="20" />
                    <div>Bag</div>
                </div>
            </Link>
        </NavbarWrappper>
    );
}
