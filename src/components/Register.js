import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


class Register extends Component {

    onButtonClick = () => {
        const user = this.username.value
        const newemail = this.email.value
        const pass = this.password.value

        // GET, axios.get - Request Data
        // POST, axios.post - Menaruh Data

        // Check Username
        axios.get(
            'http://localhost:3003/users', 
        {
            params: {
                username: user
            }
        }
        ).then(res => {

        // Jika data ditemukan, array.length > 0
            if(res.data.length > 0) {
                console.log('Username sudah digunakan')
            } else {
         // Check berdasarkan email
        axios.get(
            'http://localhost:3003/users',
            {
                params: {
                    email: newemail
                }
            }
        ).then( res => {
         // Jika data di temukan, array.length > 0
            if(res.data.length > 0) {
                console.log('Email sudah digunakan')
            } else {
         // post data, axios.post, post/menaruh data
        axios.post('http://localhost:3003/users', 
            {
                username:user,
                email:newemail,
                password:pass
            }
        ).then((res) => {
            console.log('Data Berhasil Diinput');
            console.log(res);
            
            
            }
        ).catch((err) => {
            console.log('Gagal Post Data');
            console.log(err);    
            }
        )                
            }
        })
            }
        }).catch( (err) => {
            console.log('Gagal request');            
        })



    //     axios.post('http://localhost:3003/users', 
    //         {
    //             username:user,
    //             email:email,
    //             password:pass
    //         }
    //     ).then((res) => {
    //         console.log('Data Berhasil Diinput');
    //         console.log(res);
            
            
    //         }
    //     ).catch((err) => {
    //         console.log('Gagal Post Data');
    //         console.log(err);    
    //         }
    //     )
    }


    render () {
        return (
            <div>
                <div className='mt-5 row'></div>
                    <div className='col-sm-3 mx-auto card'>
                        <div className='card-body'>
                            <div className='border-bottom border-secondary card-title'>
                                <h1>Register</h1>
                            </div>

                                <div className='card-title'>
                                    <h4>Username</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control'type='text'
                                    ref={(input) => {this.username=input}} // ref(refresh)
                                    />
                                </form>
                            
                                <div className='card-title'>
                                    <h4>Email</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control'type='email'
                                    ref={(input) => {this.email=input}} 
                                    />
                                </form>
                                
                                <div className='card-title'>
                                    <h4>Password</h4>
                                </div>
                                <form className='input-group'>
                                    <input className='form-control'type='password'
                                    ref={(input) => {this.password=input}}
                                    />
                                </form><p></p>

                                <button onClick={this.onButtonClick} className='btn btn-success'>Click for Register</button>
                                
                                <p>Tidak punya akun? <Link to="/login">Daftar disini</Link></p>          
                    </div>
                </div>
            </div>
        )
    }
}

export default Register