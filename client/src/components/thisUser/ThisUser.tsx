import React from 'react';
import { UserStateInterface } from '../../types.d';
import { MyWishlist } from './MyWishlist';

interface UserStateProps {
    thisUserId: string,
    user: UserStateInterface | any,
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
 }

export const ThisUser = (props: UserStateProps) => {
    const { user, thisUserId, setUserState } = props;

    return (
        <section className='MyUserSection'>
            {user && <p className='my-list-headline'>My wish list</p>}
            {user.lists.map((list:any, index:any) => <MyWishlist list={list} thisUserId={thisUserId} setUserState={setUserState} key={index} />)}
        </section>
      );
}