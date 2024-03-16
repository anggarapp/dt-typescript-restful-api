/*
  Warnings:

  - You are about to drop the column `strreet` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `strreet`,
    ADD COLUMN `street` VARCHAR(255) NULL;
