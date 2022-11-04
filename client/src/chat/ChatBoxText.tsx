import React, { ChangeEvent, KeyboardEvent, SyntheticEvent, useContext, useState } from 'react';
import { Socket } from 'socket.io-client';

import { AppContext } from '../App';

function ChatBoxText() {
    const { socket }: { socket: Socket } = useContext(AppContext);
    const [message, setMessage] = useState<string>();

    const preventNewLine = (event: KeyboardEvent) => {
        if(event.key === 'Enter') {
            event.preventDefault();
             // @ts-ignore
            event.target.form.requestSubmit();
        }
    };

    const onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(value);
    };

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (message) {
            setMessage('');
            socket.emit('message', message);
        }
    };

    return (
        <div className="ChatBoxText">
            <form onSubmit={onSubmit}>
                <textarea
                    name='text'
                    placeholder='Send message'
                    onKeyPress={preventNewLine}
                    onChange={onChange}
                    value={message}
                />
            </form>
        </div>
    );
}

export default ChatBoxText;
