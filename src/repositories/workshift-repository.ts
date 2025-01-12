import { WorkShifts } from '@prisma/client';
import { WorkShiftInterface } from './interfaces/workshift-interface';
import { prisma } from '../lib/prisma';

export class WorkShiftRepository implements WorkShiftInterface {
  async findHistoryByEmployeeId(employeeId: number): Promise<WorkShifts[]> {
    return prisma.workShifts.findMany({ where: { employeeId: employeeId } });
  }

  async registerEmployeeEntryTime({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<WorkShifts> {
    return prisma.workShifts.create({
      data: {
        employeeId,
        entryTime: new Date(),
        exitTime: null,
      },
    });
  }

  async registerEmployeeExitTime({
    workShiftId,
    employeeId,
  }: {
    workShiftId: number;
    employeeId: number;
  }): Promise<WorkShifts> {
    return prisma.workShifts.update({
      where: { id: workShiftId, employeeId },
      data: {
        exitTime: new Date(),
      },
    });
  }

  async findOpenRegister({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<WorkShifts | null> {
    const openRegister = await prisma.workShifts.findFirst({
      where: { employeeId, exitTime: { equals: null } },
    });

    if (!openRegister) {
      return null;
    }

    return openRegister;
  }
}
