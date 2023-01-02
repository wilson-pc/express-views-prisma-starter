import express, { Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';
import redirectFlash from '@u4da3/express-redirect-flash';
import { PrismaClient } from '@prisma/client';
import session from 'express-session';
import { userRoute, authRoute } from './routes';
import { config, engine } from './engine';

const prisma = new PrismaClient();
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());
config({ cache: process.env.NODE_ENV === 'production' });
app.use(engine);
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(redirectFlash());
app.use((req: Request, res: Response, next) => {
  if (req.cookies.user) {
    const { user } = req.cookies;

    res.locals.session = { user };
    req.user = user;
  }

  next();
});
app.set('views', resolve('views'));
app.get('/', async (_req, res) => {
  const users = await prisma.user.findMany();
  res.render('index', { message: 'Express app starter', users });
});
app.use('/user', userRoute);
app.use('/auth', authRoute);

export default app;
