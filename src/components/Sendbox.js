import React, { useEffect, useState } from "react";
import "./css/EmailList.css";
import EmailBody from "./EmailBody";
import { db } from "../firebase";


function Sendbox() {
    const [emails, setEmails] = useState([]);
    useEffect(() => {
      db.collection("emails").orderBy("timeStamp",'desc').onSnapshot((snapshot) => {
        setEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }, []);
    return (
      <div className="emailList">
        {emails.map(({ id, data }) => {
          return (
            <EmailBody
              key={id}
              name={data.to}
              subject={data.subject}
              message={data.massage}
              time={new Date(data.timeStamp?.seconds*1000).toLocaleTimeString()}
            />
          );
        })}
      </div>
    );
  }

export default Sendbox
