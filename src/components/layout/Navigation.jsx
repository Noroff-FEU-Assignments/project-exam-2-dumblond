import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }
  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" height="50" />
        </Link>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Latest posts
            </NavLink>
            <NavLink to="profiles" className="nav-link">
              Profiles
            </NavLink>

            {auth ? (
              <>
                <NavLink to="me" className="nav-link">
                  My profile
                </NavLink>
                <Button variant="secondary" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <NavLink to="login" className="nav-link">
                Log in
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
