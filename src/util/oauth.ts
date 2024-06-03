import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID as string,
  process.env.GOOGLE_CLIENT_SECRET as string,
  process.env.GOOGLE_CLIENT_URL as string
);

const scopes = [
  process.env.SCOPE_USERINFO_EMAIL as string,
  process.env.SCOPE_USERINFO_PROFILE as string,
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

export { oauth2Client, authorizationUrl };
