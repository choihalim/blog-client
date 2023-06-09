import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "../styles/navbar.css"

function NavBar({ updateUser, user }) {

    const history = useHistory()
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOffcanvasClose = () => {
        setShowOffcanvas(false);
    };

    const handleOffcanvasToggle = () => {
        setShowOffcanvas((prevState) => !prevState);
    };

    const handleLogout = () => {
        fetch('/logout', { method: 'DELETE' })
            .then(() => {
                updateUser(null)
                history.push('/authentication')
                handleOffcanvasClose()
            })
    }
    return (
        <>
            <Navbar key='xxl' bg="light" expand='xxl' className="mb-3 sticky-navbar">
                <Container fluid>
                    <Navbar.Brand href="/home">H&R's Super Amazing Blogging Platform</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} onClick={handleOffcanvasToggle} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-xxl`}
                        show={showOffcanvas}
                        onHide={handleOffcanvasClose}
                        aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`}>
                                Blog Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/home">Home</Nav.Link>
                                {user ? null : <Nav.Link href="/authentication">Login/Signup</Nav.Link>}
                                {user ? <Nav.Link onClick={handleLogout}>Logout</Nav.Link> : null}
                                {user ?
                                    <NavDropdown
                                        title="User Actions"
                                        id={`offcanvasNavbarDropdown-expand-xxl`}
                                    >
                                        <NavDropdown.Item href="/create">
                                            Post New Blog
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href={`/${user.username}`}>
                                            View Your Blogs
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    null
                                }
                            </Nav>
                            <br></br>
                            <NavDropdown.Divider />
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;