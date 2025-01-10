import { EmployeeInterface } from '../repositories/interfaces/employee-interface';
import { generateCode } from '../utils/generateCode';

export class GenerateEmployeeCodeService {
  constructor(private readonly employeeRepository: EmployeeInterface) {}

  async execute() {
    let employeeCode: string = '';
    let isUnique = false;

    while (!isUnique) {
      employeeCode = generateCode();
      const findEmployee = await this.employeeRepository.findByCode(
        employeeCode
      );

      if (!findEmployee) {
        isUnique = true;
      }
    }

    await this.employeeRepository.generateEmployeeCode(employeeCode);
  }
}
