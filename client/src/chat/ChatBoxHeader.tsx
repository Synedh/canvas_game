import React from 'react';

interface ChatBoxHeaderProps {
    chatBoxName: string;
}

function ChatBoxHeader({ chatBoxName}: ChatBoxHeaderProps) {
    return (
        <div className="ChatBoxHeader">
            <div className='ChatBoxHeader-name'>{chatBoxName}</div>
        </div>
    )
}

export default ChatBoxHeader;
