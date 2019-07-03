import axios from 'axios';

export function getProducts() {
  return axios.get('http://localhost:3003/products');
}

export function getProduct(id) {
  return axios({
    method: 'get',
    url: 'http://localhost:3003/products'+id,
    params: { id },
  })
}

export function getCart() {
  return axios.get('http://localhost:3003/cart');
}

export function addCart(productDetail) {
  return axios({
    method: 'post',
    url: 'http://localhost:3003/cart',
    params: { productDetail },
  })
}