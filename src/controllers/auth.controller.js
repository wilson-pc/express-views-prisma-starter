import { validateEmail, login } from '../services';

export async function loginUser({ body, session }, res) {
  try {
    const { email, password } = body;
    const user = await validateEmail(email);
    if (user) {
      login(user, password)
        .then(() => {
          session.user = { id: user.id, email: user.email, name: user.name };
          if (body.rememberMe) {
            session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; // 7 days
          } else {
            session.cookie.expires = false;
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
  } catch (error) {
    res.redirectFlash('/auth/', {
      message: error.message,
    });
  }
}

export async function logout({ session }, res) {
  session.destroy();
  res.redirect('/');
}
