import { prisma } from '../lib/prisma';
import { generateCode } from '../utils/generateCode';
import { EmployeeInterface } from './interfaces/employee-interface';

export class EmployeeRepository implements EmployeeInterface {
  async findByCode(employeeCode: string) {
    return await prisma.employees.findUnique({ where: { employeeCode } });
  }

  async generateEmployeeCode(): Promise<string> {
    const employeeCode = generateCode();

    await prisma.employees.create({
      data: {
        employeeCode,
      },
    });

    return employeeCode;
  }
}
