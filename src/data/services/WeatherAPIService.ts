import axios from 'axios';
import { API_KEYS } from '../../config/apiKeys';
import { WeatherData } from '../../domain/entities/WeatherData';
import { WeatherAPIResponse } from '../models/WeatherAPIResponse';
import { IWeatherService } from './IWeatherService';

export class WeatherAPIService implements IWeatherService {
  async getWeather(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherAPIResponse>(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEYS.WEATHER_API}&q=${encodeURIComponent(location)}`
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
      }
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`API error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          throw new Error('Network error: Unable to connect to the weather service');
        } else {
          throw new Error(`Request error: ${error.message}`);
        }
      } else {
        throw new Error(`Unexpected error: ${(error as Error).message}`);
      }
    }
  }
}