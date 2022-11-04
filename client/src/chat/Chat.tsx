import React, { useState } from 'react';

import './Chat.css';
import ChatBox from './ChatBox';
import { ChatBoxMessageProps } from './ChatBoxMessage';

const CHAT_BOXES_CONTENT = [{
    name: 'Foo',
    messages: [
        { 'username': 'Test', 'content': 'Animi rerum laboriosam ex. Inventore et quia aut esse. Harum magni id possimus sit. Tempora eum natus ratione harum sed aperiam rerum.' },
        { 'username': 'Toto', 'content': 'Culpa explicabo aliquid quos similique quibusdam enim unde. Aliquid sunt aut non quasi qui. Tenetur tempora et corrupti et voluptas repellat et.' },
    ]
}];

function Chat() {
    const [chatBoxContent, setChatBoxContent] = useState<{ name: string, messages: ChatBoxMessageProps[] }[]>(CHAT_BOXES_CONTENT);

    const newChatBox = () => {
        setChatBoxContent([{ name: `Test${chatBoxContent.length}`, messages: [] }, ...chatBoxContent]);
    }

    const deleteChatBox = (name: string) => {
        setChatBoxContent(chatBoxContent.filter(box => box.name !== name));
    }

    return (
        <>
        <div className="Chat">
            <div onClick={newChatBox}>Add</div>
            {chatBoxContent.map((box, index) =>
                <ChatBox key={index} name={box.name} messages={box.messages} deleteChatBox={deleteChatBox} />
            )}
        </div>
        </>
    );
}

export default Chat;
