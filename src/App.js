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
import ForgetPassword from './components/ForgetPassword';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const isComposeOpen = useSelector((state)=> state.compose.isComposeOpen);
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn);
  return (
    <div className="App">
     {! isLoggedIn && <div className='intro'>
      <div className='intro__btn'> <IconButton onClick={()=>history.push('/auth')}><ArrowBackIcon/></IconButton></div>
    
      <h2>WELCOME TO MAIL-BOX</h2></div>}
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
        <Route path='/forgetPassword'>
          <ForgetPassword/>
        </Route>
        {!isLoggedIn && <Redirect to='auth'/>}
       </Switch>
    </div>
  );
}

export default App;
