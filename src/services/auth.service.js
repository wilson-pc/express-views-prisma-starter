import { PrismaClient } from '@prisma/client';
import { compareSync } from 'bcrypt';

const prisma = new PrismaClient();

export async function validateEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function login(user, password) {
  return new Promise((resolve, reject) => {
    const compare = compareSync(password, user.password);
    if (compare) {
      resolve(user);
    } else {
      reject(new Error({ message: 'User or password incorect' }));
    }
  });
}
