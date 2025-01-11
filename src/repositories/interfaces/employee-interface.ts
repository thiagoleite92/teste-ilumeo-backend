import { Employees } from '@prisma/client';

export interface EmployeeInterface {
  findByCode(employeeCode: string): Promise<Employees | null>;
  generateEmployeeCode(employeeCode: string): Promise<Employees>;
  getAllEmployeeCodes(): Promise<Employees[]>;
}
