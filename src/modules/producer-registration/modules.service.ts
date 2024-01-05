import { Injectable } from '@nestjs/common';
import { ProducerRegistrationDTO } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ModulesService {

  constructor(private prisma: PrismaService){}

  async create(data: ProducerRegistrationDTO) {
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
    return `This action returns all modules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
