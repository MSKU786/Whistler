

export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
})

export const LoginSuceess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
})

export const LogOut = (user) => ({
    type: "LOG_OUT",
    payload: user
})

export const Follow =(userID) => ({
    type: "FOLLOW",
    payload: userID 
})

export const Unfollow =(userID) => ({
    type: "UNFOLLOW",
    payload: userID 
})