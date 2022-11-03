import React from 'react';
import { Socket } from 'socket.io-client';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessage, { ChatBoxMessageProps } from './ChatBoxMessage';
import ChatBoxText from './ChatBoxText';

interface ChatBoxProps {
    name: string;
    messages: ChatBoxMessageProps[];
    socket: Socket;
}

function ChatBox({ name, messages, socket }: ChatBoxProps) {
    const chatBoxMessages = messages.map((message, index) =>
        <ChatBoxMessage key={index} username={message.username} content={message.content} />
    );
    return (
        <div className="ChatBox">
            <ChatBoxHeader chatBoxName={name} />
            <div className='ChatBox-messages'>{chatBoxMessages}</div>
            <ChatBoxText socket={socket} />
        </div>
    )
}

export default ChatBox;
