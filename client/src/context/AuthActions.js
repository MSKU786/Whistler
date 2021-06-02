

export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
})

export const LoginSuceess = (toekn) => ({
    type: "LOGIN_SUCCESS",
    payload: toekn,
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
})

export const LogOut = (toekn) => ({
    type: "LOG_OUT",
    payload: toekn
})

export const Follow =(userID) => ({
    type: "FOLLOW",
    payload: userID 
})

export const Unfollow =(userID) => ({
    type: "UNFOLLOW",
    payload: userID 
})