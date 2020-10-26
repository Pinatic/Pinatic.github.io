import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import Card from '../reusables/ProfileCard'
import Label from '../reusables/Label'
import Value from '../reusables/Value'
import Divider from '../reusables/Divider';
import { Status, StatusDot, StatusText, getStatus, getStatusColor } from '../reusables/Status';
import API from '../../api/api';
import CountUp from 'react-countup';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadein 3s;
    margin-bottom: 24px;
    margin-top: 24px;
`
const Name = styled.span`
    font-size: 24px;
    font-weight: 500;
`

const Button = styled.div`
    cursor: pointer;
    background-color: gray;
    font-size: 20px;
    font-weight: 500;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 4px;

    &:hover{
        background-color: darkgray;
    }

    ${({disabled}) => disabled && `
        cursor: initial;
        opacity: 0.6;
        &:hover{
            background-color: gray;
        }
    `}

`

const TheHub = () => {
    const [status, setStatus] = useState({
        count: 0,
        status: 0
    });

    useEffect(() => {
        API.GetWillemStatus(res => {
            setStatus(res)
        })
    })

    const openTheHub = () => {
        API.OpenTheHub(console.log);
    }

    const disabled = status.status === 0;

    return <Container>
            <Card>
                <Label>The hub has been opened:</Label>
                <Value><CountUp end={status.count} duration={2} /> times.</Value>
                <Divider />
                <Name>Willem PC</Name>
                <Status><StatusDot color={getStatusColor(status.status)} /><StatusText>{getStatus(status.status)}</StatusText></Status>
                <Divider />
                <Button onClick={!disabled ? openTheHub : () => {}} disabled={disabled}>Open The Hub</Button>
            </Card>
        </Container>
}

export default TheHub;