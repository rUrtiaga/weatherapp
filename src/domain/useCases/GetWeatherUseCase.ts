import { WeatherData } from '../entities/WeatherData';
import { IWeatherRepository } from '../interfaces/IWeatherRepository';

export class GetWeatherUseCase {
  constructor(private repository: IWeatherRepository) {}

  async execute(location: string): Promise<WeatherData> {
    location = location.trim();
    if (!location) {
      throw new Error('Location is required');
    }
    if (location.length < 1 || location.length > 100) {
      throw new Error('Location must be between 1 and 100 characters');
    }
    if (!/^[a-zA-Z0-9\s\-']+$/.test(location)) {
      throw new Error('Location can only contain letters, numbers, spaces, hyphens, and apostrophes');
    }
    // TODO: Add caching for weather data to reduce API calls
    return this.repository.getWeather(location);
  }
}