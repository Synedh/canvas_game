import React, { ChangeEvent, KeyboardEvent, SyntheticEvent, useState } from 'react';

function ChatBoxText() {
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
