import React from "react";
import { Link } from "react-router-dom";


const CartView = ({ item }) => {
  return (
    <tr>
      <th scope="row">{item.nama}</th>
      <td>{item.qty}</td>
      <td>{item.harga}</td>
      <td>{item.total}</td>
    </tr>
  );
};

export default CartView;