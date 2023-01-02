// eslint-disable-next-line no-unused-vars
import { SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: { [key: string]: any };
  }
}
