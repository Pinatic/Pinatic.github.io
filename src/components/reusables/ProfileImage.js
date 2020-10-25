import styled from 'styled-components';

export default styled.div`
    background-image: url(${(props) => props.url});
    background-repeat: no-repeat;
    background-position: center;
    height: ${(props) => props.height || 200}px;
    width: 200px;
`