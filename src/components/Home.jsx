import React, { Component } from "react";
import axios from '../config/axios'
// import {Link} from "react-router-dom"
import ProductItem from "./ProductItem"


class Home extends Component {
  
  state={
    products : []
  }
  componentDidMount(){
    this.getProduct()
  }
  getProduct = () =>{
    axios.get('/products').then((res)=>{
      this.name.value=""
      this.min.value=""
      this.max.value=""
      this.setState({products:res.data})
    })
  }
  renderProducts = ()=>{
    
    return this.state.products.map((product)=>{
      product.price=product.price.toLocaleString("in")
      return(
    //     <div key={product.id}className="card  col-lg-5 col-xl-3 mx-auto mx-xl-4 my-3">
    //       <img className="card-img-top"src={product.src} alt=""/>
    //       <div className= "card-body">
    //         <h5 className="card-title">{product.name}</h5>
    //         <p className= "card-text" >{product.desc}</p>
    //         <p className="card-text">Rp.{product.price}</p>
    //         <input className="form-control" type="text" placeholder="Jumlah QTY"></input>
    //         <Link to={`/detailproduct/${product.id}`}>
    //           <button className="btn btn-secondary btn-light btn-block my-2">
    //             DETAIL
    //           </button>
    //         </Link>
    //         <button className="btn btn-primary btn-dark btn-block my-2">ADD TO CART</button>
    //       </div>
    //     </div>
    <ProductItem product={product}/>
      
      )}
      )
  }
  
  
  onBtnSearch = ()=>{

    axios.get('/products').then((res)=>{
      
     
    let keyword = this.name.value
    let minprice = parseInt(this.min.value)
    let maxprice = parseInt(this.max.value)
    let filterResult = []

    if(isNaN(minprice) && isNaN(maxprice)){
      filterResult = res.data.filter ((data)=>{
      return(
        data.name.toLowerCase().includes(keyword.toLowerCase())
        )
    })

  }else if (isNaN(maxprice)){
    filterResult=res.data.filter ((data) => {
      return (
        data.name.toLowerCase().includes(keyword.toLowerCase())&&
        data.price >= minprice
      )
    })

  }else if (isNaN(minprice)){
    filterResult=res.data.filter((data)=>{
      return(
        data.nama.toLowerCase().includes(keyword.toLowerCase())&&
        data.price <= maxprice
      )
    })
  }else {
    filterResult=res.data.filter((data)=>{
      return(
        data.name.toLowerCase().includes(keyword.toLowerCase())&&
        data.price>=minprice&&
        data.price<=maxprice
      )
    })
  }
      this.setState({products : filterResult})
    })

  }


  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        {/* Search */}
          <div className="bg bg-secondary col-10 col-lg-3 col-xl-2">
            <div className="mt-3">
              <div className ="card">

                <div className="border-bottom border-secondary card-title">
                  <h1 className="text-center ">SEARCH</h1>
                </div>

                <div className="card-body">
                  <h4>Name</h4>
                  <input ref={(input)=>{this.name=input}} className="form-control" type="text"/>
                  
                  <h4>Price</h4>
                  <input ref={(input)=>{this.min=input}} className="form-control mb-2" type="text" placeholder="Min"/>
                  <input ref={(input)=>{this.max=input}} className="form-control " type="text" placeholder="Max"/>

                  <button onClick={this.onBtnSearch} className="btn btn-block btn-outline-primary mt-5">Search</button>
                  <button onClick={this.getProduct} className="btn btn-block btn-outline-danger">Reset</button>
                  
                </div>  


              </div>
            </div>
          </div>
        {/* List Product */}
          <div className=" row col-10 col-lg-9">
            {this.renderProducts()}
            
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
