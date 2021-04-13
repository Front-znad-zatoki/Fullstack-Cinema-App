import config from 'config';
import nodemailer from 'nodemailer';

const USERNAME = config.get('mailLogin');
const USER_PASSWORD = config.get('mailPassword');
const OAUTH_CLIENTID = config.get('oauthClientId');
const OAUTH_CLIENT_SECRET = config.get('oauthClientSecret');
const OAUTH_REFRESH_TOKEN = config.get('refreshToken');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: USERNAME,
    pass: USER_PASSWORD,
    clientId: OAUTH_CLIENTID,
    clientSecret: OAUTH_CLIENT_SECRET,
    refreshToken: OAUTH_REFRESH_TOKEN,
  },
});

export default transporter;
