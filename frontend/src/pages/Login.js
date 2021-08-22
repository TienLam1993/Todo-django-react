import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, UncontrolledAlert } from "reactstrap";

import LoaderButton from "../components/LoaderButton";
import { useAuthContext } from "../context/authContext";

import "../styles/Login.css";

export default function Login() {
  const { setIsAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false); // give user feedback that the app is working while logging in
  const [alert, setAlert] = useState(false);
  const history = useHistory(); // use to redirect after logged in
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "dj-rest-auth/login/",
        {
          method: "POST",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        //console.log(response);
        const data = await response.json();
        setIsAuthenticated(true);
        localStorage.setItem("token", data.key);
        history.push("/");
      } else {
        setError("Invalid Username or Password!");
        setIsLoading(false);
      }
    } catch (error) {
      setAlert(true);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      {alert ? (
        <UncontrolledAlert color="danger">
          Cannot connect to the server. Please try again!
        </UncontrolledAlert>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <FormGroup size="lg" controlId="username">
          <Label>Username</Label>
          <Input
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup size="lg" controlId="password">
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <div className="text-danger">{error}</div>
        <br></br>
        <LoaderButton
          block
          size="block"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}
