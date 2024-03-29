import React, { Component } from 'react';
import { Col, Grid, Panel, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import PanelHeader from '../components/PanelHeader';
import AppMenu from '../containers/AppMenu';
import Danger from '../containers/Danger';
import Token from './Token'
import User from './User';
import CookieConsent from "react-cookie-consent";

class Account extends Component {
  render() {
    return (
      <div>
        <Helmet
          script={[{
            type: 'text/javascript',
            innerHTML: 'window.MemberfulOptions = {site: "https://pispeedtest.memberful.com"};\n' +
              '\n' +
              '  (function() {\n' +
              '    var s   = document.createElement(\'script\');\n' +
              '\n' +
              '    s.type  = \'text/javascript\';\n' +
              '    s.async = true;\n' +
              '    s.src   = \'https://d35xxde4fgg0cx.cloudfront.net/assets/embedded.js\';\n' +
              '\n' +
              '    setup = function() { window.MemberfulEmbedded.setup(); }\n' +
              '\n' +
              '    s.addEventListener("load", setup, false);\n' +
              '\n' +
              '    ( document.getElementsByTagName(\'head\')[0] || document.getElementsByTagName(\'body\')[0] ).appendChild( s );\n' +
              '  })();'
          }]} />
        <CookieConsent>
          This website uses cookies to enhance the user experience.
        </CookieConsent>
        <AppMenu />
        <Grid bsClass="container">
          <h2>Account</h2>
          <Row><br/></Row>
          <Row>
            <Panel bsStyle="primary">
              <PanelHeader
                title="User"
                subTitle="Everything about you. (Well, maybe not everything.)"
              />
              <User />
              <br/>
            </Panel>
          </Row>
          <Row>
            <Panel bsStyle="primary">
              <PanelHeader
                title="Authentication"
                subTitle="So we know it's your data and not someone else's"
              />
              <div>
                <Col smOffset={1}>
                  <strong>Important information</strong>: please update your token in order to be able to keep sending your measurement samples!
                  <br/>
                  If you have changed your token after 22 December 2019, you don't have to do anything.
                  <br/><br/>
                </Col>
              </div>
              <Token />
              <br/>
            </Panel>
          </Row>
          <Row>
            <Panel bsStyle="primary">
              <PanelHeader
                title="Danger zone"
                subTitle="You can break things here if you're not careful"
              />
              <Danger />
              <Col><br/><br/></Col>
            </Panel>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Account;
