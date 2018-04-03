import React from 'react';
import { Button, Jumbotron, Media } from 'react-bootstrap';

import icon from '../github-icon-2.png';

const GitHubLogin = (props) => (
  <Jumbotron>
    <Media>
      <Media.Left>
        <img width={288} height={240} src={icon} alt="Purrrr"/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>
          Log in using GitHub<br/><br/>
        </Media.Heading>
        <p>
          For now, we only support logging in using GitHub. No need to set up an account or anything, simply
          click the button below and follow the prompts.
          <br/>
          Easy does it.
        </p>
        <br/>
        <p>
          <Button disabled={props.showSpinner} bsStyle="primary" onClick={props.handleClick}>Log in using GitHub</Button>
        </p>
      </Media.Body>
    </Media>
  </Jumbotron>
);

export default GitHubLogin;
