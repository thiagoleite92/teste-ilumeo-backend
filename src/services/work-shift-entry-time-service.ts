import messages from '@errors/messages';
import { OpenRegisterError } from '@errors/open-register';
import { ResourceNotFoundError } from '@errors/resource-not-found';
import { EmployeeInterface } from '@repositories/interfaces/employee-interface';
import { WorkShiftInterface } from '@repositories/interfaces/workshift-interface';

export class WorkShiftEntryTimeService {
  constructor(
    private readonly workShiftRepository: WorkShiftInterface,
    private readonly employeeRepository: EmployeeInterface
  ) {}

  async execute(employeeCode: string) {
    const employee = await this.employeeRepository.findByCode(employeeCode);

    if (!employee) {
      throw new ResourceNotFoundError(messages.employeeNotfound);
    }

    const { id: employeeId } = employee;

    const openRegister = await this.workShiftRepository.findOpenRegister({
      employeeId,
    });

    if (openRegister) {
      throw new OpenRegisterError(messages.openRegisterError);
    }

    await this.workShiftRepository.registerEmployeeEntryTime({ employeeId });
  }
}
