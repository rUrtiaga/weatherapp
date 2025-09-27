import { WeatherRepository } from '../../../data/repositories/WeatherRepository';
import { IWeatherService } from '../../../data/services/IWeatherService';

const mockService: IWeatherService = {
  getWeather: jest.fn().mockResolvedValue({
    temperature: 25,
    description: 'Clear sky',
    location: 'London',
    humidity: 60,
    windSpeed: 3,
    icon: '01d',
  }),
};

describe('WeatherRepository', () => {
  let repository: WeatherRepository;

  beforeEach(() => {
    repository = new WeatherRepository(mockService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call service getWeather with correct location', async () => {
    const location = 'London';
    await repository.getWeather(location);

    expect(mockService.getWeather).toHaveBeenCalledWith(location);
    expect(mockService.getWeather).toHaveBeenCalledTimes(1);
  });

  it('should return weather data from service', async () => {
    const result = await repository.getWeather('London');

    expect(result).toEqual({
      temperature: 25,
      description: 'Clear sky',
      location: 'London',
      humidity: 60,
      windSpeed: 3,
      icon: '01d',
    });
  });

  it('should allow setting a new service', () => {
    const newService: IWeatherService = {
      getWeather: jest.fn(),
    };

    repository.setService(newService);

    // Since setService doesn't return anything, we can check by calling getWeather
    // and seeing if the new service is used
    repository.getWeather('Test');

    expect(newService.getWeather).toHaveBeenCalledWith('Test');
  });
});