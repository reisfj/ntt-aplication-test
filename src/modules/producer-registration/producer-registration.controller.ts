import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProducerRegistrationService } from './producer-registration.service';
import { ProducerRegistrationDTO } from './dto/create-producer-registration.dto';
import { UpdateProducerRegistrationDto } from './dto/update-producer-registration.dto';

@Controller('ProducerRegistration')
export class ProducerRegistrationController {
  constructor(private readonly ProducerRegistrationService: ProducerRegistrationService) {}

  @Post() // Endpoint para registrar um produtor
  create(@Body() ProducerRegistrationDTO: ProducerRegistrationDTO) {
    return this.ProducerRegistrationService.create(ProducerRegistrationDTO);
  }

  @Get() // Endpoint para obter todos os valores
  findAll() {
    return this.ProducerRegistrationService.findAll();
  }

  @Get('total-farms') // Endpoint para obter a quantidade de fazendas
  async getTotalFarms(): Promise<{ totalFarms: number }> {
    const totalFarms = await this.ProducerRegistrationService.getTotalFarms();
    return { totalFarms }; 
  }

  @Get('total-area-hectares') // Endpoint para receber o total de hectares de todas fazendas
  async getTotalAreaHectares(): Promise<{ totalAreaHectares: number }> {
    const totalAreaHectares = await this.ProducerRegistrationService.getTotalAreaHectares();
    return { totalAreaHectares };
  }

  @Get('states') // Endpoint para obter os estados e o quanto se repetem
  async getStatesData(): Promise<{ states: { state: string; count: number }[] }> {
    const statesWithCount = await this.ProducerRegistrationService.getDistinctStatesWithCount();
    return { states: statesWithCount };
  }


  @Get('crops-grown') // Endpoint para obter culturas plantadas
  async getCropsGrownData(): Promise<{ cropsGrown: { crop: string; count: number }[] }> {
    const cropsGrown = await this.ProducerRegistrationService.getDistinctCropsGrownWithCount();
    return { cropsGrown };
  }


  @Get('area-divided') // Endpoint para obter área dividida entre agricultura e vegetação
  async getAreaDivided(): Promise<{ agriculturalArea: number; vegetationArea: number }> {
    const { agriculturalArea, vegetationArea } = await this.ProducerRegistrationService.getTotalAreaDivided();
    return { agriculturalArea, vegetationArea };
  }

  @Put(':id') // Endpoint para atualizar valores
  update(@Param('id') id: string, @Body() UpdateProducerRegistrationDto: UpdateProducerRegistrationDto) {
    return this.ProducerRegistrationService.update(id, UpdateProducerRegistrationDto);
  }

  @Delete(':id') // Endpoint para deletar valores
  remove(@Param('id') id: string) {
    return this.ProducerRegistrationService.remove(id);
  }
}
