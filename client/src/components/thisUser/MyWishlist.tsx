import React from 'react';
import { ListStructure, UserStateInterface } from '../../types.d';
import Form from './Form';
import { MyWish } from './MyWish';

interface ListProps {
    thisUserId: string,
    list: ListStructure,
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
 }

export const MyWishlist = (props: ListProps) => {
    const { list, thisUserId, setUserState } = props;

    return (
        <div className="your-list wish-list">
            <p className='list-name-headline'>{list.name}</p>
            {list.items.map((listitem, index) => <MyWish item={listitem} key={index} />)}
            <Form setUserState={setUserState} thisUserId={thisUserId} list={list} />
        </div>
    )
}