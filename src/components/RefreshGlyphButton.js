import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

const RefreshGlyphButton = (props) => (
  <Button bsSize="small" onClick={props.handleClick} disabled={props.loading}>
    <Glyphicon glyph="glyphicon glyphicon-refresh"/>
  </Button>
);

export default RefreshGlyphButton;
