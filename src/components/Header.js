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
          if (this.props.user.username === ''){
            // Render ketika BELUM Login
            return (
              <div>
              <Navbar color="light" light expand="md">
              <NavbarBrand href="/">SimpleMerce</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to='/'>All Products</Link>
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
            <NavbarBrand href="/">SimpleMerce</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/'>All Products</Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                      Hai, {this.props.user.username}
                  </DropdownToggle>

                <DropdownMenu>
                    <Link to='/ManageProduct'>
                    <DropdownItem>Manage Products</DropdownItem>
                    </Link>

                    <Link to='/Cart'>
                    <DropdownItem>Shopping Cart</DropdownItem>
                    </Link>

                    <DropdownItem>About</DropdownItem>

                    <DropdownItem>
                    <DropdownItem divider />
                    <Button className='dropdown-item' onClick={()=>{this.onButtonClick()}}>
                    Logout
                    </Button>
                    </DropdownItem>
                    
                </DropdownMenu>

            </UncontrolledDropdown>
              
            </Nav>
          </Collapse>
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