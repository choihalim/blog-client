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
    const [search, setSearch] = useState('');

    const handleOffcanvasClose = () => {
        setShowOffcanvas(false);
    }

    const handleOffcanvasToggle = () => {
        setShowOffcanvas((prevState) => !prevState);
    }

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearchSubmit = () => {
        if (search.trim() !== '') {
            history.push(`/${search}`)
            setSearch('')
        }
    }

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
                                            Edit a Blog
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    null
                                }
                            </Nav>
                            <br></br>
                            <NavDropdown.Divider />
                            <Form className="d-flex" onSubmit={handleSearchSubmit}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search for a user..."
                                    className="me-2"
                                    aria-label="Search"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                                <Button variant="outline-success" type="submit">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;