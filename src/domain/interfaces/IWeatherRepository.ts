import { WeatherData } from '../entities/WeatherData';

export interface IWeatherRepository {
  getWeather(location: string): Promise<WeatherData>;
}