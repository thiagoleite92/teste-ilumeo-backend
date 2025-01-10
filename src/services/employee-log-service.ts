import messages from '../errors/messages';
import { ResourceNotFoundError } from '../errors/resource-not-found';
import { EmployeeInterface } from '../repositories/interfaces/employee-interface';
import { WorkShiftInterface } from '../repositories/interfaces/workshift-interface';

export class EmployeeLogService {
  constructor(
    private readonly employeeRepository: EmployeeInterface,
    private readonly workShiftRepository: WorkShiftInterface
  ) {}
  async execute(employeeCode: string) {
    const findEmployee = await this.employeeRepository.findByCode(employeeCode);

    if (!findEmployee) {
      throw new ResourceNotFoundError(messages.employeeNotfound);
    }

    const workShiftHistory =
      await this.workShiftRepository.findHistoryByEmployeeId(findEmployee.id);

    return workShiftHistory;
  }
}
