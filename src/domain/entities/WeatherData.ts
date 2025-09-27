export interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  humidity: number;
  windSpeed: number;
  icon: string; // URL or name for icon
}