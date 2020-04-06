import React, { Component } from "react";
import axios from "../config/axios";
import {Redirect,Link}from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import {connect}from 'react-redux'

import Swal from "sweetalert2"

class ManageProduct extends Component {
  state = {
    products: [],
    modal: false,
    editproduct: {}
  };
  //   Running hanya sekali
  componentDidMount() {
    this.getData();
  }

  renderList = () => {
    //   this.state.products = [{},{},{}]
    // ptoduct = { id, name, desc, price, src}

    return this.state.products.map(product => {
      product.price = product.price.toLocaleString("id");
      return (
        <tr>
          <td scope="col">{product.id}</td>
          <td scope="col">{product.name}</td>
          <td scope="col">{product.desc}</td>
          <td scope="col">Rp{product.price}</td>
          <td className="w-25 " scope="col">
            <img className="img-thumbnail w-75" src={product.src} alt="" />
          </td>
          <button
            className=" btn btn btn-outline-primary btn-block "
            onClick={() => {
              this.editproduct(product.id);
            }}
          >
            EDIT
          </button>
          <button
            className="btn btn-outline-warning btn-block"
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

  //   Save Data
  OnSaveToggle = () => {
    //   ambil data
    let name = this.editName.value
      ? this.editName.value
      : this.state.editproduct.name;
    let description = this.editDesc.value
      ? this.editDesc.value
      : this.state.editproduct.desc;
    let price = this.editPrice.value
      ? parseInt(this.editPrice.value)
      : parseInt(this.state.editproduct.price)
    let image = this.editImg.value
      ? this.editImg.value
      : this.state.editproduct.Image;

    axios
      .patch(`/products/${this.state.editproduct.id}`, {
        name,
        desc: description,
        price: price,
        src: image
      })
      .then(res => {
        this.getData();
      });
  };

  // Delete Data
  deleteproduct = id => {
    // axios.delete(`http://localhost:2020/products/${id}`).then(res => {
    //   this.getData();
    // });
    Swal.fire({
      title: 'Yakin Mau di Hapus?',
      text: 'nanti ga bisa balik lho..',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'APUSS AEEEH',
      cancelButtonText: 'Yauda GA JADIII!!'
    }).then((result) => {
      if (result.value) {
        axios.delete(`/products/${id}`).then(res => {
          this.getData();
          Swal.fire(
            'HAPUSS',
            'HILANGG KANNN...',
            'success'
          )
        })

        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else {
        Swal.fire(
          'Oke kalo itu mau Lo..',
          'Kita balikin file Lo..',
          'error'
        )
      }
    })
  }

  //Edit Data
  editproduct = id => {
    axios.get(`/products/${id}`).then(res => {
      this.setState({ editproduct: res.data, modal: true });
    });
  };
  // Cancel Data
  onCancelToggle = () => {
    this.setState({ modal: false });
  };
  //   Ambil Data
  getData = () => {
    axios.get("/products").then(res => {
      this.setState({ products: res.data });
    });
  };
  // Input Data
  addProduct = () => {
    // Ambil data dari "Input Product"
    let name_source = this.name.value;
    let desc_source = this.desc.value;
    let price_source = parseInt(this.price.value);
    let src_source = this.src.value;

    // Taruh data ke database "db.json"
    axios
      .post("/products", {
        name: name_source,
        desc: desc_source,
        price: price_source,
        src: src_source
      })
      .then(res => {
        this.getData();
      });
  };

  render() {
    if(this.props.username){
    return (
      <div className="container">
        {/* List Product */}
        <h1 className="text-center display-4">Manage Product</h1>
        <table class="table table-hover text-center mb-5">
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
          <tbody>{this.renderList()}</tbody>
        </table>

        {/* Input Procduct */}
        <h1 className="text-center display-4">INPUT PRODUCT</h1>
        <table class="table table-hover text-center mb-5">
          <thead>
            <tr>
              <td scope="col">
                <input
                  ref={input => {
                    this.name = input;
                  }}
                  placeholder="name"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <input
                  ref={input => {
                    this.desc = input;
                  }}
                  placeholder="desc"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <input
                  ref={input => {
                    this.price = input;
                  }}
                  placeholder="price"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <input
                  ref={input => {
                    this.src = input;
                  }}
                  placeholder="image"
                  className="form-control"
                  type="text"
                />
              </td>
              <td scope="col">
                <button
                  onClick={this.addProduct}
                  className="btn btn-outline-danger btn-block btn-sm"
                >
                  Input
                </button>
              </td>
            </tr>
          </thead>
        </table>

        {/* Modal edit */}
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Edit your product</ModalHeader>
          <ModalBody>
            Name :{" "}
            <input
              className="form-control"
              type="text"
              ref={input => {
                this.editName = input;
              }}
              placeholder={this.state.editproduct.name}
            />
            Description
            <input
              className="form-control"
              type="text"
              ref={input => {
                this.editDesc = input;
              }}
              placeholder={this.state.editproduct.desc}
            />
            Price
            <input
              className="form-control"
              type="number"
              ref={input => {
                this.editPrice = input;
              }}
              placeholder={this.state.editproduct.price}
            />
            Image
            <input
              className="form-control"
              type="text"
              ref={input => {
                this.editImg = input;
              }}
              placeholder={this.state.editproduct.src}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.OnSaveToggle}>
              Save
            </Button>
            <Button color="secondary" onClick={this.onCancelToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
     }else{
    return <Redirect to="/"/>
    };
}
}
let mapStateToProps=(state)=>{
  return{
    username : state.auth.username
  }
}

export default connect (mapStateToProps)(ManageProduct)
