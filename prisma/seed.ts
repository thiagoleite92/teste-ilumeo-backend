import { PrismaClient } from '@prisma/client';
import { generateCode } from '../src/utils/generateCode';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.employees.create({
    data: {
      employeeCode: generateCode(),
    },
  });
};

main();
