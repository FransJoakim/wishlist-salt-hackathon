import React, { useState } from 'react';
import { ListStructure, UserStateInterface } from '../../types.d';

interface FormProps {
    thisUserId: string,
    list: ListStructure,
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
}

const Form = (props: FormProps) => {
    const { list, thisUserId, setUserState } = props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [links, setLinks] = useState("");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log('clicked')

        setTitle("");
        setDescription("");

        if (title) {

            const newItem = {
                title: title,
                description: description,
                links: [links],
                interestedGifters: [],
                numberofInterestedGifters: 0,
                gifter: [],
                numberofGifters: 0,
            };

            fetch('http://localhost:8080/wishlists/' + thisUserId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newItem,
                    action: 'Add new Item'
                })
            })
                .then(respons => respons.json())
                .then(data => setUserState(JSON.parse(data)))
                .catch((err) => console.log(err))
        }
    };

    return (
        <section className='form-container'>
            <form className='form'>
                <input
                    type="text"
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title"
                />
                <input
                    type="text"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    placeholder="Description"
                />
                <input
                    type="text"
                    onChange={e => setLinks(e.target.value)}
                    value={links}
                    placeholder="Link"
                />
                <button id="btnAddTodo" onClick={handleClick}>Add</button>
            </form>
        </section>
    )
}

export default Form
