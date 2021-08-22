import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class PasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      password1: "",
      password2: "",
    };
  }

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change Password</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="oldpassword">Old Password</Label>
              <Input
                type="password"
                id="oldpassword"
                name="oldpassword"
                value={this.state.oldpassword}
                onChange={(e) => this.setState({ oldpassword: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password1">Enter new Password</Label>
              <Input
                type="password"
                id="password1"
                name="password1"
                value={this.state.password1}
                onChange={(e) => this.setState({ password1: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password2">Confirm Password</Label>
              <Input
                type="password"
                id="password2"
                name="password2"
                value={this.state.password2}
                onChange={(e) => this.setState({ password2: e.target.value })}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() =>
              onSave(
                this.state.oldpassword,
                this.state.password1,
                this.state.password2
              )
            }
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
