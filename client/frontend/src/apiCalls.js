import axios from "axios"
export const loginCall  = async (userCredentials, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post("auth/login/", userCredentials);
        console.log(res);
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem('token',token );
        dispatch({type: "LOGIN_SUCCESS", payload: user});
    }catch(err){
        dispatch({type: "LOGIN_SUCCESS", payload: err});

    }
}