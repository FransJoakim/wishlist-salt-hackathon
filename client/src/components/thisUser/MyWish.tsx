import React from 'react';
import { ItemStructure, UserStateInterface } from '../../types.d';

interface ItemProps {
    item: ItemStructure,
}

export const MyWish = (props: ItemProps) => {
    const { item } = props;

    const handleClick = (e: any) => {
        e.preventDefault();
        e.target.classList.toggle("active");

        const panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    }

    return (
        <div className='wish-element'>
            <button
                className="accordion"
                onClick={(e) => handleClick(e)}
            >{item.title}
            </button>
            <div className='panel'>
                <p className='panel__left__description__header'>Description:</p>
                <p className='panel__left__description'>{item.description}</p>
                <div className='link-list'>
                    {item.links.map((link, index) => <p className='link' key={index}><a href={link}>{link}</a></p>)}
                </div>
            </div>
        </div>
    )
}
