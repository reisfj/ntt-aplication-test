import { Injectable } from '@nestjs/common';
import { ProducerRegistrationDTO } from './dto/create-producer-registration.dto';
import { UpdateProducerRegistrationDto } from './dto/update-producer-registration.dto';
import { PrismaService } from '../../database/PrismaService';
import { CpfCnpjValidator } from '../../CpfCnpjValidator';

@Injectable()
export class ProducerRegistrationService {
  private cpfCnpjValidator: CpfCnpjValidator;

  constructor(private prisma: PrismaService) {
    this.cpfCnpjValidator = new CpfCnpjValidator();
  }

  async create(data: ProducerRegistrationDTO) { 
    const isCpfCnpjValid = this.cpfCnpjValidator.isValid(data.cpf_cnpj);

    if (!isCpfCnpjValid) {
      throw new Error('Invalid CPF or CNPJ');
    }


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
  
  async getTotalFarms(): Promise<number> { 
    const totalFarms = await this.prisma.producerRegistration.count();
    return totalFarms;
  }

  async getTotalAreaHectares(): Promise<number> {
    const allFarms = await this.prisma.producerRegistration.findMany();
    const totalAreaHectares = allFarms.reduce((total, farm) => total + farm.total_area_hectare, 0);
    return totalAreaHectares;
  }

  async getDistinctStatesWithCount(): Promise<{ state: string; count: number }[]> {
    const allProducerRegistrations = await this.prisma.producerRegistration.findMany();
    
    const stateCountsMap: { [key: string]: number } = {};
  
    // Contagem manual das ocorrências de cada estado
    allProducerRegistrations.forEach((registration) => {
      const state = registration.state;
      if (stateCountsMap[state]) {
        stateCountsMap[state] += 1;
      } else {
        stateCountsMap[state] = 1;
      }
    });
  
    // Convertendo o mapa para o formato desejado
    const distinctStatesWithCount: { state: string; count: number }[] = [];
    for (const state in stateCountsMap) {
      distinctStatesWithCount.push({ state, count: stateCountsMap[state] });
    }
  
    return distinctStatesWithCount;
  }
  

  async getDistinctCropsGrownWithCount(): Promise<{ crop: string; count: number }[]> { 
    const allProducerRegistrations = await this.prisma.producerRegistration.findMany();
  
    const cropsCountMap: { [key: string]: number } = {};
  
    allProducerRegistrations.forEach((registration) => {
      const crops = registration.crops_grown;
      crops.forEach((crop) => {
        if (cropsCountMap[crop]) {
          cropsCountMap[crop] += 1;
        } else {
          cropsCountMap[crop] = 1;
        }
      });
    });
  
    const distinctCropsWithCount: { crop: string; count: number }[] = [];
    for (const crop in cropsCountMap) {
      distinctCropsWithCount.push({ crop, count: cropsCountMap[crop] });
    }
  
    return distinctCropsWithCount;
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

  async update(id: string, data: UpdateProducerRegistrationDto) {
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
