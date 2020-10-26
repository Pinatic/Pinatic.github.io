import styled from 'styled-components'
import SteamProfile from './components/steam/SteamProfile';
import SteamFriends from './components/steam/SteamFriends';
import Divider from './components/reusables/Divider';
import ResentGames from './components/steam/ResentGames';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import TheHub from './components/the-hub';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadein 3s;
    margin-bottom: 24px;
    margin-top: 24px;

    @keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
`

const Layout = () => {
  return <>
    <Container>
      <SteamProfile />
    </Container>
    <Divider />
    <ResentGames />
    <Divider />
    <SteamFriends />
  </>
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/the-hub">
          <TheHub />
        </Route>
        <Route path="/:id">
          <Layout />
        </Route>
        <Route path="/">
          <Layout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
