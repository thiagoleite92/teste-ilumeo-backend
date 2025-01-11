import { EmployeeInterface } from '../repositories/interfaces/employee-interface';

export class EmployeeCodeListService {
  constructor(private readonly employeeRepository: EmployeeInterface) {}
  async execute() {
    return this.employeeRepository.getAllEmployeeCodes();
  }
}
