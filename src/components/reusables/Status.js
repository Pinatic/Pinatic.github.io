import styled from 'styled-components';

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

export { Status, StatusDot, StatusText, getStatus, getStatusColor };