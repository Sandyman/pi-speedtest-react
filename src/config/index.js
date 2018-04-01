import { apiEndpoint, redirectUrl, clientId } from './config-dev.json';

export const API_ENDPOINT = process.env.PI_API_ENDPOINT || apiEndpoint;
export const CLIENT_ID = process.env.PI_CLIENT_ID || clientId;
export const REDIRECT_URL = process.env.PI_REDIRECT_URL || redirectUrl;
