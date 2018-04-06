import React from 'react';
import { Col } from 'react-bootstrap';

const PanelHeader = (props) => (
  <Col smOffset={1}>
    <br/>
    <h3>
      {props.title}
      {props.children}
    </h3>
    <h4><div style={{ color: "#888" }}>{props.subTitle}</div></h4>
    <br/>
  </Col>
);

export default PanelHeader;
