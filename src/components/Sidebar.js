import React,{useState, useEffect} from "react";
import "./css/Sidebar.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SidebarOptions from "./SidebarOptions";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { composeActions } from "../store/compose-slice";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [unReadCount, setUnReadCount] = useState(0);
  useEffect(() => {
    // Subscribe to real-time updates for unread messages
    const unsubscribe = db.collection("emails")
      .where("isRead", "==", false)
      .onSnapshot((snapshot) => {
        setUnReadCount(snapshot.docs.length);
      });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  const composeHandler = () => {
    dispatch(composeActions.openCompose());
  };

  const navigateTo = (route) => {
    history.push(route);
  };


  return (
    <div className="sidebar">
      <Button
        onClick={composeHandler}
        startIcon={<AddIcon />}
        className="compose__btn"
      >
        Compose
      </Button>

      <Button onClick={() => navigateTo("/inbox")}>
        <SidebarOptions Icon={InboxIcon} title="Inbox" number={unReadCount} isActive={true} />
      </Button>

      <Button onClick={() => navigateTo("/sentBox")}>
        <SidebarOptions Icon={SendIcon} title="SentBox" isActive={false}/>
      </Button>
    </div>
  );
}

export default Sidebar;
