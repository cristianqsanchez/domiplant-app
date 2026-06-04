import { View, Text } from 'react-native';
import { Truck } from 'lucide-react-native';

export default function Viajes() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50">
      <Truck size={48} color="#9ca3af" />
      <Text className="text-lg font-semibold text-gray-900 mt-4">Viajes</Text>
      <Text className="text-sm text-gray-500 mt-1">Próximamente</Text>
    </View>
  );
}
