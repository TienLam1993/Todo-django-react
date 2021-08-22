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
  FormText,
} from "reactstrap";

export default class EmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: null,
    };
  }

  render() {
    const { toggle, email, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Change Email
          <FormText>Current email: {email}</FormText>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="new-email">Enter new Email</Label>
              <Input
                type="email"
                id="new-email"
                name="new-email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                placeholder="user@example.com"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.email)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
