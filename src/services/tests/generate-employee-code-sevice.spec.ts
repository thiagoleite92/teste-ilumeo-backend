import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryEmployeeRepository } from '../../repositories/in-memory/in-memory-employee-repository';
import { GenerateEmployeeCodeService } from '../generate-employee-code-sevice';
import { EmployeeInterface } from '../../repositories/interfaces/employee-interface';

let employeeRepository: EmployeeInterface;
let sut: GenerateEmployeeCodeService;

const codePattern = /^[A-Za-z0-9]{6}$/;

describe('Service => generate code employee', () => {
  beforeEach(() => {
    employeeRepository = new InMemoryEmployeeRepository();
    sut = new GenerateEmployeeCodeService(employeeRepository);
  });

  it('should be able to generate a employee code', async () => {
    const employeeCode = await sut.execute();

    expect(employeeCode).toBeDefined();
    expect(employeeCode).toMatch(codePattern);
  });
});
