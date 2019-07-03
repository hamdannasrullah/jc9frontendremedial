import { combineReducers } from 'redux'

const init = {
    id: '',
    username: '',
    message: '' // message ketika sudah Login
}


const AuthReducer = (data = init, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
        // do something
            return {
                ...data, // mengganti data = init dg yg baru
                id: action.payload.id,
                username: action.payload.username
            }
        case "LOGOUT_SUCCESS":
            return {
                ...data,
                id: '',
                username:''
            }

            default:
                return data
    }
}

export default combineReducers (
    {
        auth: AuthReducer // {id:'', username:''}
    }
)



