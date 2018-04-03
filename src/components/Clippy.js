import React from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const tooltip = <Tooltip id="tooltip-right">
  Use this button to copy the token string, which you can paste verbatim into your config file.
</Tooltip>;

const Clippy = (props) => (
  <CopyToClipboard
    text={props.text}
    onCopy={props.handleCopy}>
    <OverlayTrigger placement="right" overlay={tooltip}>
      <Button disabled={!props.source}>
        <Glyphicon glyph="glyphicon glyphicon-copy" />
      </Button>
    </OverlayTrigger>
  </CopyToClipboard>
);

export default Clippy;
