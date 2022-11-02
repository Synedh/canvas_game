import React, { SyntheticEvent, useState } from 'react';

import './Login.css'

interface FormValues {
    [key: string]: string
}

interface LoginProps {
    setLogin: ({ username }: { username: string }) => void
}

function Login({ setLogin }: LoginProps) {
    const [formValues, setFormValues] = useState<FormValues>();

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        setLogin({ username: formValues!.username });
    }

    const onChange = ({ target: { name, value } }: any) => {
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
