import React, { useState } from "react";
import "./css/Compose.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch ,useSelector} from "react-redux";
import { composeActions } from "../store/compose-slice";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

function Compose() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const dispatch = useDispatch();
  const fromEmail = useSelector((state)=>state.auth.email);
  // Get the raw content of the editor
  const contentState = editorState.getCurrentContent();
  const rawContent = convertToRaw(contentState);
  // Extract text from each block and join them into a single string
  const contentText = rawContent.blocks.map((block) => block.text).join("\n");

  const closeComposeHandler = () => {
    dispatch(composeActions.closeCompose());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (to && subject && contentText === "") {
      alert("please fill all the fields properly");
    }
    console.log(`To ${to} subject ${subject} massage ${contentText}`);
    db.collection("emails").add({
      to,
      subject,
      massage: contentText,
      from: fromEmail ,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      isRead: false,
    });
    setTo("");
    setSubject("");
    setEditorState("");
    dispatch(composeActions.closeCompose());
  };

  return (
    <div className="compose">
      <div className="compose__header">
        <div className="compose__header__left">
          <span>New Massage</span>
        </div>
        <div className="compose__header__right">
          <IconButton onClick={closeComposeHandler}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <form onSubmit={submitHandler}>
        <div className="compose__body">
          <div className="compose__bodyForm">
            <input
              type="email"
              placeholder=" SEND TO"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <input
              type="text"
              placeholder=" SUBJECT"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <div className="compose__bodyForm__textarea">
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
              />
            </div>
          </div>
        </div>
        <div className="compose__footer">
          <div className="compose__footer__left">
            <button type="submit">
              <SendIcon /> Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Compose;
