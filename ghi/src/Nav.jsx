import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavbarBootstrap from 'react-bootstrap/Navbar'

function CustomNavbar() {
    return (
        <>
            <NavbarBootstrap bg="light" data-bs-theme="light">
                <Container>
                    <NavbarBootstrap.Brand href="#home">
                        Gama Sushi
                    </NavbarBootstrap.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/menu">Menu</Nav.Link>
                        <Nav.Link href="/ourvision">Our Vision</Nav.Link>
                        <Nav.Link href="/placeanorder">Place an Order</Nav.Link>
                        <Nav.Link href="/gallery">Gallery</Nav.Link>
                        <Nav.Link href="/giftcards">Giftcards</Nav.Link>
                    </Nav>
                </Container>
            </NavbarBootstrap>
        </>
    )
}
export default CustomNavbar
