import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ProducerRegistrationDTO } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.modulesService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modulesService.remove(id);
  }
}
