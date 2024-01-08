import React from "react";
import "./css/EmailList.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { composeActions } from "../store/compose-slice";

function EmailBody({ name, subject, message, time }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const openMassageHandler = () => {
    dispatch(
      composeActions.openMessage({
        name,
        subject,
        message,
        time,
      })
    );
    history.push('/mail');
  };
  return (
    <div className="emailBody" onClick={openMassageHandler}>
      <div className="emailBody__left">
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <h4>{name}</h4>
      </div>
      <div className="emailBody__middle">
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
