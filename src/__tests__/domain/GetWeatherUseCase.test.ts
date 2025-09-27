import { WeatherRepository } from '../../data/repositories/WeatherRepository';
import { IWeatherService } from '../../data/services/IWeatherService';
import { GetWeatherUseCase } from '../../domain/useCases/GetWeatherUseCase';

jest.mock('../../data/repositories/WeatherRepository', () => ({
  WeatherRepository: jest.fn().mockImplementation((service) => ({
    getWeather: jest.fn().mockImplementation(service.getWeather),
  })),
}));

jest.mock('expo', () => ({}));

const mockService: IWeatherService = {
  getWeather: jest.fn().mockResolvedValue({
    temperature: 20,
    description: 'Sunny',
    location: 'Madrid',
    humidity: 50,
    windSpeed: 5,
    icon: 'icon',
  }),
};

const repository = new WeatherRepository(mockService);
const useCase = new GetWeatherUseCase(repository);

describe('GetWeatherUseCase', () => {
  it('should return weather data', async () => {
    const result = await useCase.execute('Madrid');
    console.log('Test result:', result); // Debug log
    expect(result.temperature).toBe(20);
  });

  it('should throw error for empty location', async () => {
    await expect(useCase.execute('')).rejects.toThrow('Location is required');
  });

  it('should throw error for null location', async () => {
    await expect(useCase.execute(null as any)).rejects.toThrow('Location is required');
  });

  it('should throw error for undefined location', async () => {
    await expect(useCase.execute(undefined as any)).rejects.toThrow('Location is required');
  });

  it('should throw error for whitespace-only location', async () => {
    await expect(useCase.execute('   ')).rejects.toThrow('Location is required');
  });

  it('should accept valid location with spaces', async () => {
    const result = await useCase.execute('New York');
    expect(result.temperature).toBe(20);
  });
});