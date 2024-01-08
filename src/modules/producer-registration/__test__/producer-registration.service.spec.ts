import { ProducerRegistrationService } from '../producer-registration.service';
import { ProducerRegistrationDTO } from '../dto/create-producer-registration.dto';
import { PrismaService } from '../../../database/PrismaService';
import { CpfCnpjValidator } from '../../../CpfCnpjValidator';


class PrismaServiceMock {
  producerRegistration = {
    findFirst: jest.fn(),
    create: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('ProducerRegistrationService', () => {
  let producerRegistrationService: ProducerRegistrationService;
  let prismaServiceMock: PrismaService;
  let cpfCnpjValidator: CpfCnpjValidator;

  beforeEach(() => {
    const prismaServiceMockInstance = new PrismaServiceMock();
    prismaServiceMock = prismaServiceMockInstance as unknown as PrismaService;
    cpfCnpjValidator = new CpfCnpjValidator();
    producerRegistrationService = new ProducerRegistrationService(prismaServiceMock);
  });



  // Teste para o método create()
  it('should create a registration correctly', async () => {

    const data: ProducerRegistrationDTO = {
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

    jest.spyOn(cpfCnpjValidator, 'isValid').mockReturnValue(true);
    jest.spyOn(prismaServiceMock.producerRegistration, 'findFirst').mockResolvedValue(null);
    jest.spyOn(prismaServiceMock.producerRegistration, 'create').mockResolvedValue(data);

    const result = await producerRegistrationService.create(data);

    expect(prismaServiceMock.producerRegistration.create).toHaveBeenCalledWith({ data });
    expect(result).toEqual(data);
  });


  // Teste para o método getTotalFarms()
  it('should return the total number of farms', async () => {
    const totalFarms = 10;
    jest.spyOn(prismaServiceMock.producerRegistration, 'count').mockResolvedValue(totalFarms);


    const result = await producerRegistrationService.getTotalFarms();


    expect(prismaServiceMock.producerRegistration.count).toHaveBeenCalled();


    expect(result).toEqual(totalFarms);
  });



  // Teste para o método getTotalAreaHectares()
  it('should return the total area in hectares of all farms', async () => {
    const farms = [
      {
        id: '1',
        cpf_cnpj: '12345678900',
        productor_name: 'Produtor 1',
        farm_name: 'Fazenda 1',
        city: 'Cidade 1',
        state: 'Estado 1',
        total_area_hectare: 50,
        agricultural_area: 30,
        vegetation_area: 20,
        crops_grown: ['Milho', 'Soja'],
      },
      {
        id: '2',
        cpf_cnpj: '98765432100',
        productor_name: 'Produtor 2',
        farm_name: 'Fazenda 2',
        city: 'Cidade 2',
        state: 'Estado 2',
        total_area_hectare: 70,
        agricultural_area: 50,
        vegetation_area: 20,
        crops_grown: ['Trigo', 'Arroz'],
      },

    ];
    const totalAreaExpected = farms.reduce((total, farm) => total + farm.total_area_hectare, 0);

    jest.spyOn(prismaServiceMock.producerRegistration, 'findMany').mockResolvedValue(farms);


    const result = await producerRegistrationService.getTotalAreaHectares();


    expect(prismaServiceMock.producerRegistration.findMany).toHaveBeenCalled();


    expect(result).toEqual(totalAreaExpected);
  });


  // Teste para o método getDistinctStatesWithCount()
  it('should retrieve distinct states with count correctly', async () => {
    const allProducerRegistrations = [
      { state: 'State A' },
      { state: 'State A' },
      { state: 'State B' },
      { state: 'State B' },
      { state: 'State B' },

    ];

    jest.spyOn(prismaServiceMock.producerRegistration, 'findMany').mockResolvedValue(allProducerRegistrations as any);

    const expectedResult = [
      { state: 'State A', count: 2 },
      { state: 'State B', count: 3 },

    ];

    const result = await producerRegistrationService.getDistinctStatesWithCount();

    expect(prismaServiceMock.producerRegistration.findMany).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });



  // Teste para o método getDistinctStatesWithCount()
  it('should retrieve distinct crops grown with count correctly', async () => {
    const mockRegistrations = [
      { crops_grown: ['Corn', 'Wheat'] },
      { crops_grown: ['Rice', 'Wheat'] },
      { crops_grown: ['Corn', 'Soybean'] },

    ];

    jest.spyOn(prismaServiceMock.producerRegistration, 'findMany').mockResolvedValue(mockRegistrations as any);

    const expectedResult = [
      { crop: 'Corn', count: 2 },
      { crop: 'Wheat', count: 2 },
      { crop: 'Rice', count: 1 },
      { crop: 'Soybean', count: 1 },

    ];

    const result = await producerRegistrationService.getDistinctCropsGrownWithCount();

    expect(prismaServiceMock.producerRegistration.findMany).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });


  // Teste para o método getDistinctCropsGrownWithCount()  
  it('should retrieve distinct crops grown with count correctly', async () => {
    const mockRegistrations = [
      { crops_grown: ['Corn', 'Wheat'] },
      { crops_grown: ['Rice', 'Wheat'] },
      { crops_grown: ['Corn', 'Soybean'] },

    ];

    jest.spyOn(prismaServiceMock.producerRegistration, 'findMany').mockResolvedValue(mockRegistrations as any);

    const expectedResult = [
      { crop: 'Corn', count: 2 },
      { crop: 'Wheat', count: 2 },
      { crop: 'Rice', count: 1 },
      { crop: 'Soybean', count: 1 },

    ];

    const result = await producerRegistrationService.getDistinctCropsGrownWithCount();

    expect(prismaServiceMock.producerRegistration.findMany).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });


  // Teste para o método getTotalAreaDivided()
  it('should retrieve total agricultural and vegetation areas correctly', async () => {
    const mockFarms = [
      { agricultural_area: 50, vegetation_area: 30 },
      { agricultural_area: 70, vegetation_area: 20 },
      { agricultural_area: 40, vegetation_area: 50 },

    ];

    jest.spyOn(prismaServiceMock.producerRegistration, 'findMany').mockResolvedValue(mockFarms as any);

    const expectedResult = {
      agriculturalArea: 160,
      vegetationArea: 100,
    };

    const result = await producerRegistrationService.getTotalAreaDivided();

    expect(prismaServiceMock.producerRegistration.findMany).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  // Teste para o método findAll()
  it('should retrieve all producer registrations', async () => {
    const mockRegistrations = [
      { id: '1', productor_name: 'Producer 1', },
      { id: '2', productor_name: 'Producer 2', },

    ];

    jest.spyOn(prismaServiceMock.producerRegistration, 'findMany').mockResolvedValue(mockRegistrations as any);

    const result = await producerRegistrationService.findAll();

    expect(prismaServiceMock.producerRegistration.findMany).toHaveBeenCalled();
    expect(result).toEqual(mockRegistrations);
  });


  // Teste para o método update()
  it('should update an existing registration and throw an error if not found', async () => {
    const mockId = '1';
    const mockUpdateData = {
      productor_name: 'Updated Producer Name',

    };

    const mockExistingRegistration = {
      id: mockId,
      productor_name: 'Existing Producer Name',

    };

    jest.spyOn(prismaServiceMock.producerRegistration, 'findFirst').mockResolvedValue(mockExistingRegistration as any);
    jest.spyOn(prismaServiceMock.producerRegistration, 'update').mockResolvedValue({ ...mockExistingRegistration, ...mockUpdateData } as any);


    const result = await producerRegistrationService.update(mockId, mockUpdateData);

    expect(prismaServiceMock.producerRegistration.findFirst).toHaveBeenCalledWith({
      where: { id: mockId },
    });
    expect(prismaServiceMock.producerRegistration.update).toHaveBeenCalledWith({
      data: mockUpdateData,
      where: { id: mockId },
    });
    expect(result).toEqual({ ...mockExistingRegistration, ...mockUpdateData });


    jest.spyOn(prismaServiceMock.producerRegistration, 'findFirst').mockResolvedValue(null);
    try {
      await producerRegistrationService.update('nonexistentId', mockUpdateData);
    } catch (error) {
      expect(error).toEqual(new Error('Register does not exists!'));
    }
  });


  // Teste para o método delete()
  it('should remove an existing registration and throw an error if not found', async () => {
    const mockId = '1';

    const mockExistingRegistration = {
      id: mockId,
      productor_name: 'Existing Producer Name',

    };

    jest.spyOn(prismaServiceMock.producerRegistration, 'findFirst').mockResolvedValue(mockExistingRegistration as any);
    jest.spyOn(prismaServiceMock.producerRegistration, 'delete').mockResolvedValue(mockExistingRegistration as any);


    const result = await producerRegistrationService.remove(mockId);

    expect(prismaServiceMock.producerRegistration.findFirst).toHaveBeenCalledWith({
      where: { id: mockId },
    });
    expect(prismaServiceMock.producerRegistration.delete).toHaveBeenCalledWith({
      where: { id: mockId },
    });
    expect(result).toEqual(mockExistingRegistration);


    jest.spyOn(prismaServiceMock.producerRegistration, 'findFirst').mockResolvedValue(null);
    try {
      await producerRegistrationService.remove('nonexistentId');
    } catch (error) {
      expect(error).toEqual(new Error('Register does not exists!'));
    }
  });


});
