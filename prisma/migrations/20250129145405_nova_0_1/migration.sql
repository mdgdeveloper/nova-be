/*
  Warnings:

  - The `role` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `cost` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `cost` on the `Service` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the column `transaction_time` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `TransactionProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Made the column `phone_number` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pin` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_category_id_fkey";

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "phone_number" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "RoleName",
ALTER COLUMN "pin" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "subcategory_id" INTEGER,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "cost" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "cost" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transaction_time",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TransactionProduct" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
