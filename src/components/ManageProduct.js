import React, { Component } from "react";
import axios from 'axios';

class ManageProduct extends Component {

    state = {
        products: [],
        selectedId: 0
    }

    componentDidMount(){
        // Akses Database
            this.getProduct()
    }

    onSaveItem = id => {
        var namaBaru = this.editNama.value
        var descBaru = this.editDesc.value
        var hargaBaru = this.editHarga.value

        axios.patch(
            'http://localhost:3003/products/' + id, // http://localhost:3003/products/ harus pakai '/' dibelakang 'products', karena mengambil data baru
            {
                nama: namaBaru,
                desc: descBaru,
                harga: hargaBaru
            }
        ).then(res => {
            this.getProduct()
        }).catch(err => {
            console.log('Gagal');
            
        })
    }

    onDeleteItem = (id) => {
        axios.delete('http://localhost:3003/products/' + id)
        .then(() => {
            this.getProduct()
        })
    }

    getProduct = () => {
                // Akses Database
                axios.get('http://localhost:3003/products/')
                .then(res=>{
                    // console.log(res)
                    this.setState({products: res.data, selectedId: 0})
                })
    }




    addProduct = () => {
        const nama = this.nama.value
        const desc = this.desc.value
        const harga = parseInt(this.harga.value)
        const src = this.src.value


        axios.post(
            'http://localhost:3003/products/',
            {
                nama,
                desc,
                harga,
                src       
            }
        ).then (res => {
            // GET DATA
            this.getProduct()
        })
        }

        renderList = () => {
            return this.state.products.map ( item => { // propert {id, nama, produk, harga, desc}
                if(item.id !== this.state.selectedId) {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.desc}</td>
                        <td>{item.harga}</td>
                        <td>
                            <img className='list' src={item.src} alt='product'/>
                        </td>
                        <td>
                            <button onClick = {() => {this.setState({selectedId: item.id})}} className = 'btn btn-primary'>Edit</button> &nbsp;
                            <button onClick = {() => {this.onDeleteItem(item.id)}} className = 'btn btn-warning'>Delete</button>
                         </td>
                    </tr>
                )
            } else {
                return (
                <tr>
                    <td>{item.id}</td>

                    <td>
                        <input className="form-control" ref={input => {this.editNama=input}} type="text" defaultValue={item.nama}></input> &nbsp;
                    </td>

                    <td>
                        <input className="form-control" ref={input => {this.editDesc=input}} type="text" defaultValue={item.desc}></input> &nbsp;
                    </td>

                    <td>
                        <input className="form-control" ref={input => {this.editHarga=input}} type="text" defaultValue={item.harga}></input> &nbsp;
                    </td>

                    <td>
                        <img className='list' src={item.src}/>
                    </td>
                    
                    <td>
                        <button onClick = {() => {this.onSaveItem(item.id)}} className = 'btn btn-primary'>Simpan</button>
                        <button onClick = {() => {this.setState ({selectedId: 0})}} className='btn btn-warning'>Batal</button>
                    </td>                    
                </tr>
            )
        }
    })

}

    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">List Product</h1>
                <table className="table table-hover mb-5">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody> {this.renderList()}
                    </tbody>
                </table>
                <h1 className="display-4 text-center">Input Product</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th scope="col">NAME</th>
                            <th scope="col">DESC</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">PICTURE</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <th scope="col"><input ref={input => this.nama = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.desc = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.harga = input} className="form-control" type="text" /></th>
                            <th scope="col"><input ref={input => this.src = input} className="form-control" type="text" /></th>
                            <th scope="col"><button className="btn btn-outline-warning" onClick={this.addProduct}>Add</button></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}




export default ManageProduct