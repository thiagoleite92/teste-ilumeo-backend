import { prisma } from '../lib/prisma';
import { EmployeeInterface } from './interfaces/employee-interface';

export class EmployeeRepository implements EmployeeInterface {
  async findByCode(employeeCode: string) {
    return await prisma.employees.findUnique({ where: { employeeCode } });
  }

  async generateEmployeeCode(employeeCode: string): Promise<void> {
    await prisma.employees.create({
      data: {
        employeeCode,
      },
    });
  }
}
