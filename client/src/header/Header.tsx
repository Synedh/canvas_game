import React from 'react';
import { Link } from 'react-router-dom';
import { AuthApi } from '../api/auth.api';

import './Header.css';

interface HeaderProps {
    login: { [key: string]: string };
    authApi: AuthApi;
}

function Header({ login, authApi }: HeaderProps) {
    const logOut = async () => {
        await authApi.logout();
        sessionStorage.removeItem('username');
        window.location.reload();
    };

    return (
        <header>
            <Link to='/' className='Header-logo'>
                <span>Canvas Game</span>
            </Link>
            {login.username && (
                <div>
                    <span>{login.username}</span>
                    <button onClick={logOut}>Logout</button>
                </div>
            )}
        </header>
    )
}

export default Header;
