import React, { useEffect, useState } from 'react'
import API from '../../api/api'
import styled from 'styled-components'
import CountUp from 'react-countup';
import { useParams } from 'react-router-dom'

import { Status, StatusDot, StatusText, getStatus, getStatusColor } from '../reusables/Status';
import Value from '../reusables/Value';
import Label from '../reusables/Label';
import Divider from '../reusables/Divider';
import ProfileImage from '../reusables/ProfileImage';
import ProfileCard from '../reusables/ProfileCard';

const Name = styled.span`
    font-size: 24px;
    font-weight: 500;
`

const SteamProfile = (props) => {
    const [profileInfo, setProfileInfo] = useState();
    const [ownedGames, setOwnedGames] = useState();
    const { id } = useParams();

    // From props or url
    const GameID = props.gameId || id;

    useEffect(() => {
        API.getProfileInfo(GameID, result => setProfileInfo(result))
    }, [])


    useEffect(() => {
        API.getOwnedGames(GameID, result => setOwnedGames(result))
    }, [])


    console.log(profileInfo)
    console.log(ownedGames)

    return profileInfo && ownedGames ? <ProfileCard GameID={GameID}>
        <ProfileImage url={profileInfo && profileInfo.avatarfull}/>
        <Name>{profileInfo.personaname}</Name>
        <Status><StatusDot color={getStatusColor(profileInfo.personastate)} /><StatusText>{getStatus(profileInfo.personastate)}</StatusText></Status>
        <Divider />
        <Label>Owned games</Label>
        <Value><CountUp end={ownedGames.game_count || 200} duration={2} /></Value>
    </ProfileCard> : <></>
}


export default SteamProfile