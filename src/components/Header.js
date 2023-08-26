import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/image/logo192.png";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);
  const [hideHeader, setHideHeader] = useState(false);

  // useEffect(() => {
  //   if (window.location.path === "/login") {
  //     setHideHeader(true);
  //   } else {
  //     setHideHeader(false);
  //   }
  // }, []);
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout successful!");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="react bootstrap logo"
            />
            <span>React-Bootstrap</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {(user && user.auth === true) ||
            window.location.pathname === "/" ||
            window.location.pathname === "/users" ? (
              <>
                <Nav className="me-auto" activeKey={location.pathname}>
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.auth === true ? (
                    <span className="nav-link">
                      Welcome <b>{user.email}</b>!
                    </span>
                  ) : (
                    ""
                  )}
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    {user && user.auth === true ? (
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink className="dropdown-item" to="/login">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
