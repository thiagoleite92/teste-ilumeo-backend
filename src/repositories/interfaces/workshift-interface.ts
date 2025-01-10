import { WorkShifts } from '@prisma/client';

export interface WorkShiftInterface {
  findHistoryByEmployeeId(employeeId: number): Promise<WorkShifts[]>;
  registerEmployeeEntryTime({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<void>;
  registerEmployeeExitTime({
    workShiftId,
    employeeId,
  }: {
    workShiftId: number;
    employeeId: number;
  }): Promise<void>;
  findOpenRegister({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<WorkShifts | null>;
}
