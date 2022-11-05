import React, { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";

function ChatBoxAddUser () {
    const inputCheckbox = useRef<HTMLInputElement>(null);
    const inputUsername = useRef<HTMLInputElement>(null);
    const [username, setUsername] = useState<string>();

    const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setUsername(value);
    };

    const onSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log(username);
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
