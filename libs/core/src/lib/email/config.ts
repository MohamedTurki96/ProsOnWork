export interface SMTPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}
export const SMPT_CONFIG = 'SMPT_CONFIG';

export default () => {
  const host = process.env['SMTP_HOST'];
  const portstr = process.env['SMTP_PORT'];
  const username = process.env['SMTP_USER'];
  const password = process.env['SMTP_PASSWORD'];

  if (!host) {
    throw new Error(`Missing required env variable "SMTP_HOST"`);
  }

  if (!portstr) {
    throw new Error(`Missing required env variable "SMTP_PORT"`);
  }

  const port = parseInt(portstr);
  if (isNaN(port)) {
    throw new Error(`Variable "SMTP_PORT" must be an integer string`);
  }

  if (!username) {
    throw new Error(`Missing required env variable "SMTP_USER"`);
  }

  if (!password) {
    throw new Error(`Missing required env variable "SMTP_PASSWORD"`);
  }

  return {
    host: host,
    port: port,
    username: username,
    password: password,
  };
};
