import React, { ChangeEvent, SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { AppContext } from "../App";

interface ChatBoxAddUserProps {
    chanId: string;
}

function ChatBoxAddUser ({ chanId }: ChatBoxAddUserProps) {
    const inputCheckbox = useRef<HTMLInputElement>(null);
    const inputUsername = useRef<HTMLInputElement>(null);
    const { socket } = useContext<{ socket: Socket }>(AppContext);
    const [username, setUsername] = useState<string>('');

    const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setUsername(value);
    };

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        socket.emit(`chan:invite`, chanId, username);
        inputCheckbox.current?.click();
        setUsername('');
    };

    useEffect(() => {
        inputCheckbox.current?.value && inputUsername.current?.focus();
    }, [inputCheckbox.current?.value]);

    return (
        <div className="ChatBoxAddUser">
            <input type="checkbox" id="modal-control" className="modal" ref={inputCheckbox} />
            <div>
                <div className="card">
                    <label htmlFor="modal-control" className="modal-close" ></label>
                    <h3 className="section">Add user</h3>
                    <div className="section">
                        <form onSubmit={onSubmit}>
                            <div className="input-group fluid">
                                <input 
                                    type="text"
                                    placeholder="Username"
                                    onChange={onChange}
                                    autoFocus={true}
                                    value={username}
                                    ref={inputUsername}
                                    required
                                />
                                <input
                                    type="submit"
                                    value="Add"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBoxAddUser;
