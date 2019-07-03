import React, { Component } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

// import ManageProduct from './ManageProduct'

class ProductItem extends Component {

    refresh = (reload) => {
        document.location.reload(reload)
    }

    addCart = () => {
        const idUsername = this.props.user.id
        const qty = parseInt (this.qty.value)
        var {id, nama, harga, stock, src} = this.props.products
   

    if (qty > 0 && idUsername !== '') {
        axios.get(
            'http://localhost:3003/cart/',
            {
                params: {
                    idUser:idUsername,
                    idProduct: id
                }
            }
        ).then( res => {
            if(res.data.length > 0){
                const totalQty= parseInt(res.data[0].qty) + parseInt(qty)
                if (totalQty < stock){
                    axios.put('http://localhost:3003/cart/' + res.data[0].id,
                    {
                        idUser: idUsername,
                        idProduct: id,
                        nama: nama,
                        qty: totalQty,
                        harga: harga,
                        src: src
                    }
                    ).then( res => {
                        alert('Stok ditambah')
                        document.location.reload(true)
                    })
                } else {
                    alert ('Gagal')
                }
            } else {
                axios.post('http://localhost:3003/cart/',
                {
                    idUser: idUsername,
                    idProduct: id,
                    nama: nama,
                    qty: qty,
                    harga: harga,
                    src: src                   
                }
                ).then ( res => {
                    alert('Produk telah masuk ke Cart')
                    document.location.reload(true)
                })

            }
        })
    } else {
        if (idUsername === '') {
            alert('Mohon login')
        } else {
            alert ('Silakan masukan item')
        }
    }
    return (
        this.qty.value > 0
    )
}




    render (){

        var {id, nama, harga, stock, src} = this.props.products // {id, nama, desc, harga, src}
        // id = 1

        return (
            <div className="card col-3 m-5">
                <img src={src} alt="product"className='card-img-top'/>
                <div className="card-body">
                    <h5 className="card-title">{nama}</h5>
                    <p className="card-text">Rp {harga}</p>
                    <p className="card-text">Masukkan jumlah: {stock}</p>
                    <input className="form-control" ref={input => {this.qty = input}} type="text" defaultValue='0'/>
                    <Link to={'/detailproduct/' + id}>
                        <button className='btn btn-outline-primary btn-block'>Detail</button>
                    </Link> 
                    
                    <button className='btn btn-primary btn-block' onClick={()=>{this.addCart(this.props.products)}}>Add To Cart</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps)(ProductItem)