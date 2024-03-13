import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import logo from '../../images/logo.png';
import LogOut from '../../pages/LogOut'; // Import the Logout component
import '../../styles/css/nav.css';
import useToken from '@galvanize-inc/jwtdown-for-react'; // Import the useToken hook

const CustomNavbar = () => {
    const { token } = useToken(); // Get the token using useToken hook

    return (
        <>
            <NavbarBootstrap bg="light" data-bs-theme="light">
                <Container>
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="Logo" className="logo mr-2" />
                        <NavbarBootstrap.Brand href="/">
                            Gama Sushi
                        </NavbarBootstrap.Brand>
                    </div>
                    <Nav className="me-auto">
                        <Nav.Link href="/menu">Menu</Nav.Link>
                        <Nav.Link href="/ourvision">Our Vision</Nav.Link>
                        <Nav.Link href="/placeanorder">Place an Order</Nav.Link>
                        <Nav.Link href="/gallery">Gallery</Nav.Link>
                        <Nav.Link href="/giftcards">Giftcards</Nav.Link>
                        {token && ( // Render the Logout component only if a token exists (user is logged in)
                            <Nav.Link>
                                <LogOut />
                            </Nav.Link>
                        )}
                        {!token && ( // Render the login link only if no token exists (user is not logged in)
                            <Nav.Link href="/token">Log In</Nav.Link>
                        )}
                    </Nav>
                </Container>
            </NavbarBootstrap>
        </>
    )
}

export default CustomNavbar;
