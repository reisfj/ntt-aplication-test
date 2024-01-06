-- CreateTable
CREATE TABLE "producerRegistration" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "productor_name" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area_hectare" INTEGER NOT NULL,
    "agricultural_area" INTEGER NOT NULL,
    "vegetation_area" INTEGER NOT NULL,
    "crops_grown" TEXT[],

    CONSTRAINT "producerRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producerRegistration_cpf_cnpj_key" ON "producerRegistration"("cpf_cnpj");
