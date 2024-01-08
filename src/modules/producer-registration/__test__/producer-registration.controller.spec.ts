import { ProducerRegistrationController } from '../producer-registration.controller';
import { ProducerRegistrationService } from '../producer-registration.service';
import { PrismaService } from '../../../database/PrismaService';
import { ProducerRegistrationDTO } from '../dto/create-producer-registration.dto';

describe('ProducerRegistrationController', () => {
  let controller: ProducerRegistrationController;
  let service: ProducerRegistrationService;

  beforeEach(() => {
    const prismaService = new PrismaService();  
    service = new ProducerRegistrationService(prismaService);
    controller = new ProducerRegistrationController(service);
  });

  // Teste para o método create()
  it('should create a new producer registration', async () => {
    const createData: ProducerRegistrationDTO = {
        id: '1',
        cpf_cnpj: '216.650.700-05',
        productor_name: 'Produtor',
        farm_name: 'Fazenda',
        city: 'Cidade',
        state: 'Estado',
        total_area_hectare: 100,
        agricultural_area: 50,
        vegetation_area: 50,
        crops_grown: ['Milho', 'Soja'],
    };

    jest.spyOn(service, 'create').mockResolvedValue(createData); 

    const result = await controller.create(createData);

    expect(service.create).toHaveBeenCalledWith(createData); 
    expect(result).toEqual(createData); 
  });


  // Teste para o método findAll()
  it('should return all producer registrations', async () => {
    const mockRegistrations = [
        { 
            id: '1',
            cpf_cnpj: '216.650.700-05',
            productor_name: 'Produtor',
            farm_name: 'Fazenda',
            city: 'Cidade',
            state: 'Estado',
            total_area_hectare: 100,
            agricultural_area: 50,
            vegetation_area: 50,
            crops_grown: ['Milho', 'Soja'],
          }
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(mockRegistrations); 

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled(); 
    expect(result).toEqual(mockRegistrations); 
  });


  // Teste para o método getTotalFarms()
  it('should return total number of farms', async () => {
    const totalFarms = 10; 
    jest.spyOn(service, 'getTotalFarms').mockResolvedValue(totalFarms); 

    const result = await controller.getTotalFarms();

    expect(service.getTotalFarms).toHaveBeenCalled(); 
    expect(result).toEqual({ totalFarms }); 
  });

  // Teste para o método getTotalAreaHectares()
  it('should return total area in hectares of all farms', async () => {
    const totalAreaHectares = 500; 
    jest.spyOn(service, 'getTotalAreaHectares').mockResolvedValue(totalAreaHectares); 

    const result = await controller.getTotalAreaHectares();

    expect(service.getTotalAreaHectares).toHaveBeenCalled(); 
    expect(result).toEqual({ totalAreaHectares }); 
  });

  // Teste para o método getStatesData()
  it('should return states and their counts', async () => {
    const statesWithCount = [
      { state: 'State A', count: 10 },
      { state: 'State B', count: 5 },
      
    ]; 

    jest.spyOn(service, 'getDistinctStatesWithCount').mockResolvedValue(statesWithCount); 

    const result = await controller.getStatesData();

    expect(service.getDistinctStatesWithCount).toHaveBeenCalled(); 
    expect(result).toEqual({ states: statesWithCount }); 
  });
  
  // Teste para o método getCropsGrownData()
  it('should return crops grown and their counts', async () => {
    const cropsGrown = [
      { crop: 'Milho', count: 15 },
      { crop: 'Soja', count: 20 },
      
    ]; 

    jest.spyOn(service, 'getDistinctCropsGrownWithCount').mockResolvedValue(cropsGrown); 

    const result = await controller.getCropsGrownData();

    expect(service.getDistinctCropsGrownWithCount).toHaveBeenCalled(); 
    expect(result).toEqual({ cropsGrown }); 
  });


  // Teste para o método getAreaDivided()
  it('should return agricultural and vegetation areas', async () => {
    const agriculturalArea = 150; 
    const vegetationArea = 100; 

    jest.spyOn(service, 'getTotalAreaDivided').mockResolvedValue({ agriculturalArea, vegetationArea }); 

    const result = await controller.getAreaDivided();

    expect(service.getTotalAreaDivided).toHaveBeenCalled(); 
    expect(result).toEqual({ agriculturalArea, vegetationArea }); 
  });


  // Teste para o método update()
  it('should update a producer registration', async () => {
    const id = '1'; 
    const updateData = {
        id: '1',
        cpf_cnpj: '216.650.700-05',
        productor_name: 'Produtor',
        farm_name: 'Fazenda',
        city: 'Cidade',
        state: 'Estado',
        total_area_hectare: 100,
        agricultural_area: 50,
        vegetation_area: 50,
        crops_grown: ['Milho', 'Soja'],
    };

    jest.spyOn(service, 'update').mockResolvedValue(updateData); 

    const result = await controller.update(id, updateData);

    expect(service.update).toHaveBeenCalledWith(id, updateData); 
    expect(result).toEqual(updateData); 
  });


  // Teste para o método delete()
  it('should remove a producer registration', async () => {
    const id = '1'; 

    const mockProducerRegistration = {
      id,
      cpf_cnpj: '216.650.700-05',
      productor_name: 'Produtor',
      farm_name: 'Fazenda',
      city: 'Cidade',
      state: 'Estado',
      total_area_hectare: 100,
      agricultural_area: 50,
      vegetation_area: 50,
      crops_grown: ['Milho', 'Soja'],
    };

    jest.spyOn(service, 'remove').mockResolvedValue(mockProducerRegistration);

    const result = await controller.remove(id);

    expect(service.remove).toHaveBeenCalledWith(id);
    expect(result).toEqual(mockProducerRegistration); 
  });
});
