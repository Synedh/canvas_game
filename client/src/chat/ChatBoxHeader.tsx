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
                <div className='ChatBoxHeader-options'>
                    <label className='ChatBoxHeader-adduser' title="Add user"  htmlFor="modal-control"></label>
                    <div className='ChatBoxHeader-close' title="Close" onClick={handleClose}></div>
                </div>
            }
        </div>
    );
}

export default ChatBoxHeader;
