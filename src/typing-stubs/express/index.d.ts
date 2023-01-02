// eslint-disable-next-line no-unused-vars
import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: { [key: string]: any };
  }
}
