import axios from 'axios';
import { API_KEYS } from '../../config/apiKeys';
import { WeatherData } from '../../domain/entities/WeatherData';
import { OpenWeatherResponse } from '../models/OpenWeatherResponse';
import { IWeatherService } from './IWeatherService';

export class OpenWeatherService implements IWeatherService {
  async getWeather(location: string): Promise<WeatherData> {
    const response = await axios.get<OpenWeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEYS.OPEN_WEATHER}&units=metric`
    );
    const data: OpenWeatherResponse = response.data;
    console.log('OpenWeather data:', data);
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      location: data.name,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    } as WeatherData;
  }
}