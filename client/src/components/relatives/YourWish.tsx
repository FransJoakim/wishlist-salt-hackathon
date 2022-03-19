import React from 'react';
import { ItemStructure, UserStateInterface } from '../../types.d';

interface ItemProps {
    thisUserId: string,
    relativeId: string,
    listId: string,
    item: ItemStructure,
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
}

export const YourWish = (props: ItemProps) => {
    const { listId, thisUserId, relativeId, item, setUserState } = props;

    const handleAccordionClick = (e: any) => {
        e.preventDefault();
        e.target.classList.toggle("active");

        const panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    const handleBtnClick = async (event: any) => {
        event.preventDefault();
        fetch('http://localhost:8080/wishlists/' + relativeId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listId: listId,
                itemId: item.item_id,
                giftersId: thisUserId,
                action: event.target.name
            })
        })
            .then(respons => respons.json())
            .then(data => setUserState(JSON.parse(data)))
    }

    return (
        <div className='wish-element'>
            <button
                className="accordion"
                onClick={(e) => handleAccordionClick(e)}
            >{item.title}
            </button>
            <div className='your-panel panel'>
                <div className='panel__left'>
                    <p className='panel__left__description__header'>Description:</p>
                    <p className='panel__left__description'>{item.description}</p>
                    <div className='link-list'>
                        {item.links.map((link, index) => <p className='link' key={index}><a href={link}>{link}</a></p>)}
                    </div>
                </div>
                <div className='panel__right'>
                    <table className='toggle-wish-btns'>
                        <tr>
                            <td>
                                <button
                                    className='panel__right__toggle-btn'
                                    name="Interested gifter"
                                    onClick={event => handleBtnClick(event)}
                                >I wish to gift
                                </button>
                            </td>
                            <td>
                                {item.interestedGifters ? <p className='panel__right__gift-statusTxt'>{item.numberofInterestedGifters} others</p> : ""}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button
                                    className='panel__right__toggle-btn'
                                    name="Bought"
                                    onClick={event => handleBtnClick(event)}
                                >
                                    Bought/made
                                </button>
                            </td>
                            <td>
                                {item.gifter ? <p className='panel__right__gift-statusTxt'>{item.numberofGifters} others</p> : ""}
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}
