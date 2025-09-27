import { WeatherData } from '../../domain/entities/WeatherData';
import { IWeatherRepository } from '../../domain/interfaces/IWeatherRepository';
import { IWeatherService } from '../services/IWeatherService';

export class WeatherRepository implements IWeatherRepository {
  constructor(private service: IWeatherService) {}

  async getWeather(location: string): Promise<WeatherData> {
    return this.service.getWeather(location);
  }

  setService(service: IWeatherService) {
    this.service = service;
  }
}