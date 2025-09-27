import { WeatherData } from '../../domain/entities/WeatherData';

export interface IWeatherService {
  getWeather(location: string): Promise<WeatherData>;
}