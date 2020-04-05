import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

import { connect } from "react-redux";
import { onLogoutUser } from "../actions/index";

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  // Menentukan apa yang harus ditampilkan di header (Register dan login) atau (Hello, username)
  renderNav = () => {
    // Jika tidak login
    if (this.props.username == "") {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/register">
              Register
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/login">
              Login
            </NavLink>
          </NavItem>
        </Nav>
      );
    }

    // Jika login
    return (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Hello, {this.props.username}
          </DropdownToggle>
          <DropdownMenu right>
            <NavLink tag={Link} to="/manageproduct">
              <DropdownItem>Manage Products</DropdownItem>
            </NavLink>

            <NavLink tag={Link} to="/cart">
              <DropdownItem>Cart</DropdownItem>
            </NavLink>

            <DropdownItem divider />
              <NavLink tag={Link} to="/">
                <DropdownItem onClick={this.props.onLogoutUser}>Logout</DropdownItem>
              </NavLink>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            reactstrap
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.renderNav()}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    username: state.auth.username
  };
};

export default connect(mapStateToProps, { onLogoutUser })(Header);

// const [isOpen, setIsOpen] = useState(false);
// const togglex = () => setIsOpen(!isOpen);
