import React from 'react';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessage, { ChatBoxMessageProps } from './ChatBoxMessage';
import ChatBoxText from './ChatBoxText';

interface ChatBoxProps {
    name: string,
    messages: ChatBoxMessageProps[]
}

function ChatBox({ name, messages }: ChatBoxProps) {
    const chatBoxMessages = messages.map((message, index) =>
        <ChatBoxMessage key={index} username={message.username} content={message.content} />
    );
    return (
        <div className="ChatBox">
            <ChatBoxHeader chatBoxName={name} />
            <div className='ChatBox-messages'>{chatBoxMessages}</div>
            <ChatBoxText />
        </div>
    )
}

export default ChatBox;
