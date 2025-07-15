/*
  Warnings:

  - You are about to drop the column `country` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `area` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "country",
DROP COLUMN "street",
DROP COLUMN "zip",
ADD COLUMN     "area" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "pincode" TEXT NOT NULL;
