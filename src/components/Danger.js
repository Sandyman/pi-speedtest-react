import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Checkbox, Col, Form, Grid, Modal, OverlayTrigger, Row, Tooltip
} from 'react-bootstrap';
import { bindActionCreators } from "redux";
import * as userActions from "../actions/userActions";
import {withRouter} from "react-router-dom";

class Danger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accepted: false,
      showModal: false,
    }
  }

  handleClose() {
    this.setState({
      accepted: false,
      showModal: false,
    })
  }

  handleDelete() {
    this.setState({
      showModal: true,
    })
  }

  handleDeleteForever() {
    console.log(this.props);
    const { sub } = this.props;
    this.setState({
      showModal: false,
    });
    this.props.userActions.deleteUserAccount(sub);
    this.props.userActions.logoutUser();
    this.props.history.push('/');
  }

  handleCheckbox(isChecked) {
    this.setState({
      accepted: isChecked,
    })
  }

  render() {
    const tooltip = <Tooltip id="tooltip-right">
      Deleting your account is irreversible! Your account will be gone for good, so make sure this is what you want.
    </Tooltip>;

    return (
      <Grid>
        <Row>
          <Col smOffset={1}>
            <OverlayTrigger placement="right" overlay={tooltip}>
              <Button bsStyle="danger" onClick={this.handleDelete.bind(this)}>
                Delete account
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Danger!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <p>
                This action is irreversible. Deleting your account cannot be undone.<br/>
                Are you sure you want to delete your account forever (and ever)?
              </p>
              <Checkbox onClick={e => this.handleCheckbox.bind(this)(e.target.checked)}>I understand, let me delete my account.</Checkbox>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" className="pull-left" onClick={this.handleDeleteForever.bind(this)} disabled={!this.state.accepted}>Delete forever</Button>
            <Button bsStyle="success" className="pull-left" onClick={this.handleClose.bind(this)}>Never mind</Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { user } = state.user;
  return {
    sub: user.sub,
  };
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Danger));
