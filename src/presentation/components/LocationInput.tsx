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
        placeholder="Enter location"
        value={location || ''}
        onChangeText={onLocationChange}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title={loading ? 'Loading...' : 'Get Weather'} onPress={onSubmit} disabled={loading} />
    </View>
  );
};