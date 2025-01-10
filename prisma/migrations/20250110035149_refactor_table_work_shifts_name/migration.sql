/*
  Warnings:

  - You are about to drop the `work_shifts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "work_shifts" DROP CONSTRAINT "work_shifts_employee_id_fkey";

-- DropTable
DROP TABLE "work_shifts";

-- CreateTable
CREATE TABLE "table_work_shifts" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "entry_time" TIMESTAMP(3) NOT NULL,
    "exit_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "table_work_shifts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "table_work_shifts" ADD CONSTRAINT "table_work_shifts_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "table_employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
