import { WorkShifts } from '@prisma/client';
import { WorkShiftInterface } from '../interfaces/workshift-interface';

export class InMemoryWorkShiftRepository implements WorkShiftInterface {
  public items: WorkShifts[] = [];
  private id: number = 1;
  async findHistoryByEmployeeId(employeeId: number): Promise<WorkShifts[]> {
    return this.items.filter((item) => item.employeeId === employeeId);
  }
  async registerEmployeeEntryTime({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<WorkShifts> {
    const index = this.items.push({
      id: this.id,
      createdAt: new Date(),
      employeeId,
      exitTime: null,
      entryTime: new Date(),
      updatedAt: new Date(),
    });

    this.id += 1;
    return this.items[index];
  }
  async registerEmployeeExitTime({
    workShiftId,
    employeeId,
  }: {
    workShiftId: number;
    employeeId: number;
  }): Promise<WorkShifts> {
    this.items.find(
      (item) => item.id === workShiftId && employeeId === item.employeeId
    )!.exitTime = new Date();

    return this.items.find((item) => item.id === workShiftId)!;
  }
  async findOpenRegister({
    employeeId,
  }: {
    employeeId: number;
  }): Promise<WorkShifts | null> {
    return (
      this.items.find(
        (item) => item.employeeId === employeeId && item.exitTime === null
      ) ?? null
    );
  }
}
