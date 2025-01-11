import { EmployeeRepository } from '../../repositories/employee-repository';
import { EmployeeCodeListService } from '../employee-code-list-service';

export const makeEmployeeCodeListService = () => {
  const employeeRepository = new EmployeeRepository();

  return new EmployeeCodeListService(employeeRepository);
};
