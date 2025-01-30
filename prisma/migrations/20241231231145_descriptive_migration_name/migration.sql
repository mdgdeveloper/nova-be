/*
  Warnings:

  - A unique constraint covering the columns `[pin]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "pin" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_pin_key" ON "Employee"("pin");
