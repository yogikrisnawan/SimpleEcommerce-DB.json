import React, { Component } from "react";
import axios from "../config/axios";
import {Redirect,Link}from 'react-router-dom'
import {connect}from 'react-redux'
import Swal from "sweetalert2"
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'


class Cart extends Component {

    
  state = {
    carts: []
    
    
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios.get("/carts").then(res => {
      this.setState({ carts: res.data });
    });
  };

// Delete Cart
deleteproduct = id => {
   
    Swal.fire({
      title: `Menghapus Cart` ,
      text: 'Anda Yakin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'YES',
      cancelButtonText: 'NO'
    }).then((result) => {
       if (result.value) {
        axios.delete(`/carts/${id}`).then(res => {
          this.getData();
          Swal.fire(
            'Berhasil'
          )
        })
   
      } else {
        Swal.fire(
          'CANCEL'
        )
      }
    })
  }


  renderList = () => {
    //   this.state.products = [{},{},{}]
    // ptoduct = { id, name, desc, price, src}
    return this.state.carts.map((product) => {
         return (
        <tr>
          <td scope="col">{product.id}</td>
          <td scope="col">{product.name}</td>
          <td scope="col">{product.desc}</td>
          <td scope="col">Rp{product.price.toLocaleString('id')}</td>
          <td scope="col">{product.qty}</td>
          <td className="w-25 " scope="col">
            <img className="img-thumbnail w-25" src={product.src} alt="" />
          </td>
          <button
          type="button"
            className="btn btn-danger center-block"
            onClick={() => {
              this.deleteproduct(product.id);
            }}
          >
            DELETE
          </button>
        </tr>
      );
    });
  };


// Checkout
  Checkout =()=>{
    var totalPriceCart = 0
    let renderPrice = this.state.carts.map((resProduct) => {
        let totalPrice = resProduct.price * resProduct.qty
        totalPriceCart += totalPrice

        return(
            <div className="row">
                    <div class="card-body">
                        <h5 class="card-title">{resProduct.name}</h5>
                        <p class="card-text">Rp. {resProduct.price.toLocaleString("id")} x {resProduct.qty} = 
                        Rp. {totalPrice.toLocaleString('in')}</p>
                </div>
             </div>
        
        )
    }) 
    return(
     <div className="container">
            {/* List Beli */}
            <h1 className="text-center display-4">TOTAL</h1>
         <table class="table table-hover text-center mb-5">
            <thead>
             <tr>
              <th scope="col">ID</th>  
              <th scope="col">NAME</th>
              <th scope="col">QTY</th>
              <th scope="col">PRICE</th>
              <th scope="col">TOTAL</th>
            </tr>
            </thead>
             <tbody>
            {this.renderlistTotal()}
            <tr>
                <td colSpan="4" className="font-weight-bold">GRAND TOTAL</td>
                <td className="font-weight-bold">Rp. {totalPriceCart.toLocaleString('id')}</td>
            </tr>
            </tbody>
    
        </table>
     </div>)


        
        {/* // <div className="row">
        //     <div className="col-sm-6">
        //         {renderPrice}
        //     </div>
        //     <div class="col-sm-6">
        //         <div class="card">
        //         <div class="card-body text-center">
                    
                
                  
        //         </div>
        //         </div>
        //     </div>
        // </div> */}
      
           
    
}
// Renderlist Total Belanja
renderlistTotal = ()=>{
    var totalbelanja = 0
    return this.state.carts.map((product) => {
       var totalharga = product.price*product.qty
        totalbelanja += totalharga
        return (
           <tr>
             <td scope="col">{product.id}</td>
             <td scope="col">{product.name}</td>
             <td scope="col">{product.qty}</td>
             <td scope="col">Rp{product.price.toLocaleString('id')}</td>
             <td scope="col">Rp{totalharga.toLocaleString('id')}</td>
            
        </tr>     
         ) 
       })
}

// TotalBelanja = ()=>{

   
//     var totalPriceCart = 0
//     let renderPrice = this.state.carts.map((resProduct) => {
//         let totalPrice = resProduct.price * resProduct.qty
//         totalPriceCart += totalPrice
//     }) 

// return (
//         Swal.fire(`Total Belanja anda sebesar Rp.${totalPriceCart.toLocaleString('id')}`)
//     )

// }

// render cart
  render() {
      if(this.props.username){
    return (
      <div className="container">
        {/* List Product */}
        <h1 className="text-center display-4">Cart</h1>
        <table class="table table-hover text-center mb-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">DESC</th>
              <th scope="col">PRICE</th>
              <th scope="col">QTY</th>
              <th scope="col">PICTURE</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>

      
        <div>
            {/* <button onClick={this.TotalBelanja} type="Button" className="btn btn-primary btn-block w-50 mx-auto">
            Checkout
            </button>    */}
             <Button className="btn btn-primary btn-block"color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                 Checkout
            </Button>
            <UncontrolledCollapse toggler="#toggler">
             <Card>
                <CardBody>
                {this.Checkout()} 
                </CardBody>
             </Card>
            </UncontrolledCollapse>
        </div>  
    </div>)
        }
    else {
        return <Redirect to="/"/>
    }
 }
}
let mapStateToProps=(state)=>{
    return{
      username : state.auth.username
    }
  }

  export default connect (mapStateToProps)(Cart);
  
  
