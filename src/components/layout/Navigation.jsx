import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
    <Navbar bg="light" variant="light" expand="lg" className="fixed-top">
      <Container>
        <Link
          className="navbar-brand"
          to={auth ? "posts" : "/"}
          aria-label="nb Some"
        >
          <svg
            id="Layer_2"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 58.19 20"
            height="50"
          >
            <g id="Layer_1-2" data-name="Layer 1">
              <rect
                className="cls-4"
                width="21"
                height="20"
                rx="2.52"
                ry="2.52"
              />
              <text className="cls-2" transform="translate(1.79 13.84)">
                <tspan x="0" y="0">
                  nb{" "}
                </tspan>
                <tspan className="cls-1" x="20.24" y="0">
                  S
                </tspan>
                <tspan className="cls-3" x="27.42" y="0">
                  OME
                </tspan>
              </text>
            </g>
          </svg>
        </Link>
        <Navbar.Toggle aria-controls="main-navigation" />
        <Navbar.Collapse id="main-navigation">
          <Nav className="ms-auto">
            {auth ? (
              <>
                <NavLink to="posts" className="nav-link">
                  Latest Posts
                </NavLink>
                <NavLink to="profiles" className="nav-link">
                  Profiles
                </NavLink>
                <NavLink to="me" className="nav-link">
                  My profile
                </NavLink>
                <Button
                  variant="secondary"
                  className="text-light"
                  onClick={logout}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
                <NavLink to="login" className="nav-link">
                  Log in
                </NavLink>
                <NavLink to="register" className="nav-link">
                  Register form
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
