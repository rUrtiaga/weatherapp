import { WeatherData } from '../entities/WeatherData';
import { IWeatherRepository } from '../interfaces/IWeatherRepository';

export class GetWeatherUseCase {
  constructor(private repository: IWeatherRepository) {}

  async execute(location: string): Promise<WeatherData> {
    if (!location || location.trim() === '') {
      throw new Error('Location is required');
    }
    // TODO: Add caching for weather data to reduce API calls
    return this.repository.getWeather(location);
  }
}