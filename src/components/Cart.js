import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            pay: false,
            cart: [],
            item: [],
            selectedID: 0
        }
        this.toggle = this.toggle.bind(this);
        this.togglePay = this.togglePay.bind(this);
    }
    

    componentDidMount () {
        this.getCart()
    }

        getCart = () => {
            axios.get('http:localhost:3003/cart').then(res => {
                this.setState({product: res.data, selectedID: 0})
    })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    togglePay () {
        this.setState(prevState => ({
            pay: !prevState.pay
        }))
    }


// Menghitung Total Item
    totalCart = () => {

        var totalCart = 0

        for (let i = 0; i < this.state.cart.length; i++){
            if (this.props.user.id === this.state.cart [i].idUser){
                totalCart += parseInt(this.state.cart[i].qty);
            }
        }

        return (
            <td>{totalCart}</td>
        )
    }
// Menghitung Total Harga
    totalPrice = () => {
        var itemPrice = this.state.cart.map ( item => {
            return {
                price: item.qty*item.harga,
                idUser: item.idUser
            }
        })

        var subItemPrice = 0

        for (let i=0; i < this.state.cart.length; i++) {
            if (this.props.user.id === itemPrice[i].idUser) {
                subItemPrice += parseInt (itemPrice[i].harga);
            }
        }

        return (
            <td>Rp {subItemPrice}</td>
        )
    }
// Tambah Produk
    addProduct = () => {
        const qtyUpdate = this.editQty.value

        axios.get('http://localhost:3003/products/' + this.state.item.idProduct).then(res => {
            if (qtyUpdate <= res.data.stock){
                axios.patch('http://localhost:3003/cart/' + this.state.item.id,
                {
                    qty: qtyUpdate }).then ( res=> {
                        alert ('Stok ditambah')
                        this.getCart()
                    })
                } else {
                    alert ('Stok Habis')
                }
        })
        
    }

    deleteProduct = (item) => {
        axios.delete('http://localhost:3003/cart/' + item.id).then(res => {
            this.getCart()
        })
    }

    payment = () => {
        return this.state.cart.map ( item => {
            if(this.props.user.id === item.idUser){
                return (
                    <tr>
                        <td>
                        <img className='list' src={item.src}/>
                        </td>
                        <td>{item.nama}</td>
                        <td>{item.harga}</td>
                        <td>{item.qty}</td>
                    </tr>
                )
            }
        })
    }

    payItem = () => {
        return this.state.cart.map (item => {
            if(this.props.user.id === item.idUser){
                axios.get('http://localhost:3003/products/', {
                    params: {
                        id: item.idProduct
                    }
                }

                ).then (res => {
                    const stockUpdate = parseInt(res.data[0].stock) - parseInt(item.qty)
                    axios.patch (
                        'http://localhost:3003/products/' +item.idProduct,{
                            stock: stockUpdate
                        }
                    ).then(
                        axios.delete('http://localhost:3003/cart/'+item.id)
                    )
                })
            }
            this.togglePay()
        })
    }
// identifikasi status login
    renderList = () => {
        if(this.props.user.username !== '') { 
            return this.state.cart.map ( item => {
                if(item.id !== this.state.selectedID) {
                    if(this.props.user.id === item.idUser){
                        return (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.nama}</td>
                                <td>{item.desc}</td>
                                <td>
                                    <img className= 'list' src={item.src}/>
                                </td>
                                <td>{item.harga}</td>
                                <td>{item.qty}</td>
                                <td>{item.harga*item.qty}</td>
                                <td>            
                                <button className = 'btn btn-danger m-1' onClick={()=>{this.setState({selectedID : item.id, item: item})}}>Edit</button>
                                <button className = 'btn btn-warning m-1' onClick={()=>{this.deleteProduct(item)}}>Delete</button>
                            </td>
                            </tr>
                        )
                    }
                } else {
                    if (this.props.user.id === item.idUser) {
                        return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.nama}</td>
                            <td>{item.desc}</td>
                            <td>
                                <img className= 'list' src={item.src}/>
                            </td>
                            <td>{item.harga}</td>
                            <td>{item.qty}</td>
                            <td>
                            <input className="form-control" ref={input => {this.editQty = input}} type="text" defaultValue={item.qty}/>
                            </td>
                            <td>            
                            <button className = 'btn btn-danger m-1' onClick={()=>{this.saveProduct(item)}}>Save</button>
                            <button className = 'btn btn-warning m-1' onClick={()=>{this.setState({selectedID : 0})}}>Cancel</button>
                            </td>
                        </tr>
                        )
                    }
                }
            })
        }
        return <Redirect to= './login' />
    }


    render() {
        return (
            <div class="card row shopping-cart">
            <div className="container">
                <div class="card-header bg-light text-light row">
                    <i class="fa fa-shopping-cart col-7" aria-hidden="true">Keranjang Belanja</i>

                    <a href="/" class="btn btn-outline-info btn-sm col-5">Continue Shopping</a>
                    <div class="clearfix"></div>
                </div>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">PRODUCT</th>
                            <th scope="col">NAME</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">QTY</th>
                            <th scope="col">TOTAL</th>
                            <th scope="col">ACTION</th>
                        </tr>

                    </thead>&nbsp;
                    <Button color="primary" className="mx-auto" onClick={this.toggle}>Checkout</Button>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                    </table>
                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader className="mx-auto">Payment</ModalHeader>
                            <ModalBody>
                                <table className="table table-hover mb-5">
                                    <thead>
                                    <tr>
                                <th scope="col">PRODUCT</th>
                                <th scope="col">NAME</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">QTY</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                    {this.payment()}
                    <tr>
                        <td><b>TOTAL ITEM: </b></td>
                        {this.totalCart()}
                    </tr>
                    <tr>
                        <td><b>TOTAL HARGA: </b></td>
                        {this.totalPrice()}
                    </tr>
                    </tbody>
                </table>
                </ModalBody>
                    <ModalFooter>

                        <Button color="primary" onClick={()=>{this.pay()}}>Bayar</Button>{' '}

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    
                    </Modal>
                    <Modal isOpen={this.state.pay} toggle={this.togglePay} className={this.props.className}>
                    <ModalHeader className="mx-auto">Belanja Selesai</ModalHeader>
                    <ModalBody>
                        Terima kasih
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" href='/'>Batal</Button>
                    </ModalFooter>
                    </Modal>

                    </div>    
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

export default connect(mapStateToProps) (Cart)