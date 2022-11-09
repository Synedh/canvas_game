import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import { User } from '../../../models/auth.model';
import { AuthApi } from '../api/auth.api';
import { Tab } from '../App'

import './Header.css';

interface HeaderProps {
    user?: User;
    authApi: AuthApi;
    activeTab: Tab;
    saveActiveTab: (tab: Tab) => void
}

function Header({ user, authApi, activeTab, saveActiveTab }: HeaderProps) {
    const [expand, setExpand] = useState<boolean>(false);
    const headerDisconnect = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setExpand(true);
    };
    const handleclickOutside = (event: any) => {
        if (!headerDisconnect.current?.contains(event.target)) {
            setExpand(false);
        }
    };

    const logOut = async () => {
        authApi.logout();
        sessionStorage.clear();
        window.location.reload();
    };

    useEffect(() => {
        document.addEventListener('click', handleclickOutside);
        return () => {
            document.removeEventListener('click', handleclickOutside);
        };
    })

    return (
        <header>
            <div className='Header-links'>
                <div className='Header-logo' onClick={() => saveActiveTab(Tab.Home)}>
                    <span>Canvas Game</span>
                </div>
                {user && (
                    <div className='Header-tabs'>
                        <div className={`Header-tab button-icon ${activeTab === Tab.Game && 'active'}`} onClick={() => saveActiveTab(Tab.Game)}>
                            Game
                        </div>
                    </div>
                )}
            </div>
            {user && (
                <div className='Header-actions'>
                    <span>{user.name}</span>
                    <div
                        className={`Header-disconnect button-icon ${expand ? 'expand' : ''}`}
                        onClick={expand ? logOut : handleClick}
                        ref={headerDisconnect}
                    >
                        <span>&#8855;</span>
                        <span>Disconnect</span>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
