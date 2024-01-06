import { Injectable } from '@nestjs/common';
import { ProducerRegistrationDTO } from './dto/create-producer-registration.dto';
import { UpdateModuleDto } from './dto/update-producer-registration.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { cpf as validateCpfCnpj } from 'cpf-cnpj-validator';

@Injectable()
export class ModulesService {

  constructor(private prisma: PrismaService){}

  async create(data: ProducerRegistrationDTO) {

    const isCpfCnpjValid = validateCpfCnpj.isValid(data.cpf_cnpj);

    if (!isCpfCnpjValid) {
      throw new Error('Invalid CPF or CNPJ');
    };


    const registerExists = await this.prisma.producerRegistration.findFirst({
      where: {
        cpf_cnpj: data.cpf_cnpj,
      },
    });

    if (registerExists) {
      throw new Error('Registration already exists');
    }


    // Validação de área total
    if ((data.agricultural_area + data.vegetation_area) > data.total_area_hectare) {
      throw new Error('The sum of agricultural area and vegetation area cannot exceed the total area');
    }

    const makeRegister = await this.prisma.producerRegistration.create({
      data,
    });
    
    return makeRegister;
  }
  
  async getTotalFazendas(): Promise<number> {
    const totalFazendas = await this.prisma.producerRegistration.count();
    return totalFazendas;
  }

  async getTotalAreaHectares(): Promise<number> {
    const allFarms = await this.prisma.producerRegistration.findMany();
    const totalAreaHectares = allFarms.reduce((total, farm) => total + farm.total_area_hectare, 0);
    return totalAreaHectares;
  }

  async getDistinctStates(): Promise<string[]> {
    const distinctStates = await this.prisma.producerRegistration.findMany({
      distinct: ['state'],
      select: {
        state: true,
      },
    });
    return distinctStates.map((item) => item.state);
  }

  async getDistinctCropsGrown(): Promise<string[]> {
    const distinctCropsGrown = await this.prisma.producerRegistration.findMany({
      distinct: ['crops_grown'],
      select: {
        crops_grown: true,
      },
    });
    return distinctCropsGrown.flatMap((item) => item.crops_grown);
  }

  async getTotalAreaDivided(): Promise<{ agriculturalArea: number; vegetationArea: number }> {
    const allFarms = await this.prisma.producerRegistration.findMany({
      select: {
        agricultural_area: true,
        vegetation_area: true,
      },
    });

    const agriculturalArea = allFarms.reduce((total, farm) => total + farm.agricultural_area, 0);
    const vegetationArea = allFarms.reduce((total, farm) => total + farm.vegetation_area, 0);

    return { agriculturalArea, vegetationArea };
  }


  findAll() {
    return this.prisma.producerRegistration.findMany();
  }

  async update(id: string, data: UpdateModuleDto) {
    const registerExists = await this.prisma.producerRegistration.findFirst({
      where: {
        id,
      },
    });

    if (!registerExists) {
      throw new Error('Register does not exists!');
    }

    return await this.prisma.producerRegistration.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    const registerExists = await this.prisma.producerRegistration.findFirst({
      where: {
        id,
      },
    });

    if (!registerExists) {
      throw new Error('Register does not exists!');
    }

    return await this.prisma.producerRegistration.delete({
      where: {
        id,
      },
    });
  }
}
