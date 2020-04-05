import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class ProductItem extends Component {

   addToCart = () => {
      let quantity = this.qty.value

      // Post ke carts
   }

   render() {
      return (
         <div key={this.props.product.id} className="card col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
            <img className="card-img-top" src={this.props.product.src} alt=""/>
            <div className="card-body">
               <div  style={{height: 50}}>
                     <h5 className="card-title">{this.props.product.name}</h5>
               </div>
               <p className="card-text">{this.props.product.desc}</p>
               <p className="card-text">Rp. {this.props.product.price}</p>
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