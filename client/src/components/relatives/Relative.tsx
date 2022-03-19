import React from 'react';
import { UserStateInterface } from '../../types.d';
import { YourWishlist } from './YourWishlist';

interface UserStateProps {
    thisUserId: string,
    relative: UserStateInterface,
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
}

export const Relative = (props: UserStateProps) => {
    const { thisUserId, relative, setUserState } = props;

    return (
        <section className='relative-wishlist-container'>
            <p className='list-name-headline'>{relative.lists[0].name}</p>
            {relative.lists.map((list, index) => <YourWishlist thisUserId={thisUserId} relative={relative} list={list} setUserState={setUserState} key={index} />)}
        </section>
    )
}