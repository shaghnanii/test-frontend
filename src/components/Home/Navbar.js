import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";

function NavbarHome() {
    const history = useHistory();
    function logout() {
        axios
            .get(`${process.env.REACT_APP_URL}/logout`, {
                headers: {
                    Authorization: `bearer ${localStorage.getItem(process.env.REACT_APP_TOKEN_VARIABLE)}`
                }
            })
            .then(function (response) {
                if (response.status === 200) {
                    localStorage.setItem(process.env.REACT_APP_TOKEN_VARIABLE, null)
                    localStorage.setItem(process.env.REACT_APP_IS_AUTH, 'false')
                    window.location = '/login'
                    // history.push('/login')
                }
            })
            .catch(function (error) {
                console.log("error response: ", error)
            });
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/categories">Category</Link>
                        <Link className="nav-link" to="/cars">Car</Link>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2}
                        onClick={logout}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarHome;