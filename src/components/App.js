import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Register from './Register'
import Login from './Login'
import Home from './Home'
import Header from './Header'

import { keepLogin } from '../actions'


const cookie = new cookies ()
// localhost:3000/register

// import App from './App'

class App extends Component {

    componentDidMount () {
        const objCookie = cookie.get ('userName') // undefined

        if (objCookie !== undefined){
            // Jika usercookie sama dg undefind, maka Login Ulang
            this.props.keepLogin(objCookie)
        }
    }
    render () {
        return (
            <BrowserRouter>
            <div className="container-fluid">
                <Header/>
                <Route path="/" exact component={Home}/>
                <Route path="/register" component={Register}/> {/* include() */}
                <Route path="/login" component={Login}/> {/* include() */}
            </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin})(App)