import React from 'react';

import './Chat.css';
import ChatBox from './ChatBox';

const CHAT_BOXES_CONTENT = [{
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

function Chat() {
    return (
        <div className="Chat">
            {CHAT_BOXES_CONTENT.map((box, index) =>
                <ChatBox key={index} name={box.name} messages={box.messages} />
            )}
        </div>
    );
}

export default Chat;
