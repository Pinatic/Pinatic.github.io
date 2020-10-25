import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import API from '../../api/api';

import ProfileImage from '../reusables/ProfileImage'
import ProfileCard from '../reusables/ProfileCard'

import ProgressBar from 'react-bootstrap/ProgressBar';
import Label from '../reusables/Label';
import Value from '../reusables/Value';
import Divider from '../reusables/Divider';
import Title from '../reusables/Title';


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadein 3s;

    @media (max-width: 768px) {
        display: grid;
    }
`

const Box = styled.div`
  padding: 10px;
  margin: 5px;
`

const Name = styled.span`
    font-size: 24px;
    font-weight: 500;
`

const getGameImageUrl = (appid, hash) => {
    return API.getGameImageUrl(appid, hash);
}

const ResentGames = () => {
    const [resentGames, setResentGames] = useState();
    const [totalAchievements, setTotalAchievements] = useState({});
    const [myAchievements, setMyAchievements] = useState({});

    const { id } = useParams();

    useEffect(() => {
        API.GetResentGames(id, (res) => {
            setResentGames(res)

            res && res.forEach(game => {
                API.GetGameAchievements(game.appid, (achievements => {
                    setTotalAchievements(prev => ({...prev, [game.appid]: achievements.achievementpercentages.achievements.length}))
                }))

                API.GetPlayerAchievements(id, game.appid, (playerAchievements => {
                    setMyAchievements(prev => ({...prev, [game.appid]: playerAchievements.playerstats.achievements.length}))
                }))
            });
        })
    }, [id])

    return resentGames ? <>
    <Title>My recent games</Title>
    <Container>
        { resentGames.slice(0,4).map(game => {
            return <Box key={game.appid}>
                <ProfileCard GameID={game.appid}>
                    <ProfileImage height={85} url={getGameImageUrl(game.appid, game.img_logo_url)}/>
                    <Name>{game.name}</Name>
                    <Divider />

                    <Label>PlayTime</Label>
                    <Value>{Math.round(game.playtime_forever / 60)} hours</Value>
                    { 
                        totalAchievements[game.appid] ? <>
                            <Divider />
                            <Label>Progress</Label>
                            <ProgressBar striped variant="success" now={100 / totalAchievements[game.appid] * myAchievements[game.appid]} />
                        </> : <div style={{marginTop: 63}} />
                    }
                </ProfileCard>
            </Box>
        })}
    </Container>
    </> : null
}

export default ResentGames;