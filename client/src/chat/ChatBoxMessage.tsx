import React, { useEffect, useState } from 'react';

import { Message } from '../../../models/chat.models';
import { stringToColour } from '../utils/color';

interface ChatBoxMessageProps {
    message: Message;
}

function ChatBoxMessage({ message: { user, type, content } }: ChatBoxMessageProps) {
    const [strColor, setStrColor] = useState<string>();

    useEffect(() => {
        const color = stringToColour(user?.name || '');
        setStrColor(`rgb(${color.red},${color.green},${color.blue})`);
    }, [user]);

    return (
        <div className="ChatBoxMessage">
            {type === 0 && (
                <div className='ChatBoxMessage-system'>
                    <span className='content'>
                        (System): {content}
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
                    <span
                        style={ { color: strColor } }
                        className='ChatBoxMessage-username'>
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
