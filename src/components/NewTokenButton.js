import React from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

const tooltip = <Tooltip id="tooltip-right">
  Use this button to generate a new authentication token.
  This will invalidate your old token, so make sure you know this is what you want.
</Tooltip>;

const NewTokenButton = (props) => (
  <OverlayTrigger placement="right" overlay={tooltip}>
    <Button bsStyle='warning' disabled={props.loading} onClick={props.handleRefresh}>
      <Glyphicon glyph="glyphicon glyphicon-refresh"/> Regenerate
    </Button>
  </OverlayTrigger>
);

export default NewTokenButton;
