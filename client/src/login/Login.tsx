import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { AuthApi } from '../api/auth.api';

import './Login.css'

interface FormValues {
    [key: string]: string
}

interface LoginProps {
    setLogin: ({ username }: { username: string }) => void,
    authApi: AuthApi
}

function Login({ setLogin, authApi }: LoginProps) {
    const [formValues, setFormValues] = useState<FormValues>();

    const onSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const user = await authApi.login({ username: formValues!.username });
        sessionStorage.setItem('username', user.username);
        setLogin(user);
    }

    const onChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [name]: value });
    }

    return (
        <div className='Login'>
            <form onSubmit={onSubmit}>
                <h2>Log In</h2>
                <input type='text' name='username' placeholder='Username' onChange={onChange} required />
                <input type='submit' value='Login' />
            </form>
        </div>
    );
}

export default Login;
