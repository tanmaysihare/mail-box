import React from "react";
import { IconButton } from "@mui/material";
import ReorderIcon from '@mui/icons-material/Reorder';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './css/Header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/Auth-Slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { auth } from "../firebase";

const Header = ()=> {
    const dispatch = useDispatch();
    const history = useHistory();
    const email = useSelector((state)=> state.auth.email);

    const logoutHandler = async ()=> {
        try {
            await auth.signOut();
            dispatch(authActions.logout());
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('email');
            history.push('/auth');
            // Perform any additional actions after sign-out if needed
            console.log("User signed out successfully");
          } catch (error) {
            console.error("Error signing out:", error.message);
          }
       
        
    }
    return (
        <>
        <div className="header">
            <div className="header__left">
                <IconButton>
                    <ReorderIcon></ReorderIcon>
                </IconButton>
                <h4>{email}</h4>
            </div>
            <div className="header__middle">
                <div className="search_mail">
                    <IconButton>
                        <SearchIcon></SearchIcon>
                    </IconButton>
                    <input type="text" placeholder="search mail" />
                    <IconButton>
                        <ExpandMoreIcon></ExpandMoreIcon>
                    </IconButton>
                </div>
            </div>
            <div className="header__right">
                <IconButton onClick={logoutHandler}>
                    <LogoutIcon/>
                </IconButton>
            </div>
            
        </div>
        </>
    );
}
export default Header;