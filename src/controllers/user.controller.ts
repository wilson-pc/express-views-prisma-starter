import { Request, Response } from 'express';
import { saveUser, getUserById, getUsers } from '../services';


export async function getProfile(req:Request, res:Response) {
  const user = await getUserById(req.session.user?.id);
  res.render('user/profile', user||undefined);
}

export async function registerUser({ body }:Request, res:Response) {
  try {
    await saveUser(body);
    res.redirectFlash('/auth', {
      registerCompleted: 'Register completed, please login',
    });
  } catch (error:any) {
    if (error.code === 'P2002') {
      res.redirectFlash('/auth/register', {
        message: 'User already exists',
      });
    } else {
      res.redirectFlash('/auth/register', {
        message: error.message,
      });
    }
  }
}

export async function findUsers(_req:Request, res:Response) {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error:any) {
    res.status(501).send({ message: error.message });
  }
}
