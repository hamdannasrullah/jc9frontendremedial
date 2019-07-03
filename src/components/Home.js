import React, { Component } from 'react';
import axios from 'axios';

import ProductItem from './ProductItem'


class Home extends Component {

    state = {
        products: [],
        searchProducts: []
    }


    componentDidMount(){
            this.getProduct()
    }

    onBtnSearch = () => {
        const nama = this.nama.value
        const min = parseInt(this.min.value) // NaN
        const max = parseInt(this.max.value) // NaN

        // var arrSearch = this.state.searchProducts.filter(item => {
        //     if(item.nama.toLowerCase().includes(nama)){
        //         return true
        //     } else if (nama === '') {
        //         return true
        //     }                
        // })
        var arrSearch = this.state.searchProducts.filter(item => {
        if (isNaN(min) && isNaN(max)){ // Search By Name
            return(
                item.nama.toLowerCase().includes(nama.toLowerCase())
            )
        } else if (isNaN(min)){ // Name and Max
            return (
                item.nama.toLowerCase().includes(nama.toLowerCase())
                && // Boolean
                item.harga <= max
            )
        } else if (isNaN(max)){
            return (
                item.nama.toLowerCase().includes(nama.toLowerCase())
                &&
                item.harga >= min
            )
        } else {
            return (
                item.nama.toLowerCase().includes(nama.toLowerCase())
                &&
                item.harga >= min
                &&
                item.harga <= max
            )
        }
        })

        this.setState({products: arrSearch})
    }
    

    getProduct = () => {
        axios.get('http://localhost:3003/products')
        .then(res=>{
            this.setState({products: res.data, searchProducts: res.data})
        })
    }

    renderList = () => {
        return this.state.products.map (item => { // {nama, desc, ...}
            return (
                <ProductItem products={item}/>
            )
        })
    }



    render () {
        return (
            <div className="row">
                <div className="col">
                    <div className="mt-5">
                        <div className="mx-auto card">
                            <div className="card-body">
                                <div className="border-bottom border-secondary card-title">
                                    <h1>Search</h1>
                                </div>
                                <div className="card-title mt-1">
                                    <h4>Name</h4>
                                </div>
                                <form className="input-group"><input ref={input => this.nama = input} className="form-control" type="text"/></form>
                                <div className="card-title mt-1">
                                    <h4>Price</h4>
                                </div>
                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-10">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}

export default Home