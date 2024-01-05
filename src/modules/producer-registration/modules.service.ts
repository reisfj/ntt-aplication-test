import { Injectable } from '@nestjs/common';
import { ProducerRegistrationDTO } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
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

    const makeRegister = await this.prisma.producerRegistration.create({
      data,
    });
    
    return makeRegister;
  }
  
  findAll() {
    return this.prisma.producerRegistration.findMany();
  }

  // findOne(id: number) {
  //   return "teste";
  // }

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
