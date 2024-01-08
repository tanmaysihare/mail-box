import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './index.css';
//import EmailList from './components/EmailList';
import Compose from './components/Compose';
import { useSelector } from 'react-redux';
import MassageBody from './components/MassageBody';
import {Switch,Route,Redirect} from 'react-router-dom';
import Auth from './components/Auth';
import Inbox from './components/Inbox';
import Sendbox from './components/Sendbox';

function App() {
  const isComposeOpen = useSelector((state)=> state.compose.isComposeOpen);
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  return (
    <div className="App">
     {isLoggedIn && <Header/>}
      <div className='app__body'>
     {isLoggedIn && <Sidebar/>}
      {isComposeOpen && <Compose/>}
       <Switch>
       {isLoggedIn && <Route exact path='/inbox'><Inbox/></Route>}
      {isLoggedIn && <Route exact path='/sentBox'><Sendbox/></Route>}
      {isLoggedIn && <Route path='/mail'> <MassageBody/></Route>}
      </Switch>
     </div>
     <Switch>
        {!isLoggedIn && <Route path ='/auth'><Auth/></Route>}
        {!isLoggedIn && <Redirect to='auth'/>}
       </Switch>
    </div>
  );
}

export default App;
