import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import { UserDto } from '../../../models/auth.model';
import { Chan, Message } from '../../../models/chat.models';

import { SocketContext } from '../App';
import ChatBoxAddUser from './ChatBoxAddUser';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessage from './ChatBoxMessage';
import ChatBoxText from './ChatBoxText';

interface ChatBoxProps {
    chan: Chan;
    deleteChatBox: (name: string) => void;
}

function ChatBox({ chan, deleteChatBox }: ChatBoxProps) {
    const socket = useContext(SocketContext) as Socket;
    const chatBoxMessages = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>(chan.messages);
    const [chanName, setChanName] = useState<string>(chan.name);
    const [scrollHeight, setScrollHeight] = useState(chatBoxMessages.current?.scrollTop || 0);

    const displayMessage = useCallback((newMessage: Message) => {
        setMessages([...messages, newMessage]);
    }, [messages]);

    const userJoined = useCallback((user: UserDto) => {
        if (chan.id !== '0') {
            const newChanName = chanName.split(', ')
                .concat(user.name)
                .sort()
                .join(', ');
            setChanName(newChanName);
        }
    }, [chanName, chan.id]);

    const userLeft = useCallback((user: UserDto) => {
        const newChanName = chanName.split(', ')
            .filter(name => name !== user.name)
            .join(', ');
        setChanName(newChanName);
    }, [chanName]);

    useEffect(() => {
        const messagesBox = chatBoxMessages.current;
        const newScrollHeight = messagesBox?.scrollHeight || 0;
        const previousScroll = (messagesBox?.scrollTop || 0) + (messagesBox?.offsetHeight || 0);
        if (previousScroll === scrollHeight) {
            messagesBox?.scrollTo({ top: newScrollHeight, behavior: 'smooth' });
        }
        setScrollHeight(newScrollHeight || 0);
    }, [messages, scrollHeight]);

    useEffect(() => {
        socket.on(`${chan.id}:message`, displayMessage);
        socket.on(`${chan.id}:user_joined`, userJoined);
        socket.on(`${chan.id}:user_left`, userLeft);
    }, [socket, chan.id, displayMessage, userJoined, userLeft]);

    return (
        <div className="ChatBox">
            <ChatBoxHeader chanId={chan.id} chanName={chanName} deleteChatBox={deleteChatBox} />
            <div className='ChatBox-messages-wrapper'>
                <div className='ChatBox-messages' ref={chatBoxMessages}>
                    {messages.map((message, index) =>
                        <ChatBoxMessage key={index} message={message} />
                    )}
                </div>
            </div>
            <ChatBoxText chanId={chan.id} />
            <ChatBoxAddUser chanId={chan.id} />
        </div>
    );
}

export default ChatBox;
