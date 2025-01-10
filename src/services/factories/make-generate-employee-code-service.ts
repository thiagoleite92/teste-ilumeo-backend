import { EmployeeRepository } from '../../repositories/employee-repository';
import { GenerateEmployeeCodeService } from '../generate-employee-code-sevice';

export const makeGenerateEmployeeCodeService = () => {
  const employeeRepository = new EmployeeRepository();

  return new GenerateEmployeeCodeService(employeeRepository);
};
