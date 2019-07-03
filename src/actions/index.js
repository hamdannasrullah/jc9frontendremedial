// Action Creator

import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies ()  // create sebuah Object cookie

export const onLoginUser = (user,pass) => {
    return (dispatch) => { // dispatch adalah sebuah function, bisa dg nama apa saja, standarnya adlh 'dispatch'
        axios.get(
            'http://localhost:3003/users',
            {
                params: {
                    username: user,
                    password: pass
                }
            }
        ).then (res => {
            // res.data = [], jumlah isi array menggunakan length
            if(res.data.length > 0){
                const {id, username} = res.data[0]

                // kirim action ke reducer, untuk disimpan username sbg object

                dispatch (
                    {
                        type: "LOGIN_SUCCESS",
                        payload: {id, username}
                    }
                )

                // create data untuk cookie
                // cookie to be accessible on all pages
                cookie.set('userName', username, {path: '/'})

            } else {
                console.log('Username or Password Incorrect')
            }
        })
    }
}

export const keepLogin = (objUser) => {
    // objUser = {id, username}
    return {
        // get id
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username
        }
    }

}
export const onLogoutUser = () => {
    cookie.remove('userName')
    return {
        type: 'LOGOUT_SUCCESS' // Tidak membawa Payload apapun
    }
}



