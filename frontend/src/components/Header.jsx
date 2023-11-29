import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Navbar, Nav, Container, NavLink, Badge, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {useLogoutMutation} from '../slices/usersApiSlice'
import {logout} from '../slices/authSlice'
import { resetCart } from '../slices/cartSlice'
import SearchBox from './SearchBox'

const Header = () => {
    const { cartItems} = useSelector((state) => state.cart);
    const { userInfo} = useSelector((state) => state.auth);
    console.log(cartItems);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async() => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate('/login');
        }catch(error){
            console.log(error)
        }
    }
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt='Eshop'/>
                        Eshop
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        <SearchBox/>
                        <LinkContainer to='/cart'>
                            <NavLink>
                                <FaShoppingCart/> Cart
                                {
                                    cartItems.length > 0 && (
                                        <Badge pill bg='success'style={{marginLeft: '5px'}}>
                                            { cartItems.reduce((a,c)=> a+c.qty, 0)}
                                        </Badge>
                                    )
                                }
                            </NavLink>
                        </LinkContainer>
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to='/login'>
                                <NavLink href='/login'>
                                    <FaUser /> Sign in
                                </NavLink>
                            </LinkContainer>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/productList'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/userList'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderList'>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header