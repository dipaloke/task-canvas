import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

//prevents prisma from initiating new prismaClient() every time we hot reload. checks db variable is stored in globalthis.prisma
export const db = globalThis.prisma || new PrismaClient();

//if we are in development, assigning db constant to globalthis.prisma
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
