import React from 'react';
import { Link } from 'react-router-dom';

import { User } from '../../../models/auth.model';
import { AuthApi } from '../api/auth.api';

import './Header.css';

interface HeaderProps {
    user?: User;
    authApi: AuthApi;
}

function Header({ user, authApi }: HeaderProps) {
    const logOut = async () => {
        await authApi.logout();
        sessionStorage.removeItem('user');
        window.location.reload();
    };

    return (
        <header>
            <Link to='/' className='Header-logo'>
                <span>Canvas Game</span>
            </Link>
            {user && (
                <div>
                    <span>{user.username}</span>
                    <button onClick={logOut}>Logout</button>
                </div>
            )}
        </header>
    );
}

export default Header;
