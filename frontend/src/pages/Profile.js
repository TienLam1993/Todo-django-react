import { Component } from "react";
import { Redirect } from "react-router";
import { Alert, Button, UncontrolledAlert } from "reactstrap";
import EmailModal from "../components/EmailModal";
import PasswordModal from "../components/PasswordModal";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      message: null,
      id: "",
      username: "",
      email: "",
      emailModal: false,
      passwordModal: false,
    };
    this.submitEmail = this.submitEmail.bind(this);
    this.submitPassword = this.submitPassword.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/dj-rest-auth/user/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({ username: result.username });
        this.setState({ email: result.email });
        this.setState({ id: result.pk });
      })
      .catch((error) => this.setState({ alert: true }));
  }

  // Hide/show email modal   Declare function this way will not require to bind "this" on the constructor
  emailToggle = () => {
    this.setState({ emailModal: !this.state.emailModal });
  };

  submitEmail(newEmail) {
    this.emailToggle();
    this.setState({ email: newEmail });

    fetch(`http://127.0.0.1:8000/api/users/${this.state.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username: this.state.username,
        email: newEmail,
      }),
    })
      .then((response) => response.json())
      .then((result) =>
        this.setState({ message: "Email changed to " + result.email })
      )
      .catch((error) => this.setState({ alert: true }));
  }

  // Hide/show  password modal
  passwordToggle = () => {
    this.setState({ passwordModal: !this.state.passwordModal });
  };

  submitPassword(oldpassword, password1, password2) {
    this.passwordToggle();
    fetch("http://127.0.0.1:8000/dj-rest-auth/password/change/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        old_password: oldpassword,
        new_password1: password1,
        new_password2: password2,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.old_password) {
          this.setState({ message: result.old_password });
        }
        if (result.new_password1) {
          this.setState({ message: result.new_password1 });
        }
        if (result.new_password2) {
          this.setState({ message: result.new_password2 });
        }
        if (result.detail) {
          this.setState({ message: result.detail });
        }
      })
      .catch((error) => this.setState({ alert: true }));
  }

  render() {
    if (localStorage.getItem("token") == null) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        {this.state.alert ? (
          <UncontrolledAlert color="danger">
            Cannot connect to the server!
          </UncontrolledAlert>
        ) : null}
        {this.state.message ? (
          <Alert color="danger" toggle={() => this.setState({ message: null })}>
            {this.state.message}
          </Alert>
        ) : null}
        <div>
          <h4 style={{ textAlign: "center" }}>Hello, {this.state.username}!</h4>
          <h5>Your email is: {this.state.email}</h5>
          <div>
            <Button color="info" onClick={this.emailToggle}>
              Click here to change your email
            </Button>
          </div>
          <br></br>
          <div>
            <Button color="info" onClick={this.passwordToggle}>
              Click here to change your password
            </Button>
          </div>
        </div>

        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div>
            {this.state.emailModal ? (
              <EmailModal
                toggle={this.emailToggle}
                email={this.state.email}
                onSave={this.submitEmail}
              />
            ) : null}
          </div>
          <div>
            {this.state.passwordModal ? (
              <PasswordModal
                toggle={this.passwordToggle}
                onSave={this.submitPassword}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
