import React from 'react';
import { Socket } from 'socket.io-client';

import './Chat.css';
import ChatBox from './ChatBox';

interface ChatProps {
    socket: Socket;
}

function Chat({ socket }: ChatProps) {
    const boxes = [{
        name: 'Foo',
        messages: [
            { 'username': 'Test', 'content': 'Animi rerum laboriosam ex. Inventore et quia aut esse. Harum magni id possimus sit. Tempora eum natus ratione harum sed aperiam rerum.' },
            { 'username': 'Toto', 'content': 'Culpa explicabo aliquid quos similique quibusdam enim unde. Aliquid sunt aut non quasi qui. Tenetur tempora et corrupti et voluptas repellat et.' },
        ]
    }, {
        name: 'Bar',
        messages: [
            { 'username': 'Test', 'content': 'Esse mollitia aut delectus aliquid molestiae. Sint asperiores vel quae. Nisi est consequatur quia quam totam nam quibusdam. Tempore eligendi praesentium sint dicta error reprehenderit.' },
            { 'username': 'Toto', 'content': 'Ea voluptatem porro voluptas fuga necessitatibus sint sed laborum. Cupiditate optio quia voluptate pariatur id. Quis sint omnis est ea aut et et enim. Qui quam doloribus nobis corporis unde reprehenderit. Magnam aut inventore enim iste est autem quisquam velit.' },
        ]
    }];
    const chatBoxes = boxes.map((box, index) =>
        <ChatBox key={index} name={box.name} messages={box.messages} socket={socket} />
    );
    return (
        <div className="Chat">
            {chatBoxes}
        </div>
    );
}

export default Chat;
