import React, { useContext, useRef } from 'react';
import "./login.css"
import {loginCall} from "../../apiCalls"
import {CircularProgress} from "@material-ui/core"
import { AuthContext } from '../../context/AuthContext';
function Login(props) {
    const email= useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext)
    const handleClick = (e) => {
        
         
        e.preventDefault();
        console.log("clicked");
        loginCall({email:email.current.value ,password: password.current.value}, dispatch );
        console.log(user);
    }
    return (
        <div className = "login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Whistler</h3>
                    <span className="loginDesc">
                        Connect with your friends Whistler
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" 
                            type="email" 
                            className="loginInput" 
                            ref={email}
                        />
                        <input 
                            placeholder="Password" 
                            type="password" 
                            className="loginInput" 
                            minLength="6"
                            required
                            ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                             {isFetching ? <CircularProgress color="white" size="20px"/> : "Log In" }                         
                        </button>
                        <span className="loginForgot">Forgot Password??</span>
                        <button className="loginSignUp" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="white" size="20px"/> : "Create A new account" }                         
                        </button>
                    </form>
                </div>

            </div>
            
        </div>
    );
}

export default Login;