import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <Navbar bg='dark' text='light'>
            <Navbar.Brand className='text-warning mx-4' href='/'>
                Irvins
            </Navbar.Brand>
            <Nav className='ml-auto'>
                <NavLink className='navlink' to='/products'>
                    Add Product
                </NavLink>
            </Nav>
        </Navbar>
    );
}

export default Navigation;
