import { Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Package, Truck, RotateCcw, User } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuth();
  const role = user?.role;
  const isOperator = role === 'production' || role === 'admin';
  const isDriver = role === 'driver';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lotes"
        options={{
          title: 'Lotes',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Package size={size} color={color} />
          ),
          href: isOperator ? '/lotes' : null,
        }}
      />
      <Tabs.Screen
        name="viajes"
        options={{
          title: 'Viajes',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <Truck size={size} color={color} />
          ),
          href: isDriver ? '/viajes' : null,
        }}
      />
      <Tabs.Screen
        name="devoluciones"
        options={{
          title: 'Devoluciones',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <RotateCcw size={size} color={color} />
          ),
          href: isDriver ? '/devoluciones' : null,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
