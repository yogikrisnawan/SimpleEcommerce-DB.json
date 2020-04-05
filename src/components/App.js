import React, { component, Component } from "react";
import { Route, browserRouter, BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
// components
import Header from "./Header";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import ManageProduct from "./ManageProduct";
import DetailProduct from "./DetailProduct"
import Cart from "./Cart"

// Keeplogin
import {onLoginUser}from'../actions/index'
import {connect} from 'react-redux'

class App extends Component {

componentDidMount(){
  let userData = localStorage.getItem('userData')
  let user = JSON.parse(userData)

  if(user){
    this.props.onLoginUser(user)
  }
}

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/manageproduct" component={ManageProduct} />
          <Route path="/detailproduct/:id" component={DetailProduct}/>
          <Route path="/cart" component={Cart}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null,{onLoginUser})(App);
