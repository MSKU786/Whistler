const AuthReducer = (state, action) => {
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
            localStorage.setItem("user", action.payload.user);
            localStorage.setItem("token", action.payload.token);
            return {
                user: action.payload, 
                isFetching: false,
                error: false,
            }
        case "FOLLOW" : 
            return {
                ...state,
                user:{
                    ...state.user,
                    following: state.user.following.filter(
                        following=> following !== action.payload
                    ),
                }
            }

        case "FOLLOW" : 
            return {
                ...state,
                user:{
                    ...state.user,
                    following: [...state.user.following, action.payload],
                }
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