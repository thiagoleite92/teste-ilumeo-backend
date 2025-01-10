import messages from '../errors/messages';
import { ResourceNotFoundError } from '../errors/resource-not-found';
import { EmployeeInterface } from '../repositories/interfaces/employee-interface';
import { WorkShiftInterface } from '../repositories/interfaces/workshift-interface';

export class WorkShiftExitTimeService {
  constructor(
    private readonly workShiftRepository: WorkShiftInterface,
    private readonly employeeRepository: EmployeeInterface
  ) {}

  async execute(employeeCode: string) {
    const employee = await this.employeeRepository.findByCode(employeeCode);

    if (!employee) {
      throw new ResourceNotFoundError(messages.employeeNotfound);
    }

    const { id } = employee;

    const openRegister = await this.workShiftRepository.findOpenRegister({
      employeeId: id,
    });

    if (!openRegister) {
      throw new ResourceNotFoundError(messages.registerOpenNotFound);
    }

    await this.workShiftRepository.registerEmployeeExitTime({
      employeeId: id,
      workShiftId: openRegister.id,
    });
  }
}
