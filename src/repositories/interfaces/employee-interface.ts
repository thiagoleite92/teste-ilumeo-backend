import { Employees } from '@prisma/client';

export interface EmployeeInterface {
  findByCode(employeeCode: string): Promise<Employees | null>;
  generateEmployeeCode(): Promise<string>;
}
