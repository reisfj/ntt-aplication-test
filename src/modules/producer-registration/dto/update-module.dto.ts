import { PartialType } from '@nestjs/mapped-types';
import { ProducerRegistrationDTO } from './create-module.dto';

export class UpdateModuleDto extends PartialType(
  class ProducerRegistrationDTO implements Partial<ProducerRegistrationDTO> {
    id?: string;
    cpf_cnpj: string;
    productor_name: string;
    farm_name: string;
    city: string;
    state: string;
    total_area_hectare: number;
    agricultural_area: number;
    vegetation_area: number;
    crops_grown: string;
  }
) {}