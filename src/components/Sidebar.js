import React from "react";
import "./css/Sidebar.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SidebarOptions from "./SidebarOptions";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { composeActions } from "../store/compose-slice";
import { useHistory } from "react-router-dom";
function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const composeHandler = () => {
    dispatch(composeActions.openCompose());
  };
  const inboxHandler =()=> {
    history.push('/inbox');
  }
  const sendboxHandler=()=> {
    history.push('/sentBox');
  }
  return (
    <div className="sidebar">
      <Button
        onClick={composeHandler}
        startIcon={<AddIcon />}
        className="compose__btn"
      >
        Compose
      </Button>
      <Button onClick={inboxHandler}>
        <SidebarOptions Icon={InboxIcon} title="Inbox" number={"1"} isActive={false}/>
      </Button>
      <Button onClick={sendboxHandler}>
        <SidebarOptions Icon={SendIcon} title="SendBox" number="1" />
      </Button>
    </div>
  );
}

export default Sidebar;
