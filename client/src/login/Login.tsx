import React, { ChangeEvent, SyntheticEvent, useState } from 'react';

import { User } from '../../../models/auth.model';
import { AuthApi } from '../api/auth.api';

import './Login.css'

interface FormValues {
    [key: string]: string
}

interface LoginProps {
    setUser: (user: User) => void,
    setToken: (token: string) => void,
    authApi: AuthApi
}

function Login({ setUser, setToken, authApi }: LoginProps) {
    const [formValues, setFormValues] = useState<FormValues>();
    const [disabled, setDisabled] = useState<boolean>(false);

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        setDisabled(true);
        const { user, token } = await authApi.login({ username: formValues!.username });
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        setUser(user);
        setToken(token);
        setDisabled(false);
    };

    const onChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className='Login'>
            <form onSubmit={onSubmit}>
                <h2>Log In</h2>
                <input
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={onChange}
                    disabled={disabled}
                    required
                />
                <input
                    type='submit'
                    value='Login'
                    disabled={disabled}
                />
            </form>
        </div>
    );
}

export default Login;
