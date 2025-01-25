import { google } from "googleapis";

export const ggauth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GGAUTH_CREDENTIALS as string),
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.readonly",
  ],
});

export const ggdrive = google.drive({
  version: "v3",
  auth: ggauth,
});
