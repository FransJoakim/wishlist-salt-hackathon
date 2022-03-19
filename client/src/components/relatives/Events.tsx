import React from 'react';
import { UserStateInterface } from '../../types.d';
import { Relative } from './Relative'

interface UserStateProps {
    thisUserId: string,
    relatives: UserStateInterface[],
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
 }

export const Events = (props:UserStateProps) => {
    const { thisUserId, relatives, setUserState } = props;

    return (
        <>
            {relatives.map((relative, index) => <Relative thisUserId={thisUserId} relative={relative} setUserState={setUserState} key={index} />)}
        </>
    )
}