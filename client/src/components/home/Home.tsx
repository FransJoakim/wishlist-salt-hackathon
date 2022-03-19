import React from 'react';
import { UserStateInterface } from '../../types.d';
import { ThisUser } from '../thisUser/ThisUser'
import { Events } from '../relatives/Events'

interface UserStateProps {
    thisUserId: string
    userState: UserStateInterface[]
    setUserState: React.Dispatch<React.SetStateAction<UserStateInterface[]>>
 }

const Home = (props: UserStateProps) => {
    const { thisUserId, userState, setUserState } = props;

    const thisUser = userState.find(user => user.user_id === thisUserId);
    const relativesState = userState.filter(user => user.user_id !== thisUserId);


    return (
        <div className='home'>
            <ThisUser user={thisUser} setUserState={setUserState} thisUserId={thisUserId} />
            <p className='relatives-section-headline'>Loved ones' wish lists</p>
            <Events thisUserId={thisUserId} relatives={relativesState} setUserState={setUserState} />
        </div>
    );
};

export default Home;