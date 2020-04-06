import React, { Component } from 'react'
import axios from "../config/axios"
import {Link} from 'react-router-dom'
import Swal from "sweetalert2"
import Login from "./Login"




export default class ProductItem extends Component {

   addToCart = () => {
    //    user ID
    //    let user_name= this.props.users.username

    
    
    // Produk ID
       let Product_Name= this.props.product.name
       let Product_Desc= this.props.product.desc
       let Product_price=parseInt(this.props.product.price)
       let Product_Img=this.props.product.src
       let Product_quantity = parseInt(this.qty.value)

    //   Post ke db.json
      axios
      .post("/carts", {
        name: Product_Name,
        desc: Product_Desc,
        price: Product_price,
        src: Product_Img,
        qty: Product_quantity
      }).then(res => {});
      if(this.qty==""){
          Swal.fire(`Mohon masukkan jumlah QTY`)
      }else{
      Swal.fire(`Item ${Product_Name} berhasil di masukkan cart`)
   }
}

   render() {
      return (
         <div key={this.props.product.id} className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
           <div style={{height:350}}><img className="card-img-top" src={this.props.product.src} alt=""/></div>
            <div className="card-body">
               <div  style={{height: 50}}>
                     <h5 className="card-title">{this.props.product.name}</h5>
               </div>
               <p className="card-text">{this.props.product.desc}</p>
               <p className="card-text">Rp. {this.props.product.price.toLocaleString("in")}</p>
               <input ref={( input ) => { this.qty = input }} className="form-control" type="text" placeholder="Jumlah Qty"/>
               <Link to={`/detailproduct/${this.props.product.id}`}>
                     <button className="btn btn-secondary btn-block my-2">Detail</button>
               </Link>
               <button onClick={this.addToCart} className="btn btn-primary btn-block">Add to Cart</button>
            </div>
         </div>
      )
    
   }

}