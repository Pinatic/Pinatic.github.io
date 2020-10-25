import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

import API from '../../api/api';
import Title from '../reusables/Title';
import SteamProfile from './SteamProfile';


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadein 3s;
`

const Box = styled.div`
  padding: 10px;
  margin: 5px;
`

export default () => {
    const [friends, setFriends] = useState();
    const { id } = useParams();

    useEffect(() => {
        API.GetFriends(id, res => {
            setFriends(res)
        })
    }, [])

    console.log(friends)

    return <>
        <Title>My first three Friends</Title>
        <Container>
            {
                friends && friends.friendslist.friends.sort((a,b) => a.friend_since - b.friend_since).slice(0, 3).map(friend => {
                return <Box>
                    <SteamProfile key={friend.steamid} gameId={friend.steamid} />
                </Box>
                })
            }
        </Container>
    </>
}