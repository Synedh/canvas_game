import React, { ChangeEvent, KeyboardEvent, SyntheticEvent, useState } from 'react';
import { Socket } from 'socket.io-client';

interface ChatBoxTextProps {
    socket: Socket;
}

function ChatBoxText({ socket }: ChatBoxTextProps) {
    const [message, setMessage] = useState<string>();

    const preventNewLine = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === 'Enter') {
             // @ts-ignore
            event.target.form.requestSubmit()
            event.preventDefault();
        }
    };

    const onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => setMessage(value);

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        socket.emit('message', message);
        console.log(message);
    }

    return (
        <div className="ChatBoxText">
            <form onSubmit={onSubmit}>
                <textarea name='text' placeholder='Send message' required onKeyPress={preventNewLine} onChange={onChange} />
            </form>
        </div>
    )
}

export default ChatBoxText;
