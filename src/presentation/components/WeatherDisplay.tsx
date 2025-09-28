import { WeatherData } from '@/domain/entities/WeatherData';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { Theme } from '../theme/themes';

interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  error: string | null;
  theme: Theme;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  error,
  theme,
}) => {
  if (error) {
    return <Text style={{ color: theme.colors.primary }}>{error}</Text>;
  }
  if (!weatherData) {
    return <Text style={{ color: theme.colors.text }}>No weather data</Text>;
  }
  return (
    <View testID="weather-display" accessible={true}>
      <Text testID="weather-location" style={{ color: theme.colors.text }}>{weatherData.location}</Text>
      <View style={{ backgroundColor: theme.colors.secondary }}>
        <Image source={{ uri: weatherData.icon }} style={{ width: 50, height: 50 }} />
      </View>
      <Text testID="weather-temperature" style={{ color: theme.colors.text }}>{weatherData.temperature}°C</Text>
      <Text style={{ color: theme.colors.text }}>{weatherData.description}</Text>
      <Text style={{ color: theme.colors.text }}>Humidity: {weatherData.humidity}%</Text>
      <Text style={{ color: theme.colors.text }}>Wind: {weatherData.windSpeed} m/s</Text>
    </View>
  );
};
