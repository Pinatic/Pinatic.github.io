import styled from 'styled-components';
import idMap, { Jildert, Pieter, Ilse, Rianne } from '../../api/SteamProfiles';

const Gradients = {
    [Jildert]:  'linear-gradient(140deg,#4e4e4e 0%,#626262 50%,#792e2e 75%)',
    [Pieter]:   'linear-gradient(140deg,#442d48 0%,#646060 50%,#583b8d 75%)',
    [Ilse]:     'linear-gradient(140deg,#96bfc3 0%,#929598 50%,#00a8f4 75%)',
    [Rianne]:   'linear-gradient(140deg,#fff9c8 0%,#fbffd4 50%,#FFEB3B 75%)'
}

export default styled.div`
    margin-top: 8px;
    padding: 12px;

    background-color: #a8a8a8;

    background-image: ${({ GameID }) => Gradients[idMap(GameID)] || ''};

    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
`