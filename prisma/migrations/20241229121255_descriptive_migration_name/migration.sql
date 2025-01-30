-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "image_url" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "category_id" INTEGER,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "subcategory_id" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "category_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "subcategory_id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subcategory_pkey" PRIMARY KEY ("subcategory_id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "Subcategory"("subcategory_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
