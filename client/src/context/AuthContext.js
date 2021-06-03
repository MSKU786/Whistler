import jwt_decode from "jwt-decode";
import axios from "axios";

import { createContext, useEffect, useReducer, useState } from "react"

import AuthReducer from "./AuthReducer"
const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
}

//const [user, setUser] = useState(null);
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider =  ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    const [ user, setUser ] = useState({});
    let decode = null;
    if(localStorage.token)
    {
        decode = jwt_decode(localStorage.token);
        
    }
    useEffect(()=>{
        const fetchUser  = async () => {
            const res = await axios.get(`https://backendwhistler.herokuapp.com/api/users?userID=${decode?.id}`)
            setUser(res.data);
        }
        fetchUser();    
    },[]);
    return (
        <AuthContext.Provider 
            value={{
                user: user, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}