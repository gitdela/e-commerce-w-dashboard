// after running yarn prisma init, we created this file
// i think it's just instantiated here to be able to use it in the app

import { PrismaClient } from '@prisma/client';

// adding prisma to global scope
declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb; // this is to prevent prisma from being re-instantiated in development by nextjs

export default prismadb;
