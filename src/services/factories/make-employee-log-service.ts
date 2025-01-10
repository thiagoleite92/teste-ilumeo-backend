import { EmployeeRepository } from '../../repositories/employee-repository';
import { WorkShiftRepository } from '../../repositories/workshift-repository';
import { EmployeeLogService } from '../employee-log-service';

export const makeEmployeeLogService = () => {
  const workShiftRepository = new WorkShiftRepository();
  const employeeRepository = new EmployeeRepository();

  return new EmployeeLogService(employeeRepository, workShiftRepository);
};
