import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  Navbar,
  Nav,
  NavbarToggler,
  Collapse,
  NavLink,
  NavbarBrand,
} from "reactstrap";
import { LinkContainer } from "react-router-bootstrap";

import { AuthContext } from "./context/authContext";
import Routes from "./Routes"; // Handle routes with React Router module
import "./styles/App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory(); // use to redirect
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setIsAuthenticated(true);
    }
  }, []);

  function handleLogout() {
    // Set the token to null
    fetch("http://127.0.0.1:8000/dj-rest-auth/logout/", {
      method: "POST",
    }).then(() => {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      history.push("/");
    });
  }

  return (
    <div className="container">
      <Navbar className="navbar navbar-dark bg-dark" expand="md">
        <LinkContainer to="/">
          <NavbarBrand>My Todo List</NavbarBrand>
        </LinkContainer>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} className="justify-content-end" navbar>
          <Nav navbar activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <>
                <LinkContainer to="/profile">
                  <NavLink>Profile</NavLink>
                </LinkContainer>
                <NavLink onClick={handleLogout} href="">
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <NavLink>Signup</NavLink>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavLink>Login</NavLink>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
