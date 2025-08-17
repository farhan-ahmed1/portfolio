-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('LIKE', 'VIEW');

-- CreateTable
CREATE TABLE "interactions" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "ActionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "interactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "interactions_ip_slug_type_key" ON "interactions"("ip", "slug", "type");
