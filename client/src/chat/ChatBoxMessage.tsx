import React from 'react';

import { Message } from '../../../models/chat.models';

interface ChatBoxMessageProps {
    message: Message;
}

function ChatBoxMessage({ message: { user, type, content } }: ChatBoxMessageProps) {
    return (
        <div className="ChatBoxMessage">
            {type === 0 && (
                <div className='ChatBoxMessage-system'>
                    <span className='ChatBoxMessage-username'>
                        (System)
                    </span>: <span className='content'>
                        {content}
                    </span>
                </div>
            )}
            {type === 1 && (
                <div className='ChatBoxMessage-chan_info'>
                    <span className='content'>
                        {content}
                    </span>
                </div>
            )}
            {type === 2 && (
                <div className='ChatBoxMessage-user'>
                    <span className='ChatBoxMessage-username'>
                        {user?.name}
                    </span>: <span className='content'>
                        {content}
                    </span>
                </div>
            )}
            {type === 3 && (
                <div className='ChatBoxMessage-game'>
                    <span className='content'>
                        {content}
                    </span>
                </div>
            )}
        </div>
    );
}

export default ChatBoxMessage;
