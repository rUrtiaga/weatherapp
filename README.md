# Weather App

A modern, cross-platform mobile weather application built with React Native and Expo. This app allows users to fetch real-time weather data for any location using multiple weather service providers.

## Features

- **Real-time Weather Data**: Get current weather information including temperature, description, humidity, and wind speed
- **Multiple Service Providers**: Toggle between OpenWeatherMap and WeatherAPI for weather data
- **Location-based Search**: Enter any city name to get weather information
- **Responsive UI**: Clean and intuitive user interface with weather icons
- **Cross-platform**: Runs on iOS, Android, and Web
- **TypeScript**: Fully typed codebase for better development experience
- **Clean Architecture**: Well-structured codebase following clean architecture principles

## Architecture

This project follows Clean Architecture principles, organized into three main layers:

- **Domain Layer** (`src/domain/`): Contains business logic, entities, and use cases
  - `entities/`: Core business entities (WeatherData)
  - `useCases/`: Application use cases (GetWeatherUseCase)
  - `interfaces/`: Repository interfaces

- **Data Layer** (`src/data/`): Handles data operations and external APIs
  - `services/`: Weather API service implementations
  - `repositories/`: Data access layer
  - `models/`: API response models

- **Presentation Layer** (`src/presentation/`): UI components and state management
  - `components/`: Reusable UI components
  - `store/`: Zustand state management
  - `screens/`: Screen components

## Technologies Used

- **React Native 0.81.4**: Cross-platform mobile development
- **Expo SDK 54**: Development platform and tools
- **TypeScript 5.9**: Type-safe JavaScript
- **Axios**: HTTP client for API requests
- **Zustand**: Lightweight state management
- **React Navigation**: Navigation library
- **Jest**: Testing framework
- **ESLint**: Code linting

## API Services

The app integrates with two weather service providers:

### OpenWeatherMap (Service A)
- **API**: https://api.openweathermap.org/data/2.5/weather
- **Features**: Current weather data with metric units
- **Data Provided**: Temperature (°C), weather description, humidity, wind speed, weather icons

### WeatherAPI (Service B)
- **API**: https://api.weatherapi.com/v1/current.json
- **Features**: Current weather conditions
- **Data Provided**: Temperature (°C), weather description, humidity, wind speed (converted to m/s), weather icons

**Note**: API keys are loaded from environment variables defined in `.env` for security. Never commit actual API keys to version control.

## Installation

1. **Prerequisites**:
   - Node.js (v18 or higher)
   - npm or yarn
   - Expo CLI: `npm install -g @expo/cli`
   - For mobile development: Android Studio (Android) or Xcode (iOS)

2. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd weather_app
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure API Keys**:
   - Copy `.env.example` to `.env`
   - Add your actual API keys to `.env`:
     - Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
     - Get an API key from [WeatherAPI](https://www.weatherapi.com/)
   - The app loads API keys from environment variables for security

## Usage

### Development

1. **Start the development server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

2. **Run on specific platforms**:
   ```bash
   # Android
   npm run android

   # iOS
   npm run ios

   # Web
   npm run web
   ```

### Building for Production

1. **Build for production**:
   ```bash
   npx expo build:android
   npx expo build:ios
   ```

2. **Publish updates**:
   ```bash
   npx expo publish
   ```

## Testing

The project uses Jest with the `jest-expo` preset for testing React Native applications.

### Running Tests

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with coverage:
```bash
npm test -- --coverage
```

### Test Structure

The project includes unit tests for the domain layer:
- `GetWeatherUseCase.test.ts`: Tests the weather fetching use case, including success scenarios and error handling for invalid inputs

Tests are located in `src/__tests__/` following the same directory structure as the source code.

## Project Structure

```
weather_app/
├── app/                    # Expo Router screens
├── src/
│   ├── config/            # Configuration files
│   ├── data/              # Data layer
│   │   ├── models/        # API response models
│   │   ├── repositories/  # Repository implementations
│   │   └── services/      # API service implementations
│   ├── domain/            # Domain layer
│   │   ├── entities/      # Business entities
│   │   ├── interfaces/    # Repository interfaces
│   │   └── useCases/      # Use cases
│   ├── presentation/      # Presentation layer
│   │   ├── components/    # UI components
│   │   ├── store/         # State management
│   │   └── themes/        # Theme configurations
│   └── __tests__/         # Test files
├── assets/                # Static assets
├── jest.config.js         # Jest configuration
├── metro.config.js        # Metro bundler config
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## Code Quality

- **Linting**: Run `npm run lint` to check code quality
- **TypeScript**: Strict type checking enabled
- **Testing**: Unit tests for critical business logic

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/) and [WeatherAPI](https://www.weatherapi.com/)
- Built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/)

## Notes

- I can always make mistakes. Feedback welcome!
