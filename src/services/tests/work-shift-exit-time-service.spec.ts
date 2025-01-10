import { beforeEach, describe, expect, it } from 'vitest';
import { EmployeeInterface } from '../../repositories/interfaces/employee-interface';
import { ResourceNotFoundError } from '../../errors/resource-not-found';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';
import { InMemoryWorkShiftRepository } from '../../repositories/in-memory/in-memory-work-shfit-repository';
import { WorkShiftInterface } from '../../repositories/interfaces/workshift-interface';
import { WorkShiftExitTimeService } from '../work-shift-exit-time-service';

let employeeRepository: EmployeeInterface;
let workShiftRepository: WorkShiftInterface;
let sut: WorkShiftExitTimeService;
describe('Service => work shit exit', () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    workShiftRepository = new InMemoryWorkShiftRepository();
    sut = new WorkShiftExitTimeService(workShiftRepository, employeeRepository);
  });

  it('should throw an error => ResourceNotFound with not existing employeeCode', async () => {
    await expect(() => sut.execute('randomCode')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it('should throw an error => ResourceNotFound with no open register', async () => {
    const code = '123acb';

    await employeeRepository.generateEmployeeCode(code);

    const employee = await employeeRepository.findByCode(code);

    await workShiftRepository.registerEmployeeEntryTime({
      employeeId: employee!.id,
    });

    const openRegister = await workShiftRepository.findOpenRegister({
      employeeId: employee!.id,
    });

    await workShiftRepository.registerEmployeeExitTime({
      employeeId: employee!.id,
      workShiftId: openRegister!.id,
    });

    await expect(() => sut.execute(code)).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it('should be able to register exit', async () => {
    const code = '123acb';

    await employeeRepository.generateEmployeeCode(code);

    const employee = await employeeRepository.findByCode(code);

    await workShiftRepository.registerEmployeeEntryTime({
      employeeId: employee!.id,
    });

    const register = await workShiftRepository.findOpenRegister({
      employeeId: employee!.id,
    });

    expect(register?.exitTime).toBeNull();

    await sut.execute(code);

    expect(register?.exitTime).not.toBeNull();
  });
});
