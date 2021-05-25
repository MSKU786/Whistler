import React from 'react';
import "./login.css"

function Register(props) {
    return (
        <div>
            <div className = "login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Whistler</h3>
                    <span className="loginDesc">
                        Connect with your friends Whistler
                    </span>
                </div>
                <div className="loginRight">
                    <div className="signupBox">
                        <input placeholder="User name" className="loginInput" />
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" type="password" className="loginInput" />
                        <input placeholder=" Confirm Password" type="password" className="loginInput" />
                        <button className="loginButton">Sign Up</button>
                        <span className="loginForgot">Forgot Password??</span>
                        <button className="loginSignUp">Log Into account </button>
                    </div>
                </div>

            </div>
            
        </div>
        </div>
    );
}

export default Register;