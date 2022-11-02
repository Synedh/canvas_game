import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

interface HeaderProps {
    login?: { [key: string]: string }
}

function Header({ login }: HeaderProps) {
    return (
        <header>
            <Link to='/' className='Header-logo'>
                <span>Canvas Game</span>
            </Link>
            {login && (
                <span>{login.username}</span>
            )}
        </header>
    )
}

export default Header;
