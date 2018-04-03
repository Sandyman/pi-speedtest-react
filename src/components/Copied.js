import React from 'react';
import { Fade } from 'react-bootstrap';

const Copied = (props) => (
  <Fade in={props.copied} timeout={500}>
    <span style={{color: 'red', fontSize: '0.8em'}}>Copied.</span>
  </Fade>
);

export default Copied;
