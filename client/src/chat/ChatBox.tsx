import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import { UserDto } from '../../../models/auth.model';
import { Chan, Message } from '../../../models/chat.models';

import { AppContext } from '../App';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessage from './ChatBoxMessage';
import ChatBoxText from './ChatBoxText';

interface ChatBoxProps {
    chan: Chan;
    deleteChatBox: (name: string) => void;
}

function ChatBox({ chan, deleteChatBox }: ChatBoxProps) {
    const { socket }: { socket: Socket } = useContext(AppContext);
    const chatBoxMessages = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Message[]>(chan.messages);

    const displayMessage = useCallback((newMessage: Message) => {
        setMessages([...messages, newMessage])
        chatBoxMessages.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const userJoined = useCallback((user: UserDto) => {
        console.log(`${user.name} joined chan ${chan.name}`);
    }, [chan.name]);

    const userLeft = useCallback((user: UserDto) => {
        console.log(`${user.name} left chan ${chan.name}`);
    }, [chan.name]);

    useEffect(() => {
        socket.on(`${chan.id}:message`, displayMessage);
        socket.on(`${chan.id}:user_joined`, userJoined);
        socket.on(`${chan.id}:user_left`, userLeft);
    }, [socket, chan.id, displayMessage, userJoined, userLeft]);

    return (
        <div className="ChatBox">
            <ChatBoxHeader chanId={chan.id} chanName={chan.name} deleteChatBox={deleteChatBox} />
            <div className='ChatBox-messages' ref={chatBoxMessages}>
                {messages.map((message, index) =>
                    <ChatBoxMessage key={index} user={message.user} content={message.content} />
                )}
            </div>
            <ChatBoxText chanId={chan.id} />
        </div>
    );
}

export default ChatBox;
