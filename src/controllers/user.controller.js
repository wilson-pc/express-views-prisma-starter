import { saveUser, getUserById, getUsers } from '../services';

export async function getProfile(req, res) {
  const user = await getUserById(req.session.user.id);
  res.render('user/profile', user);
}

export async function registerUser({ body }, res) {
  try {
    await saveUser(body);
    res.redirectFlash('/auth', {
      registerCompleted: 'Register completed, please login',
    });
  } catch (error) {
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

export async function findUsers(req, res) {
  try {
    const users = await getUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(501).send({ message: error.message });
  }
}
