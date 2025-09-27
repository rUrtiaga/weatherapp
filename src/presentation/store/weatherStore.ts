import { WeatherRepository } from '@/data/repositories/WeatherRepository';
import { IWeatherService } from '@/data/services/IWeatherService';
import { OpenWeatherService } from '@/data/services/OpenWeatherService';
import { WeatherAPIService } from '@/data/services/WeatherAPIService';
import { WeatherData } from '@/domain/entities/WeatherData';
import { GetWeatherUseCase } from '@/domain/useCases/GetWeatherUseCase';
import { Theme, themes } from '@/presentation/theme/themes';
import { create } from 'zustand';

type ServiceType = 'serviceA' | 'serviceB';

const serviceMap: Record<ServiceType, () => IWeatherService> = {
  serviceA: () => new OpenWeatherService(),
  serviceB: () => new WeatherAPIService(),
  //New services can be added here
};

const serviceFactory = (service: ServiceType) => serviceMap[service]();

interface WeatherState {
  selectedService: ServiceType;
  currentTheme: Theme;
  location: string | null;
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  setService: (service: ServiceType) => void;
  setLocation: (location: string) => void;
  fetchWeather: () => Promise<void>;
}

const repository = new WeatherRepository(serviceFactory('serviceA'));
const useCase = new GetWeatherUseCase(repository);

export const useWeatherStore = create<WeatherState>((set, get) => ({
  selectedService: 'serviceA',
  currentTheme: themes.serviceA,
  location: null,
  weatherData: null,
  loading: false,
  error: null,
  setService: (service) => {
    set({ selectedService: service, currentTheme: themes[service] });
    repository.setService(serviceFactory(service));
    const { location } = get();
    if (location) {
      get().fetchWeather();
    }
  },
  setLocation: (location) => set({ location }),
  fetchWeather: async () => {
    const { location } = get();
    if (!location) return;
    set({ loading: true, error: null });
    try {
      const data = await useCase.execute(location);
      set({ weatherData: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
