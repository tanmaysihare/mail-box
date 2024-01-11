import React, { useEffect, useState } from "react";
import "./css/EmailList.css";
import EmailBody from "./EmailBody";
import { db } from "../firebase";
import { useSelector } from "react-redux";

function Sendbox() {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const email = useSelector((state)=> state.auth.email);
    useEffect(() => {
        try {
          const unsubscribe = db
            .collection("emails")
            .where("from", "==", email)
            .orderBy("timeStamp", "desc")
            .onSnapshot((snapshot) => {
              setEmails(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              );
              setLoading(false);
            });
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching inbox:", error);
        }
      }, [email]);
      
      if (loading) {
        return <p>Loading...</p>;
      }
    return (
      <div className="emailList">
        {emails.map(({ id, data }) => {
          return (
            <EmailBody
              key={id}
              id={id}
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
