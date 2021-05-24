import React from 'react';
import Login from "./login.css;"
function Login(props) {
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
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <span className="loginForgot">Forgot Password??</span>
                        <button className="loginSignUp">Create a new Account</button>
                    </div>
                </div>

            </div>
            
        </div>
    );
}

export default Login;