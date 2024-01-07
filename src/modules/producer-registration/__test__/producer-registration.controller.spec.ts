import { ProducerRegistrationController } from '../producer-registration.controller';
import { ProducerRegistrationService } from '../producer-registration.service';
import { PrismaService } from '../../../database/PrismaService';
import { ProducerRegistrationDTO } from '../dto/create-producer-registration.dto';

describe('ProducerRegistrationController', () => {
  let controller: ProducerRegistrationController;
  let service: ProducerRegistrationService;

  beforeEach(() => {
    const prismaService = new PrismaService(); // Instância do serviço do Prisma
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

    jest.spyOn(service, 'create').mockResolvedValue(createData); // Simula o comportamento do service.create()

    const result = await controller.create(createData);

    expect(service.create).toHaveBeenCalledWith(createData); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual(createData); // Verifica se o resultado retornado é o esperado
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

    jest.spyOn(service, 'findAll').mockResolvedValue(mockRegistrations); // Simula o comportamento do service.findAll()

    const result = await controller.findAll();

    expect(service.findAll).toHaveBeenCalled(); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual(mockRegistrations); // Verifica se o resultado retornado é o esperado
  });


  // Teste para o método getTotalFarms()
  it('should return total number of farms', async () => {
    const totalFarms = 10; // Defina o valor esperado de fazendas
    jest.spyOn(service, 'getTotalFarms').mockResolvedValue(totalFarms); // Simula o comportamento do service.getTotalFarms()

    const result = await controller.getTotalFarms();

    expect(service.getTotalFarms).toHaveBeenCalled(); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual({ totalFarms }); // Verifica se o resultado retornado é o esperado
  });

  // Teste para o método getTotalAreaHectares()
  it('should return total area in hectares of all farms', async () => {
    const totalAreaHectares = 500; // Defina o valor esperado da área total em hectares
    jest.spyOn(service, 'getTotalAreaHectares').mockResolvedValue(totalAreaHectares); // Simula o comportamento do service.getTotalAreaHectares()

    const result = await controller.getTotalAreaHectares();

    expect(service.getTotalAreaHectares).toHaveBeenCalled(); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual({ totalAreaHectares }); // Verifica se o resultado retornado é o esperado
  });

  // Teste para o método getStatesData()
  it('should return states and their counts', async () => {
    const statesWithCount = [
      { state: 'State A', count: 10 },
      { state: 'State B', count: 5 },
      // Defina os estados e suas contagens esperadas
    ]; 

    jest.spyOn(service, 'getDistinctStatesWithCount').mockResolvedValue(statesWithCount); // Simula o comportamento do service.getDistinctStatesWithCount()

    const result = await controller.getStatesData();

    expect(service.getDistinctStatesWithCount).toHaveBeenCalled(); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual({ states: statesWithCount }); // Verifica se o resultado retornado é o esperado
  });
  
  // Teste para o método getCropsGrownData()

  it('should return crops grown and their counts', async () => {
    const cropsGrown = [
      { crop: 'Milho', count: 15 },
      { crop: 'Soja', count: 20 },
      // Defina as culturas e suas contagens esperadas
    ]; 

    jest.spyOn(service, 'getDistinctCropsGrownWithCount').mockResolvedValue(cropsGrown); // Simula o comportamento do service.getDistinctCropsGrownWithCount()

    const result = await controller.getCropsGrownData();

    expect(service.getDistinctCropsGrownWithCount).toHaveBeenCalled(); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual({ cropsGrown }); // Verifica se o resultado retornado é o esperado
  });


  // Teste para o método getAreaDivided()
  it('should return agricultural and vegetation areas', async () => {
    const agriculturalArea = 150; // Defina a área agrícola esperada
    const vegetationArea = 100; // Defina a área de vegetação esperada

    jest.spyOn(service, 'getTotalAreaDivided').mockResolvedValue({ agriculturalArea, vegetationArea }); // Simula o comportamento do service.getTotalAreaDivided()

    const result = await controller.getAreaDivided();

    expect(service.getTotalAreaDivided).toHaveBeenCalled(); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual({ agriculturalArea, vegetationArea }); // Verifica se o resultado retornado é o esperado
  });


  // Teste para o método update()
  it('should update a producer registration', async () => {
    const id = '1'; // Defina um ID válido para teste
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

    jest.spyOn(service, 'update').mockResolvedValue(updateData); // Simula o comportamento do service.update()

    const result = await controller.update(id, updateData);

    expect(service.update).toHaveBeenCalledWith(id, updateData); // Verifica se o método do service foi chamado corretamente
    expect(result).toEqual(updateData); // Verifica se o resultado retornado é o esperado
  });


  // Teste para o método delete()
  it('should remove a producer registration', async () => {
    const id = '1'; // Defina um ID válido para teste

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
    expect(result).toEqual(mockProducerRegistration); // Verifica se o resultado retornado é o esperado
  });
});
