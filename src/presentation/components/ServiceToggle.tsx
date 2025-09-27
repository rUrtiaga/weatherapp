import React from 'react';
import { Button, View } from 'react-native';
import { Theme } from '../theme/themes';

type ServiceType = 'serviceA' | 'serviceB';

interface ServiceToggleProps {
  selectedService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
  theme: Theme;
}

export const ServiceToggle: React.FC<ServiceToggleProps> = ({
  selectedService,
  onServiceChange,
  theme,
}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <Button
        title="Service A"
        onPress={() => onServiceChange('serviceA')}
        color={selectedService === 'serviceA' ? theme.colors.primary : theme.colors.secondary}
      />
      <Button
        title="Service B"
        onPress={() => onServiceChange('serviceB')}
        color={selectedService === 'serviceB' ? theme.colors.primary : theme.colors.secondary}
      />
    </View>
  );
};
