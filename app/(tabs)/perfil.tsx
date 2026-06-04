import { View, Text, Pressable } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { User, LogOut, Mail, Shield } from 'lucide-react-native';

const ROLE_LABELS: Record<string, string> = {
  production: 'Producción',
  driver: 'Conductor',
  admin: 'Administrador',
};

export default function Perfil() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.replace('/login');
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-green-600 px-4 pt-12 pb-8 items-center">
        <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-4">
          <User size={40} color="white" />
        </View>
        <Text className="text-white text-xl font-semibold">{user?.name}</Text>
        <Text className="text-green-100 text-sm mt-1">
          {ROLE_LABELS[user?.role ?? ''] ?? user?.role}
        </Text>
      </View>

      <View className="mx-4 -mt-4">
        <View className="bg-white rounded-xl shadow-sm">
          <View className="flex-row items-center gap-3 p-4 border-b border-gray-100">
            <Mail size={20} color="#6b7280" />
            <View>
              <Text className="text-xs text-gray-500">Correo</Text>
              <Text className="text-sm text-gray-900">{user?.email}</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3 p-4">
            <Shield size={20} color="#6b7280" />
            <View>
              <Text className="text-xs text-gray-500">Rol</Text>
              <Text className="text-sm text-gray-900">
                {ROLE_LABELS[user?.role ?? ''] ?? user?.role}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleLogout}
          className="bg-white rounded-xl shadow-sm p-4 flex-row items-center gap-3 mt-4 active:bg-gray-50"
        >
          <LogOut size={20} color="#dc2626" />
          <Text className="text-red-600 font-medium">Cerrar Sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}
