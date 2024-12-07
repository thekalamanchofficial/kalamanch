import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (!prisma) {
  throw new Error("Prisma client not found");
}
export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
