import { LocationInput } from '@/presentation/components/LocationInput';
import { ServiceToggle } from '@/presentation/components/ServiceToggle';
import { WeatherDisplay } from '@/presentation/components/WeatherDisplay';
import { useWeatherStore } from '@/presentation/store/weatherStore';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Index() {
  const {
    selectedService,
    currentTheme,
    location,
    weatherData,
    loading,
    error,
    setService,
    setLocation,
    fetchWeather,
  } = useWeatherStore();

  return (
    <ScrollView
      style={{ flex: 1, padding: 20, backgroundColor: currentTheme.colors.background }}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ServiceToggle selectedService={selectedService} onServiceChange={setService} theme={currentTheme} />
      <LocationInput
        location={location}
        onLocationChange={setLocation}
        onSubmit={fetchWeather}
        loading={loading}
      />
      <WeatherDisplay weatherData={weatherData} error={error} theme={currentTheme} />
    </ScrollView>
  );
}
