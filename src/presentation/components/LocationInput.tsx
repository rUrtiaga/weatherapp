import React from 'react';
import { Button, TextInput, View } from 'react-native';

interface LocationInputProps {
  location: string | null;
  onLocationChange: (location: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  location,
  onLocationChange,
  onSubmit,
  loading,
}) => {
  return (
    <View>
      <TextInput
        testID="location-input"
        placeholder="Enter location"
        value={location || ''}
        onChangeText={onLocationChange}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button testID="get-weather-button" title={loading ? 'Loading...' : 'Get Weather'} onPress={onSubmit} disabled={loading} />
    </View>
  );
};