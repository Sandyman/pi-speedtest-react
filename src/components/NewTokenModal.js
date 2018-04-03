import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const NewTokenModal = (props) => (
  <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Warning</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      When you regenerate the authentication token, your old token will be invalidated immediately.
      Don't forget to copy/paste the new token once it's been generated.
      <br/><br/>
      Do you really want to generate a new authentication token?
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="primary" className="pull-left" onClick={() => {
        setTimeout(props.createToken, 100);
        props.handleClose();
      }}>
        Yes
      </Button>
      <Button className="pull-left" onClick={props.handleClose}>Cancel</Button>
    </Modal.Footer>
  </Modal>
);

export default NewTokenModal;
