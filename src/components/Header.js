import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {onLogoutUser} from '../actions'

// Copy Paste dari Reactstrap 1

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

class Header extends Component {
        constructor(props) {
          super(props);
      
          this.toggle = this.toggle.bind(this);
          this.state = {
            isOpen: false
          };
        }
        toggle() {
          this.setState({
            isOpen: !this.state.isOpen
          });
        }

        onButtonClick = () =>{
          // menghapus username dari redux state
          this.props.onLogoutUser()

        }
  // Copy Paste dari Reactstrap 2

        render () {
          if (this.props.user.username == ''){
            // Render ketika BELUM Login
            return (
              <div>
              <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Task To Do</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to='/'>Task</Link>
                </NavItem>
  
                <NavItem>
                  <Link to='/register'>
                      <Button color='primary'className="mx-3">Register</Button>
                  </Link>
                </NavItem>
  
                <NavItem>
                  <Link to='/login'>
                  <Button color='success'>Login</Button>
                  </Link>
                </NavItem>
                
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    
            )
          }


// Render SETELAH login 

    
        return (
      <div>
        <Navbar color="light" light expand="md">
            <NavbarBrand >Task To Do</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
              Hai, {this.props.user.username}
              </NavItem>

              <NavItem>
              <Button color='primary'className="mx-3" onClick={()=>{this.onButtonClick()}}>
              Logout
              </Button>
              </NavItem>
            </Nav>
        </Navbar>
      </div>
        )
    }
}

const mapStateToProps = state => {
  return {
    user: state.auth // {id, username}
  }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)