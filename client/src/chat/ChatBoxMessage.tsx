import React from 'react';

export interface ChatBoxMessageProps {
    username: string;
    content: string;
}

function ChatBoxMessage({ username, content }: ChatBoxMessageProps) {
    return (
        <div className="ChatBoxMessage">
            <span className='ChatBoxMessage-username'>{username}</span>: <span className='content'>{content}</span>
        </div>
    )
}

export default ChatBoxMessage;
