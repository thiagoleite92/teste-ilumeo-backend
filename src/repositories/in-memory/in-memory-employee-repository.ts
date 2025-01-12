import { Employees } from '@prisma/client';
import { EmployeeInterface } from '../interfaces/employee-interface';

export class InMemoryEmployeeRepository implements EmployeeInterface {
  public id: number = 1;

  public items: Employees[] = [];
  async findByCode(employeeCode: string): Promise<Employees | null> {
    const findEmployee = this.items.find(
      (item) => item.employeeCode === employeeCode
    );

    return findEmployee ? findEmployee : null;
  }

  async generateEmployeeCode(employeeCode: string): Promise<Employees> {
    this.items.push({
      id: this.id,
      employeeCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.items[this.items.length - 1];
  }

  async getAllEmployeeCodes(): Promise<Employees[]> {
    return this.items;
  }
}
