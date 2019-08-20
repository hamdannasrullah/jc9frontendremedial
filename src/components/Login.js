import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import cookies from 'universal-cookie'

import { onLoginUser } from '../actions'

const cookie = new cookies ()

class Login extends Component {

    // buat function
    onButtonClick = () => {
        // ambil data di text input
            // username & password
            var user = this.username.value.trim() // data dari text input
            var pass = this.password.value.trim()

            this.props.onLoginUser(user, pass)
            }

    render () {
        
        if (this.props.user.username == ''){

            return (
                    <div>
                        <div className='mt-5 row'>
                            <div className='col-sm-3 mx-auto card'>
                                <div className='card-body'>
                                    <div className='border-bottom border-secondary card-title'>
                                        <h1>Login</h1>
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
                                            <h4>Password</h4>
                                        </div>
                                        
                                        <form className='input-group'>
                                            <input className='form-control'type='password'
                                            ref={(input) => {this.password=input}}
                                            />
                                        </form><p></p>
        
                                        <button onClick={this.onButtonClick} className='btn btn-success'>Login</button>
                                        <p>Tidak punya akun? <Link to="/register">Register disini</Link></p>          
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            // Arahkan / Redirect ke Home

            return <Redirect to='/'/>
            
            }

        
    }

    const mapStateToProps = state => {
        return {
            user: state.auth // {id, username}
        }
    }

export default connect (mapStateToProps, {onLoginUser}) (Login)