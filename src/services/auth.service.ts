import { PrismaClient, User } from '@prisma/client';
import { compareSync } from 'bcrypt';

const prisma = new PrismaClient();

export async function validateEmail(email:string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function login(user:User, password:string) {
  return new Promise((resolve, reject) => {
    const compare = compareSync(password, user.password);
    if (compare) {
      resolve(user);
    } else {
      reject(new Error('User or password incorect' ));
    }
  });
}
