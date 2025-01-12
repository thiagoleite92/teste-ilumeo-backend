import { WorkShifts } from '@prisma/client';

export interface WorkShiftInterface {
  findHistoryByEmployeeId(employeeId: number): Promise<WorkShifts[]>;
  registerEmployeeEntryTime({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<WorkShifts>;
  registerEmployeeExitTime({
    workShiftId,
    employeeId,
  }: {
    workShiftId: number;
    employeeId: number;
  }): Promise<WorkShifts>;
  findOpenRegister({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<WorkShifts | null>;
}
