import React, { useEffect, useState } from "react";
import "./css/EmailList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { composeActions } from "../store/compose-slice";
import { db } from "../firebase";


function EmailBody({ id,name, subject, message, time }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isRead , setIsRead] = useState(false);
  useEffect(()=> {
    const unsubscribe = db.collection('emails').doc(id).onSnapshot((doc) => {
      // Update the local state based on the 'isRead' field in the document
      setIsRead(doc.data()?.isRead || false);
    }); 
  // Cleanup the listener when the component unmounts
  return () => unsubscribe();
}, [id]);



  const openMassageHandler = () => {
    dispatch(
      composeActions.openMessage({
        id,
        name,
        subject,
        message,
        time,
      })
    );
    db.collection("emails").doc(id).update({isRead: true});
    history.push('/mail');
  };
  const deleteHandler = async () => {
    try {
      await db.collection("emails").doc(id).delete();
    } catch (error) {
      console.error("Error deleting document", error);
    }
  };
  return (
    <div className="emailBody" >
      <div className="emailBody__left">
        <IconButton onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
        <div className={!isRead ? "indicator" : 'indicator_read'}></div>
    
        <h4>{name}</h4>
      </div>
      <div className="emailBody__middle" onClick={openMassageHandler}>
        <div className="emailBody__middle__msg">
          <p>
            <b>{subject}</b> - {message}
          </p>
        </div>
      </div>
      <div className="emailBody__right">
        <p>{time}</p>
      </div>
    </div>
  );
}

export default EmailBody;
