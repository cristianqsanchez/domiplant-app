import { useState, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { Link } from 'expo-router';
import { Search, Filter, MapPin, Clock } from 'lucide-react-native';
import { useBatches, type BatchItem } from '@/hooks/useBatches';

const STAGES = [
  'Todos',
  'Propagación',
  'Enraizado',
  'Trasplante',
  'Aclimatación',
  'Listo',
  'Vendido',
];

const STAGE_COLORS: Record<string, string> = {
  'Propagación': 'bg-purple-100 text-purple-700',
  'Enraizado': 'bg-blue-100 text-blue-700',
  'Trasplante': 'bg-yellow-100 text-yellow-700',
  'Aclimatación': 'bg-orange-100 text-orange-700',
  'Listo': 'bg-green-100 text-green-700',
  'Vendido': 'bg-gray-100 text-gray-700',
};

export default function Batches() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('Todos');
  const { batches, loading, error, refetch } = useBatches(searchQuery, selectedStage);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading && batches.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white border-b border-gray-200 px-4 pt-12 pb-3">
        <Text className="text-xl font-semibold text-gray-900 mb-3">
          Lotes de Producción
        </Text>

        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 mb-3">
          <Search size={18} color="#9ca3af" />
          <TextInput
            placeholder="Buscar por especie o ubicación..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-sm text-gray-900"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="-mx-4 px-4"
        >
          <View className="flex-row gap-2 pb-2">
            {STAGES.map((stage) => (
              <Pressable
                key={stage}
                onPress={() => setSelectedStage(stage)}
                className={`px-4 py-1.5 rounded-full ${
                  selectedStage === stage ? 'bg-green-600' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    selectedStage === stage ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {stage}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#22c55e"
          />
        }
      >
        <View className="gap-3">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </View>

        {batches.length === 0 && !loading && (
          <View className="items-center py-12">
            <Filter size={48} color="#9ca3af" />
            <Text className="text-gray-500 mt-2">No se encontraron lotes</Text>
          </View>
        )}

        {error && (
          <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function BatchCard({ batch }: { batch: BatchItem }) {
  const stageLabel = batch.stage_label;
  const colorClass = STAGE_COLORS[stageLabel] ?? 'bg-gray-100 text-gray-700';
  const [bg, text] = colorClass.split(' ');

  return (
    <Link
      href={`/batches/${batch.id}`}
      className="block bg-white rounded-xl shadow-sm p-4 active:bg-gray-50"
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 mb-1">{batch.species}</Text>
          <Text className="text-sm text-gray-500">
            {batch.current_quantity.toLocaleString()} plantas
          </Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${bg}`}>
          <Text className={`text-xs font-medium ${text}`}>{stageLabel}</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-4 mb-3">
        <View className="flex-row items-center gap-1">
          <MapPin size={14} color="#6b7280" />
          <Text className="text-sm text-gray-600">{batch.location}</Text>
        </View>
        {batch.days_remaining > 0 && (
          <View className="flex-row items-center gap-1">
            <Clock size={14} color="#6b7280" />
            <Text className="text-sm text-gray-600">
              {batch.days_remaining} días
            </Text>
          </View>
        )}
      </View>

      <View>
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-xs text-gray-500">Progreso de Producción</Text>
          <Text className="text-xs font-medium text-gray-500">
            {batch.progress}%
          </Text>
        </View>
        <View className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <View
            className={`h-2 rounded-full ${
              batch.progress === 100 ? 'bg-green-600' : 'bg-blue-600'
            }`}
            style={{ width: `${batch.progress}%` }}
          />
        </View>
      </View>
    </Link>
  );
}
