import { API_KEYS } from "@/config/apiKeys";
import axios, { AxiosError } from "axios";
import { WeatherData } from "../../domain/entities/WeatherData";
import { OpenWeatherResponse } from "../models/OpenWeatherResponse";
import { IWeatherService } from "./IWeatherService";

// Custom error classes for better error handling
export class WeatherServiceError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'WeatherServiceError';
  }
}

export class CityNotFoundError extends WeatherServiceError {
  constructor() {
    super('City not found. Please check the city name and try again.', 404);
  }
}

export class NetworkError extends WeatherServiceError {
  constructor(message: string) {
    super(message);
  }
}

export class TimeoutError extends WeatherServiceError {
  constructor() {
    super('Request timeout');
  }
}

export class OpenWeatherService implements IWeatherService {
  async getWeather(location: string): Promise<WeatherData> {
    try {
      const response = await axios.get<OpenWeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          location
        )}&appid=${API_KEYS.OPEN_WEATHER}&units=metric`
      );
      const data: OpenWeatherResponse = response.data;
      console.log("OpenWeather data:", data);
      return {
        temperature: data.main.temp,
        description: data.weather[0].description,
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      } as WeatherData;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    console.error('Weather service error:', error); // Added logging for debugging

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      // Handle timeout errors
      if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
        throw new TimeoutError();
      }

      if (axiosError.response) {
        const { status, data } = axiosError.response;
        const message = (data as any)?.message || 'Unknown error';

        switch (status) {
          case 401:
            throw new WeatherServiceError('Unauthorized: Invalid API key', 401);
          case 404:
            if (message === 'city not found') {
              throw new CityNotFoundError();
            }
            throw new WeatherServiceError(`Not found: ${message}`, 404);
          case 429:
            throw new WeatherServiceError('Rate limit exceeded. Please try again later.', 429);
          case 500:
          case 502:
          case 503:
          case 504:
            throw new WeatherServiceError(`Server error: ${message}`, status);
          default:
            throw new WeatherServiceError(`HTTP error: ${status} - ${message}`, status);
        }
      } else {
        // Network errors without response
        throw new NetworkError('Network error: Unable to connect to the weather service');
      }
    } else {
      // Non-Axios errors
      throw new WeatherServiceError('Malformed response or unknown error from weather service');
    }
  }
}
