import React, { Component } from "react";
import axios from "../config/axios";

class Register extends Component {
  onButtonClick = () => {
    // Ambil Value
    let username = this.username.value;
    let email = this.email.value;
    let pswd = this.password.value;
    // SImpan di Json
    // GET, POST, PUT, PATCH
    let linkPost = "/users";
    let linkGet = "/users";
    let data = { username, email, pswd };
    // Check data
    axios.get(linkGet).then(res => {
      // Check duplicate data
      // res.data = [{}, {}, {}]
      // user = {username, email, pswd}
      let takenUser = res.data.filter(user => {
        return user.username == username;
      });

      if (takenUser.length > 0) {
        return alert(`Username ${username} sudah terpakai`);
      }

      let takenEmail = res.data.filter(user => {
        return user.email == email;
      });

      if (takenEmail.length > 0) {
        return alert(`Email ${email} sudah terpakai`);
      }

      // Post data
      axios.post(linkPost, data).then(res => {
        alert("REGISTER BERHASIL");
      });
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className=" col-5 mx-auto mt-5 card">
            <div className="card-body">
              <div className="border-bottom border-secondary card-title text-center">
                <h1>Register</h1>
              </div>
              {/* USERNAME */}
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
                />
                {/* EMAIL */}
                <div className="card-title ">
                  <h4>Email</h4>
                </div>
                <input
                  ref={input => {
                    this.email = input;
                  }}
                  type="text"
                  className="form-control"
                />
                {/* PASSWORD */}
                <div className="card-title ">
                  <h4>Password</h4>
                </div>
                <input
                  ref={input => {
                    this.password = input;
                  }}
                  type="password"
                  className="form-control"
                />
              </form>

              <button
                className="btn btn-success btn-block"
                onClick={this.onButtonClick}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
