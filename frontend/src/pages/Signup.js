import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, FormGroup, Label, Input, UncontrolledAlert } from "reactstrap";
import LoaderButton from "../components/LoaderButton";

import "../styles/Signup.css";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false); // give user feedback that the app is working while logging in
  const history = useHistory(); // use to redirect after logged in
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setError] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [alert, setAlert] = useState(false);

  function validateForm() {
    return (
      username.length > 0 &&
      email.length > 0 &&
      password1.length > 0 &&
      password2.length > 0
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/dj-rest-auth/registration/",
        {
          method: "POST",
          credentials: "omit",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username, email, password1, password2 }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.key);
        history.push("/");
      } else {
        const errors = {};
        const message = await response.json();
        if (message.username) {
          errors["username"] = message.username;
        }
        if (message.email) {
          errors["email"] = message.email;
        }
        if (message.password1) {
          errors["password1"] = message.password1;
        }
        if (message.non_field_errors) {
          errors["password2"] = message.non_field_errors;
        }
        setError(errors);
        setIsLoading(false);
      }
    } catch (error) {
      setAlert(true); // fetch error
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
        <div className="text-danger">{errors.username}</div>
        <FormGroup size="lg" controlId="email">
          <Label>Email</Label>
          <Input
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <div className="text-danger">{errors.email}</div>
        <FormGroup size="lg" controlId="password">
          <Label>Password</Label>
          <Input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </FormGroup>
        <div className="text-danger">{errors.password1}</div>
        <FormGroup size="lg" controlId="password2">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </FormGroup>
        <div className="text-danger">{errors.password2}</div>
        <br></br>
        <LoaderButton
          block
          size="block"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Sign up
        </LoaderButton>
      </Form>
    </div>
  );
}
