import { beforeEach, describe, expect, it } from 'vitest';
import { EmployeeInterface } from '../../repositories/interfaces/employee-interface';
import { ResourceNotFoundError } from '../../errors/resource-not-found';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';
import { InMemoryWorkShiftRepository } from '../../repositories/in-memory/in-memory-work-shfit-repository';
import { WorkShiftInterface } from '../../repositories/interfaces/workshift-interface';
import { WorkShiftEntryTimeService } from '../work-shift-entry-time-service';
import { OpenRegisterError } from '../../errors/open-register';

let employeeRepository: EmployeeInterface;
let workShiftRepository: WorkShiftInterface;
let sut: WorkShiftEntryTimeService;
describe('Service => work shit entry', () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    workShiftRepository = new InMemoryWorkShiftRepository();
    sut = new WorkShiftEntryTimeService(
      workShiftRepository,
      employeeRepository
    );
  });

  it('should throw an error => ResourceNotFound with not existing employeeCode', async () => {
    await expect(() => sut.execute('randomCode')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it('should be able to register an entry time', async () => {
    const code = '123abc';

    await employeeRepository.generateEmployeeCode(code);

    await sut.execute(code);

    const history = await employeeRepository.findByCode(code);

    expect([history]).toHaveLength(1);
  });

  it('shoulde throw an error => OpenRegisterError with a register already open', async () => {
    const code = '123abc';

    await employeeRepository.generateEmployeeCode(code);

    const employee = await employeeRepository.findByCode(code);

    await workShiftRepository.registerEmployeeEntryTime({
      employeeId: employee!.id,
    });

    await expect(() => sut.execute(code)).rejects.toBeInstanceOf(
      OpenRegisterError
    );
  });
});
