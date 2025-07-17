-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "paymentType" TEXT NOT NULL DEFAULT 'COD';
