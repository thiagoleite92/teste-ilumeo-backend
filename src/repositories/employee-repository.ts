import { Employees } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { EmployeeInterface } from './interfaces/employee-interface';

export class EmployeeRepository implements EmployeeInterface {
  async getAllEmployeeCodes(): Promise<Employees[]> {
    return prisma.employees.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
  async findByCode(employeeCode: string) {
    return await prisma.employees.findUnique({ where: { employeeCode } });
  }

  async generateEmployeeCode(employeeCode: string): Promise<Employees> {
    return prisma.employees.create({
      data: {
        employeeCode,
      },
    });
  }
}
