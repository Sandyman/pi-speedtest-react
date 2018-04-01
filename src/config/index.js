export let API_ENDPOINT = process.env.PI_API_ENDPOINT;
export let  CLIENT_ID = process.env.PI_CLIENT_ID;
export let REDIRECT_URL = process.env.PI_REDIRECT_URL;

try {
  const config = require('./config-dev');
  API_ENDPOINT = API_ENDPOINT || config.apiEndpoint;
  CLIENT_ID = CLIENT_ID || config.clientId;
  REDIRECT_URL = REDIRECT_URL || config.redirectUrl;
} catch (e) {}
