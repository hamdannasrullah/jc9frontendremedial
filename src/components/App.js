import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Register from './Register'
import Login from './Login'
import Home from './Home'
import Header from './Header'
import ManageProduct from './ManageProduct'

import { keepLogin } from '../actions'


import DetailProduct from './DetailProduct'
import Cart from './Cart'
import CartView from './CartView'


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
            <div>
                <Header/>
                <Route path="/" exact component={Home}/> {/* equal, ===  | exact berfungsi agar Home tidak ikut di page lain*/}
                <Route path="/register" component={Register}/> {/* include() */}
                <Route path="/login" component={Login}/> {/* include() */}
                <Route path="/manageproduct" component={ManageProduct}/> {/* include() */}
                <Route path="/detailproduct/:product_id" component={DetailProduct}/> {/* :product_id --> akan berubah2 angka (sebuah variabel menyimpan angka) */}
                <Route path='/cart' component={Cart}/>
                <Route path='/cartview' component={CartView}/>

            </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin})(App)