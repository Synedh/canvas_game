import React, { useContext, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import { AppContext } from '../App';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessage, { ChatBoxMessageProps } from './ChatBoxMessage';
import ChatBoxText from './ChatBoxText';

interface ChatBoxProps {
    name: string;
    messages: ChatBoxMessageProps[];
    deleteChatBox: (name: string) => void;
}

function ChatBox({ name, messages: defaulMessages, deleteChatBox }: ChatBoxProps) {
    const { socket }: { socket: Socket } = useContext(AppContext);
    const chatBoxMessages = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<ChatBoxMessageProps[]>(defaulMessages);

    useEffect(() => {
        socket.on('message', (newMessage: ChatBoxMessageProps) => {
            setMessages([...messages, newMessage])
            chatBoxMessages.current?.scrollIntoView({ behavior: "smooth" });
        });
    }, [socket, messages]);

    return (
        <div className="ChatBox">
            <ChatBoxHeader chatBoxName={name} deleteChatBox={deleteChatBox} />
            <div className='ChatBox-messages' ref={chatBoxMessages}>
                {messages.map((message, index) =>
                    <ChatBoxMessage key={index} username={message.username} content={message.content} />
                )}
            </div>
            <ChatBoxText />
        </div>
    );
}

export default ChatBox;
