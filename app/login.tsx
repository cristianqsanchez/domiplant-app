import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Leaf } from 'lucide-react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)');
    }
  }, [user, router]);

  async function handleSubmit() {
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      setError('Credenciales incorrectas');
    } else {
      router.replace('/(tabs)');
    }
    setLoading(false);
  }

  const testUsers = [
    { email: 'juan@domiplant.com', password: 'operario123', role: 'Operario' },
    { email: 'maria@domiplant.com', password: 'conductor123', role: 'Conductor' },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView
        contentContainerClassName="min-h-full items-center justify-center p-4"
        className="bg-green-50"
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full max-w-md">
          <View className="items-center mb-8">
            <LinearGradient
              colors={['#22c55e', '#059669']}
              className="w-16 h-16 items-center justify-center rounded-2xl mb-4"
            >
              <Leaf size={32} color="white" />
            </LinearGradient>
            <Text className="text-3xl font-bold text-gray-900 mb-2">Domiplant</Text>
            <Text className="text-gray-600">Gestión de Viveros</Text>
          </View>

          <View className="bg-white rounded-2xl shadow-lg p-8">
            <Text className="text-2xl font-semibold text-gray-900 mb-6">Iniciar Sesión</Text>

            <View className="gap-5">
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 text-base"
                  placeholder="correo@domiplant.com"
                  placeholderTextColor="#9ca3af"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">Contraseña</Text>
                <View className="relative">
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 text-base pr-12"
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="none"
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#9ca3af" />
                    ) : (
                      <Eye size={20} color="#9ca3af" />
                    )}
                  </Pressable>
                </View>
              </View>

              {error ? (
                <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <Text className="text-red-700 text-sm">{error}</Text>
                </View>
              ) : null}

              {loading ? (
                <View className="w-full py-3 rounded-xl items-center bg-green-400">
                  <Text className="text-white font-medium text-base">
                    Iniciando sesión...
                  </Text>
                </View>
              ) : (
                <Pressable onPress={handleSubmit}>
                  <LinearGradient
                    colors={['#22c55e', '#059669']}
                    className="w-full py-3 rounded-xl items-center"
                  >
                    <Text className="text-white font-medium text-base">
                      Iniciar Sesión
                    </Text>
                  </LinearGradient>
                </Pressable>
              )}
            </View>
          </View>

          <View className="mt-6 bg-white rounded-2xl shadow-lg p-6">
            <Text className="text-sm font-medium text-gray-700 mb-3">
              Cuentas de Prueba:
            </Text>
            <View className="gap-2">
              {testUsers.map((u) => (
                <Pressable
                  key={u.email}
                  onPress={() => {
                    setEmail(u.email);
                    setPassword(u.password);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-50 active:bg-gray-100"
                >
                  <Text className="font-medium text-gray-900 text-sm">{u.role}</Text>
                  <Text className="text-gray-500 text-xs">{u.email}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
