import { EmployeeRepository } from '../../repositories/employee-repository';
import { WorkShiftRepository } from '../../repositories/workshift-repository';
import { WorkShiftEntryTimeService } from '../work-shift-entry-time-service';

export const makeWorkShiftEntryService = () => {
  const workShiftRepository = new WorkShiftRepository();
  const employeeRepository = new EmployeeRepository();

  return new WorkShiftEntryTimeService(workShiftRepository, employeeRepository);
};
