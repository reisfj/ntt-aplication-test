-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "producerRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf_cnpj" TEXT NOT NULL,
    "productor_name" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "total_area_hectare" INTEGER NOT NULL,
    "agricultural_area" INTEGER NOT NULL,
    "vegetation_area" INTEGER NOT NULL,
    "crops_grown" TEXT NOT NULL
);
