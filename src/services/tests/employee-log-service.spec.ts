import { beforeEach, describe, expect, it } from 'vitest';
import { EmployeeInterface } from '../../repositories/interfaces/employee-interface';
import { ResourceNotFoundError } from '../../errors/resource-not-found';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';
import { InMemoryWorkShiftRepository } from '../../repositories/in-memory/in-memory-work-shfit-repository';
import { WorkShiftInterface } from '../../repositories/interfaces/workshift-interface';
import { EmployeeLogService } from '../employee-log-service';

let employeeRepository: EmployeeInterface;
let workShiftRepository: WorkShiftInterface;
let sut: EmployeeLogService;
describe('Service => employee history', () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    workShiftRepository = new InMemoryWorkShiftRepository();
    sut = new EmployeeLogService(employeeRepository, workShiftRepository);
  });

  it('shoulde throw an error => ResourceNotFound with not existing employeeCode', async () => {
    await expect(() => sut.execute('randomCode')).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });

  it('should return an empty array when no history exists for a given employeeCode', async () => {
    const employeeCode = await employeeRepository.generateEmployeeCode();

    const history = await sut.execute(employeeCode);

    expect(history).toHaveLength(0);
  });

  it('should return a arry with history for a given employeeCode', async () => {
    const employeeCode = await employeeRepository.generateEmployeeCode();

    const employee = await employeeRepository.findByCode(employeeCode);

    workShiftRepository.registerEmployeeEntryTime({ employeeId: employee!.id });
    workShiftRepository.registerEmployeeEntryTime({ employeeId: employee!.id });
    workShiftRepository.registerEmployeeEntryTime({ employeeId: employee!.id });

    const history = await sut.execute(employeeCode);

    expect(history).toHaveLength(3);
  });
});
