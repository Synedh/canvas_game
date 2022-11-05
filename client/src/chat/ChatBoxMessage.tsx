import React from 'react';

import { Message } from '../../../models/chat.models';

type ChatBoxMessageProps = Message;

function ChatBoxMessage({ user, content }: ChatBoxMessageProps) {
    return (
        <div className="ChatBoxMessage">
            <span className='ChatBoxMessage-username'>
                {user.name}
            </span>: <span className='content'>
                {content}
            </span>
        </div>
    );
}

export default ChatBoxMessage;
