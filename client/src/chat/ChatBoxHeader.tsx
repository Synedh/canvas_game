import React from 'react';

interface ChatBoxHeaderProps {
    chanId: string
    chanName: string;
    deleteChatBox: (name: string) => void;
}

function ChatBoxHeader({ chanId, chanName, deleteChatBox }: ChatBoxHeaderProps) {
    const handleClose = () => {
        deleteChatBox(chanId);
    }

    return (
        <div className="ChatBoxHeader">
            <div className='ChatBoxHeader-name'>{chanName}</div>
            {chanId !== '0' &&
                <div className='ChatBoxHeader-close' title="Close chatbox" onClick={handleClose}>X</div>
            }
        </div>
    );
}

export default ChatBoxHeader;
