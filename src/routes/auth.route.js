import express from 'express';
import { validator } from '../middlewares';
import { loginUser, logout } from '../controllers';
import { loginDto } from '../dto';

const router = express.Router();

router.post('/login', validator(loginDto), loginUser);
router.get('/logout', logout);

router.get('/', async (req, res) => {
  res.render('auth/index');
});

router.get('/register', async (req, res) => {
  res.render('auth/register');
});

export default router;
