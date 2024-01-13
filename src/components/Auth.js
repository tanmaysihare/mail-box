import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { SignupData } from "../../Store/Auth-action";
import classes from "./css/login-signup.module.css";
import { authActions } from "../store/Auth-Slice";
import { useHistory, Link } from "react-router-dom";
import { auth} from "../firebase";

const Auth = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  
  

  const dispatch = useDispatch();
  const history = useHistory();
  const isSignIn = useSelector((state) => state.auth.isSignIn);

  const switchModeHandler = () => {
       dispatch(authActions.signup());
   };
   const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

      
    
      
    
      
    
   
   
    try {
      let userCredential;

      if (!isSignIn) {
        // Sign in with email and password
        userCredential = await auth.signInWithEmailAndPassword(
          enteredEmail,
          enteredPassword
        );
      } else {
        // Sign up with email and password
        
        userCredential = await auth.createUserWithEmailAndPassword(
          enteredEmail,
          enteredPassword
        );
      
        
      
    }

      const user = userCredential.user.multiFactor.user;
     // console.log(user);
      dispatch(
        authActions.login({
          token: user.accessToken, // or user.idToken, depending on Firebase version
          userId: user.uid,
          email: user.email,
        })
      );

      localStorage.setItem("token", user.accessToken);
      localStorage.setItem("userId", user.uid);
      localStorage.setItem("email",user.email);
      history.replace('/inbox');
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert("Error",error);
      // Handle error, show alert, etc.
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isSignIn ? "Create New Account" : "Login"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Enter Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label>Your Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        {isSignIn && 
        <div className={classes.control}>
          <label>Conform Your Password</label>
          <input
            type="password"
            id="conformPassword"
            
          />
        </div>}
        <div className={classes.actions}>
          <button>{isSignIn ? "Create Account" : "login"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchModeHandler}
          >
            {isSignIn ? "Login With Existing Account" : "Create New Account  |"}
            {!isSignIn ? <Link to="/forgetPassword">|  Forget Password</Link> : ""}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Auth;
