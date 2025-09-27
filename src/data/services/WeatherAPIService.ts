import axios from 'axios';
import { API_KEYS } from '../../config/apiKeys';
import { WeatherData } from '../../domain/entities/WeatherData';
import { WeatherAPIResponse } from '../models/WeatherAPIResponse';
import { IWeatherService } from './IWeatherService';

export class WeatherAPIService implements IWeatherService {
  async getWeather(location: string): Promise<WeatherData> {
    const response = await axios.get<WeatherAPIResponse>(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEYS.WEATHER_API}&q=${encodeURIComponent(location)}`
    );
    const data: WeatherAPIResponse = response.data;
    console.log('WeatherAPI data:', data);
    return {
      temperature: data.current.temp_c,
      description: data.current.condition.text,
      location: data.location.name,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph / 3.6, // convert to m/s
      icon: `https:${data.current.condition.icon}`,
    } as WeatherData;
  }
}