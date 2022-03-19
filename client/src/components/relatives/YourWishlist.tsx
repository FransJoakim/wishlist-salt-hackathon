import React from 'react';
import { ListStructure, UserStateInterface } from '../../types.d';
import { YourWish } from './YourWish';

interface ListProps {
    thisUserId: string,
    relative: UserStateInterface,
    list: ListStructure,
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
 }

export const YourWishlist = (props: ListProps) => {
    const { thisUserId, relative, list, setUserState } = props;

    return (
        <div className="my-list wish-list">
            <p className='list-headline'>{relative.username}'s</p>
            {list.items.map((listitem, index) => <YourWish listId={list.list_id} thisUserId={thisUserId} relativeId={relative.user_id} item={listitem} setUserState={setUserState} key={index} />)}
        </div>
    )
}