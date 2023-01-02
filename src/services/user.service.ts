import { PrismaClient, User } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export async function saveUser(data: User) {
  const hash = hashSync(data.password, Number(process.env.SALT));
  data.password = hash;
  return prisma.user.create({
    data,
    select: { id: true, email: true, name: true },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true },
  });
}

export async function getUsers() {
  return prisma.user.findMany({
    select: { id: true, email: true, name: true },
  });
}
