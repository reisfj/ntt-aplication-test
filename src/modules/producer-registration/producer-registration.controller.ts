import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ModulesService } from './producer-registration.service';
import { ProducerRegistrationDTO } from './dto/create-producer-registration.dto';
import { UpdateModuleDto } from './dto/update-producer-registration.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() ProducerRegistrationDTO: ProducerRegistrationDTO) {
    return this.modulesService.create(ProducerRegistrationDTO);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get('total')
  async getTotalFazendas(): Promise<{ totalFazendas: number }> {
    const totalFazendas = await this.modulesService.getTotalFazendas();
    return { totalFazendas }; 
  }

  @Get('total-area-hectares')
  async getTotalAreaHectares(): Promise<{ totalAreaHectares: number }> {
    const totalAreaHectares = await this.modulesService.getTotalAreaHectares();
    return { totalAreaHectares };
  }

  @Get('states') // Endpoint para obter estados
  async getStatesData(): Promise<{ states: string[] }> {
    const states = await this.modulesService.getDistinctStates();
    return { states };
  }


  @Get('crops-grown') // Endpoint para obter culturas plantadas
  async getCropsGrownData(): Promise<{ cropsGrown: string[] }> {
    const cropsGrown = await this.modulesService.getDistinctCropsGrown();
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
