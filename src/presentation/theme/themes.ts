export const themes = {
  serviceA: {
    colors: {
      primary: 'blue',
      secondary: '#6c757d',
      background: '#f8f9fa',
      text: '#212529',
    },
    weatherIcons: {
      sunny: 'sunny-a',
      cloudy: 'cloudy-a',
    },
  },
  serviceB: {
    colors: {
      primary: 'red',
      secondary: '#dc3545',
      background: '#e9ecef',
      text: '#495057',
    },
    weatherIcons: {
      sunny: 'sunny-b',
      cloudy: 'cloudy-b',
    },
  },
};

export type Theme = typeof themes.serviceA;