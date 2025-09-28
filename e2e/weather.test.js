import { by, device, element, expect, waitFor } from 'detox';

describe('Weather App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
  });

  it('should fetch and display weather for Service A', async () => {
    await waitFor(element(by.id('service-a-button'))).toBeVisible().withTimeout(5000);
    await element(by.id('service-a-button')).tap();
    await waitFor(element(by.id('location-input'))).toBeVisible().withTimeout(5000);
    await element(by.id('location-input')).typeText('London');
    await waitFor(element(by.id('get-weather-button'))).toBeVisible().withTimeout(5000);
    await element(by.id('get-weather-button')).tap();
    await waitFor(element(by.id('weather-display'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('weather-location'))).toHaveText('London');
    await expect(element(by.id('weather-temperature'))).toBeVisible();
  });

  it('should fetch and display weather for Service B', async () => {
    await waitFor(element(by.id('service-b-button'))).toBeVisible().withTimeout(5000);
    await element(by.id('service-b-button')).tap();
    await waitFor(element(by.id('location-input'))).toBeVisible().withTimeout(5000);
    await element(by.id('location-input')).typeText('Paris');
    await waitFor(element(by.id('get-weather-button'))).toBeVisible().withTimeout(5000);
    await element(by.id('get-weather-button')).tap();
    await waitFor(element(by.id('weather-display'))).toBeVisible().withTimeout(10000);
    await expect(element(by.id('weather-location'))).toHaveText('Paris');
  });
});