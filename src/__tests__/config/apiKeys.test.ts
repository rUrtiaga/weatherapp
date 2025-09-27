import { API_KEYS } from '../../config/apiKeys';

describe('API_KEYS', () => {
  it('should have OPEN_WEATHER defined', () => {
    expect(API_KEYS.OPEN_WEATHER).toBeDefined();
    expect(typeof API_KEYS.OPEN_WEATHER).toBe('string');
    expect(API_KEYS.OPEN_WEATHER.length).toBeGreaterThan(0);
  });

  it('should have WEATHER_API defined', () => {
    expect(API_KEYS.WEATHER_API).toBeDefined();
    expect(typeof API_KEYS.WEATHER_API).toBe('string');
    expect(API_KEYS.WEATHER_API.length).toBeGreaterThan(0);
  });
});