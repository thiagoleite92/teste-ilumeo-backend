import { Employees } from '@prisma/client';
import { EmployeeInterface } from '../interfaces/employee-interface';
import { generateCode } from '../../utils/generateCode';

export class InMemoryEmployeeRepository implements EmployeeInterface {
  public id: number = 1;

  public items: Employees[] = [];
  async findByCode(employeeCode: string): Promise<Employees | null> {
    const findEmployee = this.items.find(
      (item) => item.employeeCode === employeeCode
    );

    return findEmployee ? findEmployee : null;
  }

  async generateEmployeeCode(): Promise<string> {
    const employeeCode = generateCode();

    this.items.push({
      id: this.id,
      employeeCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return employeeCode;
  }
}
