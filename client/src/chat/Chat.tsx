import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { AppContext } from '../App';

import { Chan } from '../../../models/chat.models';

import './Chat.css';
import ChatBox from './ChatBox';

function Chat() {
    const { socket }: { socket: Socket } = useContext(AppContext);
    const [chans, setChans] = useState<Chan[]>([]);

    const joinNewChan = () => {
        socket.emit('chan:create');
    };

    const newChatBox = useCallback((newChan: Chan) => {
        if (!chans.some((chan) => chan.id === newChan.id)) {
            setChans([newChan, ...chans]);
        }
    }, [chans]);

    const deleteChatBox = useCallback((chanId: string) => {
        setChans(chans.filter(chan => chan.id !== chanId));
    }, [chans]);

    useEffect(() => {
        socket.on('chat:join', newChatBox);
        socket.on('chat:leave', deleteChatBox);
    }, [socket, newChatBox, deleteChatBox]);

    return (
        <>
        <div className="Chat">
            <div className='Chat-inner'>
                <div className='Chat-newchan' title='Open chatbox' onClick={joinNewChan}>+</div>
                {chans.map((chan, index) =>
                    <ChatBox key={index} chan={chan} deleteChatBox={deleteChatBox} />
                )}
            </div>
        </div>
        </>
    );
}

export default Chat;
