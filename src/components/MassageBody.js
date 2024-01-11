import React from 'react'
import './css/MassageBody.css';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';


function MassageBody() {
    const history = useHistory();
    const massageData = useSelector((state)=> state.compose.selectedMassage);

  return (
    <div className='massageBody'>
        <IconButton onClick={()=>history.push('/inbox')}><ArrowBackIcon/></IconButton>

        <div className='massageBody__header'>
             <h5>SUBJECT : </h5><h3>{massageData.subject}</h3>
        </div>
        <div className='massageBody__from'><h4>From : {massageData.name}</h4><h6>{massageData.time}</h6></div>
        <div className='massageBody__body'><h1>{massageData.message}</h1></div>      
    </div>
  )
}

export default MassageBody
