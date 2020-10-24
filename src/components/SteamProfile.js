import React, { useEffect, useState } from 'react'
import API from '../api/api'
import styled from 'styled-components'
import CountUp from 'react-countup';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadein 3s;

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`

const ProfileImage = styled.div`
    background-image: url(${(props) => props.url});
    background-repeat: no-repeat;
    background-position: center;
    height: 200px;
    width: 200px;
`

const ProfileCard = styled.div`
    margin-top: 40px;
    padding: 12px;
    background-color: #a8a8a8;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
`

const Name = styled.span`
    font-size: 24px;
    font-weight: 500;
`

const Divider = styled.div`
    margin-top: 8px;
    margin-bottom: 8px;
    height: 1px;
    background-color: black;
    width: 100%;
`

const Label = styled.span`
    font-size: 20px;
    display: inherit;
`

const Value = styled.span`
    display: inherit;
    font-size: 24px;
    font-weight: 400;
`

const StatusDot = styled.div`
    height: 12px;
    width: 12px;
    border-radius: 100%;
    background-color: ${props => props.color};
`

const Status = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const StatusText = styled.span`
    margin-left: 4px;
    font-weight: 500;
`

const getStatus = (id) => {
    return ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"][id]
}

const getStatusColor = (id) => {
    return ["gray", "green", "red", "yellow", "orange", "brown", "purple"][id]
}

const SteamProfile = () => {

    const [profileInfo, setProfileInfo] = useState();
    const [ownedGames, setOwnedGames] = useState();

    useEffect(() => {
        API.getProfileInfo(result => setProfileInfo(result))
    }, [])


    useEffect(() => {
        API.getOwnedGames(result => setOwnedGames(result))
    }, [])


    console.log(profileInfo)
    console.log(ownedGames)

    return <Container>
            {
                profileInfo && ownedGames && <ProfileCard>
                    <ProfileImage url={profileInfo && profileInfo.avatarfull}/>
                    <Name>{profileInfo.personaname}</Name>
                    <Status><StatusDot color={getStatusColor(profileInfo.personastate)} /><StatusText>{getStatus(profileInfo.personastate)}</StatusText></Status>
                    <Divider />
                    <Label>Owned games</Label>
                    <Value><CountUp end={ownedGames.game_count || 200} duration={2} /></Value>
                </ProfileCard>
            }
        </Container>
}


export default SteamProfile