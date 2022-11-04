import React from 'react';

interface ChatBoxHeaderProps {
    chatBoxName: string;
    deleteChatBox: (name: string) => void;
}

function ChatBoxHeader({ chatBoxName, deleteChatBox }: ChatBoxHeaderProps) {
    const handleClose = () => {
        deleteChatBox(chatBoxName);
    }

    return (
        <div className="ChatBoxHeader">
            <div className='ChatBoxHeader-name'>{chatBoxName}</div>
            <div className='ChatBoxHeader-close' title="Close chatbox" onClick={handleClose}>X</div>
        </div>
    );
}

export default ChatBoxHeader;
