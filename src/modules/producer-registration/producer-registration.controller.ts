import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProducerRegistrationService } from './producer-registration.service';
import { ProducerRegistrationDTO } from './dto/create-producer-registration.dto';
import { UpdateModuleDto } from './dto/update-producer-registration.dto';

@Controller('modules')
export class ProducerRegistrationController {
  constructor(private readonly modulesService: ProducerRegistrationService) {}

  @Post() // Endpoint para registrar um produtor
  create(@Body() ProducerRegistrationDTO: ProducerRegistrationDTO) {
    return this.modulesService.create(ProducerRegistrationDTO);
  }

  @Get() // Endpoint para obter todos os valores
  findAll() {
    return this.modulesService.findAll();
  }

  @Get('total') // Endpoint para obter a quantidade de fazendas
  async getTotalFarms(): Promise<{ totalFarms: number }> {
    const totalFarms = await this.modulesService.getTotalFarms();
    return { totalFarms }; 
  }

  @Get('total-area-hectares') // Endpoint para receber o total de hectares de todas fazendas
  async getTotalAreaHectares(): Promise<{ totalAreaHectares: number }> {
    const totalAreaHectares = await this.modulesService.getTotalAreaHectares();
    return { totalAreaHectares };
  }

  @Get('states') // Endpoint para obter os estados e o quanto se repetem
  async getStatesData(): Promise<{ states: { state: string; count: number }[] }> {
    const statesWithCount = await this.modulesService.getDistinctStatesWithCount();
    return { states: statesWithCount };
  }


  @Get('crops-grown') // Endpoint para obter culturas plantadas
  async getCropsGrownData(): Promise<{ cropsGrown: { crop: string; count: number }[] }> {
    const cropsGrown = await this.modulesService.getDistinctCropsGrownWithCount();
    return { cropsGrown };
  }


  @Get('area-divided') // Endpoint para obter área dividida entre agricultura e vegetação
  async getAreaDivided(): Promise<{ agriculturalArea: number; vegetationArea: number }> {
    const { agriculturalArea, vegetationArea } = await this.modulesService.getTotalAreaDivided();
    return { agriculturalArea, vegetationArea };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}
