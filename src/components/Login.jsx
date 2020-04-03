import React, { Component } from "react";
import axios from "../config/axios";
import { connect } from "react-redux";


import { onLoginUser } from "../actions/index";
// Akan me-redirect ke alamat tertentu
import { Redirect } from "react-router-dom";

class Login extends Component {
  onButtonClick = () => {
    let _username = this.username.value;
    let _pswd = this.pswd.value;

    // get data with parameters
    let link = "/users";
    let data = { username: _username, pswd: _pswd };

    axios.get(link, { params: data }).then(res => {
      if (res.data.length > 0) {
        // res.data[0]=
        // user di temukan: simpan info user ke redux
        this.props.onLoginUser(res.data[0]);
      } else alert("user not found");
    });
  };

  render() {
    if (!this.props.Username) {
      // Jika belum login
      return (
        <div>
          <div className="container-fluid login">
            <div className="row">
              <div className="bg-transparent col-5 mx-auto mt-5 card">
                <div className="text-light card-body">
                  <div className="border-bottom border-secondary card-title text-center">
                    <h1>Login</h1>
                  </div>
                </div>
                <form className="form-group">
                  <div className="card-title ">
                    <h4>Username</h4>
                  </div>
                  <input
                    ref={input => {
                      this.username = input;
                    }}
                    type="text"
                    className="form-control"
                    required
                  />
                  <div className="card-title ">
                    <h4>Password</h4>
                  </div>
                  <input
                    ref={input => {
                      this.pswd = input;
                    }}
                    type="password"
                    className="form-control"
                  />
                </form>

                <button
                  className="btn btn-success btn-block"
                  onClick={this.onButtonClick}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
let mapStateToProps = state => {
  return {
    Username: state.auth.username
  };
};

export default connect(mapStateToProps, { onLoginUser })(Login);
