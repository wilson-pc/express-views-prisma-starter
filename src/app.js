import express from 'express';
import { json, urlencoded } from 'body-parser';
import { resolve } from 'path';
import redirectFlash from '@u4da3/express-redirect-flash';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import { userRoute, authRoute } from './routes';
import { config, engine } from './engine';

const prisma = new PrismaClient();

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
config({ cache: process.env.NODE_ENV === 'production' });
app.use(engine);
app.use(redirectFlash());
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.session = req.session;
  }

  next();
});
app.set('views', resolve('views'));
app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('index', { message: 'Express app starter', users });
});
app.use('/user', userRoute);
app.use('/auth', authRoute);

export default app;
