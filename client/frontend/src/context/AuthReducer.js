import { useContext } from "react";
import { AuthContext } from "./AuthContext";


const AuthReducer = (state, action) => {
    
    const {user:cUser} = useContext(AuthContext);
    switch(action.type){
        case "LOGIN_START" : 
            return {
                user: null, 
                isFetching: true,
                error: false,
            
            }

        case "LOGIN_FAILURE" : 
            return {
                user: null, 
                isFetching: false,
                error: action.payload,
                
            }

        case "LOGIN_SUCCESS" : 
            console.log(action.payload);
            localStorage.setItem("token", action.payload.token);
            return {
                user: cUser, 
                isFetching: false,
                error: false,
            }
    
        case "LOG_OUT":
            localStorage.clear();
            return{
                ...state,
                user:null,
            }
         default: 
                return state;
            
    }
}

export default AuthReducer;