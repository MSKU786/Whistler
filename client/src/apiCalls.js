import axios from "axios"
export const loginCall  = async (userCredentials, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post("https://backendwhistler.herokuapp.com/api/auth/login/", userCredentials);
        const token = res.data.token;
        const user = res.data.user;
    
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    }catch(err){
        dispatch({type: "LOGIN_ERROR", payload: err});

    }
}

