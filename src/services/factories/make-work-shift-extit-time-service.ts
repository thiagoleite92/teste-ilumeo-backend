import { EmployeeRepository } from '../../repositories/employee-repository';
import { WorkShiftRepository } from '../../repositories/workshift-repository';
import { WorkShiftExitTimeService } from '../work-shift-exit-time-service';

export const makeWorkShiftExitTimeService = () => {
  const workShiftRepository = new WorkShiftRepository();
  const employeeRepository = new EmployeeRepository();

  return new WorkShiftExitTimeService(workShiftRepository, employeeRepository);
};
