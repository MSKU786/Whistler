import React, { useRef } from 'react';
import "./login.css"
import {useHistory} from "react-router"
import axios from "axios"
function Register(props) {
    const username = useRef();
    const email= useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();
    //const {user, isFetching, error, dispatch} = useContext(AuthContext)
    
    const handleClick = async (e) => {
        e.preventDefault();
        console.log("clicked"); 
        if(password.current.value!== confirmPassword.current.value){
            confirmPassword.current.setCustomValidity("Passwords don't match!")
        }
        else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            } catch (err) {
                console.log(err);
            }
        }
        //loginCall({email:email.current.value ,password: password.current.value}, dispatch );
        //console.log(user);
    }
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
                    <form className="signupBox" onSubmit={handleClick}>
                        <input 
                            placeholder="User name" 
                            className="loginInput" 
                            ref = {username}
                            required
                        />
                        <input 
                            placeholder="Email" 
                            className="loginInput" 
                            ref={email}
                            type="email"
                            required
                        />
                        <input 
                            placeholder="Password" 
                            type="password" 
                            className="loginInput" 
                            ref={password}
                            required
                        />
                        <input 
                            placeholder=" Confirm Password" 
                            type="password" 
                            className="loginInput"
                            ref={confirmPassword} 
                            required
                        />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <span className="loginForgot">Forgot Password??</span>
                        <button className="loginSignUp">Log Into account </button>
                    </form>
                </div>

            </div>
            
        </div>
        </div>
    );
}

export default Register;