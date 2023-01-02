import { Request, Response } from 'express';
import { validateEmail, login } from '../services';

export async function loginUser({ body}:Request, res:Response) {
  try {
    const { email, password } = body;
    const user = await validateEmail(email);
    if (user) {
      login(user, password)
        .then(() => {
          if (body.rememberMe) {
            res.cookie(
              'user',
              {
                id: user.id,
                email: user.email,
                name: user.name,
              },
              {
                maxAge: 1000 * 60 * 60 * 24,
                secure: true,
              }
            );
          } else {
            res.cookie(
              'user',
              {
                id: user.id,
                email: user.email,
                name: user.name,
              },
              {
                expires: undefined,
                secure: true,
              }
            );
          }
          res.redirect('/');
        })
        .catch(() => {
          res.redirectFlash('/auth/', {
            message: 'User or password incorect',
          });
        });
    } else {
      res.redirectFlash('/auth/', {
        message: 'User or password incorect',
      });
    }
  } catch (error:any) {
    res.redirectFlash('/auth/', {
      message: error.message,
    });
  }
}

export async function logout(_req:Request, res:Response) {
  res.clearCookie('user');
  res.redirect('/');
}
