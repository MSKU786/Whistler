import jwt_decode from "jwt-decode";
import axios from "axios";
import { decode } from "jsonwebtoken";
import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"
const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
    loggedIn: false,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const token = localStorage.getItem('token');
    const In = token ? true : false
    let decoded = null;
    if(In)
        decoded = jwt_decode(token);
    //console.log(decoded);
    const newUser = axios.get(`/users?userID=${decoded?.id}`);
    return (
        <AuthContext.Provider 
            value={{
                user: newUser, 
                isFetching: state.isFetching, 
                error: state.error,
                loggedIn: In,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}