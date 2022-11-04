import React, { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

import { AppContext } from '../App';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessage, { ChatBoxMessageProps } from './ChatBoxMessage';
import ChatBoxText from './ChatBoxText';

interface ChatBoxProps {
    name: string;
    messages: ChatBoxMessageProps[];
}

function ChatBox({ name, messages: defaulMessages }: ChatBoxProps) {
    const { socket }: { socket: Socket } = useContext(AppContext);
    const [messages, setMessages] = useState<ChatBoxMessageProps[]>(defaulMessages);

    useEffect(() => {
        socket.on('message', (newMessage: ChatBoxMessageProps) => {
            setMessages([...messages, newMessage])
        });
    }, [socket, messages]);

    return (
        <div className="ChatBox">
            <ChatBoxHeader chatBoxName={name} />
            <div className='ChatBox-messages'>
                {messages.map((message, index) =>
                    <ChatBoxMessage key={index} username={message.username} content={message.content} />
                )}
            </div>
            <ChatBoxText />
        </div>
    );
}

export default ChatBox;
