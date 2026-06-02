import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import {
  Package,
  Sprout,
  Truck,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Clock,
  RefreshCw,
  Droplet,
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';
import { useDashboardData, type BatchItem } from '@/hooks/useDashboardData';

const ICON_MAP: Record<string, React.ElementType> = {
  Sprout,
  Droplet,
  Package,
  Truck,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Clock,
  RefreshCw,
};

export default function Dashboard() {
  const { user } = useAuth();
  const { isOperator, isDriver } = usePermissions();
  const { operatorStats, activeBatches, driverStats, todayTrips, recentActivity, loading, error } =
    useDashboardData();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-green-50">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-green-50">
      <View className="bg-green-600 px-4 pt-12 pb-6">
        <Text className="text-white text-2xl mb-1">Domiplant</Text>
        <Text className="text-green-100 text-sm">
          {user?.name} - {user?.role}
        </Text>
      </View>

      <View className="px-4 -mt-4">
        <View className="flex-row flex-wrap gap-3 mb-6">
          {isOperator() && operatorStats && (
            <>
              <StatCard
                icon={<Package size={20} color="white" />}
                value={String(operatorStats.activeBatches)}
                label="Lotes Activos"
                color="bg-blue-500"
              />
              <StatCard
                icon={<Sprout size={20} color="white" />}
                value={operatorStats.readyPlants.toLocaleString()}
                label="Plantas Listas"
                color="bg-green-500"
              />
              <StatCard
                icon={<TrendingUp size={20} color="white" />}
                value={String(operatorStats.todayTasks)}
                label="Tareas Hoy"
                color="bg-purple-500"
              />
              <StatCard
                icon={<CheckCircle2 size={20} color="white" />}
                value={String(operatorStats.pending)}
                label="Pendientes"
                color="bg-orange-500"
              />
            </>
          )}
          {isDriver() && driverStats && (
            <>
              <StatCard
                icon={<Truck size={20} color="white" />}
                value={String(driverStats.todayTrips)}
                label="Viajes Hoy"
                color="bg-purple-500"
              />
              <StatCard
                icon={<CheckCircle2 size={20} color="white" />}
                value={String(driverStats.deliveries)}
                label="Entregas"
                color="bg-blue-500"
              />
              <StatCard
                icon={<Package size={20} color="white" />}
                value={String(driverStats.completedStops)}
                label="Completadas"
                color="bg-green-500"
              />
              <StatCard
                icon={<Clock size={20} color="white" />}
                value={String(driverStats.pendingStops)}
                label="Pendientes"
                color="bg-orange-500"
              />
            </>
          )}
        </View>
      </View>

      <View className="px-4 mb-6">
        <Text className="text-sm text-gray-500 uppercase tracking-wide mb-3">
          Acciones Rápidas
        </Text>
        <View className="bg-white rounded-xl shadow-sm overflow-hidden">
          {isOperator() && (
            <>
              <QuickAction
                href="/batches"
                icon={<Package size={22} color="#2563eb" />}
                title="Ver Lotes"
                description="Gestionar lotes de producción"
              />
              <QuickAction
                href="/batches/1/treatment"
                icon={<Sprout size={22} color="#16a34a" />}
                title="Registrar Tratamiento"
                description="Aplicar tratamiento a lote"
                border
              />
              <QuickAction
                href="/batches/1/loss"
                icon={<AlertCircle size={22} color="#ea580c" />}
                title="Reportar Pérdida"
                description="Registrar plantas perdidas"
                border
              />
            </>
          )}
          {isDriver() && (
            <>
              <QuickAction
                href="/trips"
                icon={<Truck size={22} color="#9333ea" />}
                title="Mis Viajes"
                description="Ver viajes asignados"
              />
              <QuickAction
                href="/trips"
                icon={<CheckCircle2 size={22} color="#16a34a" />}
                title="Completar Entrega"
                description="Marcar entregas completadas"
                border
              />
              <QuickAction
                href="/returns"
                icon={<RefreshCw size={22} color="#ea580c" />}
                title="Ver Devoluciones"
                description="Gestionar devoluciones de productos"
                border
              />
            </>
          )}
        </View>
      </View>

      {isOperator() && activeBatches && activeBatches.length > 0 && (
        <View className="px-4 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm text-gray-500 uppercase tracking-wide">
              Producción Activa
            </Text>
            <Link href="/batches" className="text-green-600 text-sm font-medium">
              Ver Todo
            </Link>
          </View>
          <View className="gap-3">
            {activeBatches.map((batch) => (
              <BatchCard key={batch.id} batch={batch} />
            ))}
          </View>
        </View>
      )}

      {isDriver() && todayTrips && todayTrips.length > 0 && (
        <View className="px-4 mb-6">
          <Text className="text-sm text-gray-500 uppercase tracking-wide mb-3">
            Entregas de Hoy
          </Text>
          <View className="gap-3">
            {todayTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </View>
        </View>
      )}

      {recentActivity && recentActivity.length > 0 && (
        <View className="px-4 mb-6">
          <Text className="text-sm text-gray-500 uppercase tracking-wide mb-3">
            Actividad Reciente
          </Text>
          <View className="bg-white rounded-xl shadow-sm">
            {recentActivity.map((item, i) => (
              <ActivityItem key={i} item={item} isLast={i === recentActivity.length - 1} />
            ))}
          </View>
        </View>
      )}

      {error && (
        <View className="px-4 mb-6">
          <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <View className="bg-white rounded-xl shadow-sm p-4 w-[48%]">
      <View className={`self-start p-2 rounded-lg ${color} mb-2`}>{icon}</View>
      <Text className="text-2xl font-semibold text-gray-900 mb-1">{value}</Text>
      <Text className="text-xs text-gray-500">{label}</Text>
    </View>
  );
}

function QuickAction({
  href,
  icon,
  title,
  description,
  border,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  border?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex-row items-center gap-4 p-4 active:bg-gray-50 ${
        border ? 'border-t border-gray-100' : ''
      }`}
    >
      {icon}
      <View className="flex-1">
        <Text className="font-medium text-gray-900">{title}</Text>
        <Text className="text-sm text-gray-500">{description}</Text>
      </View>
      <Text className="text-gray-400 text-lg">{'>'}</Text>
    </Link>
  );
}

function BatchCard({ batch }: { batch: BatchItem }) {
  const statusColors: Record<string, string> = {
    'on-track': 'text-green-600 bg-green-50',
    warning: 'text-orange-600 bg-orange-50',
    delayed: 'text-red-600 bg-red-50',
  };

  return (
    <Link
      href={`/batches/${batch.id}`}
      className="bg-white rounded-xl shadow-sm p-4 active:bg-gray-50"
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 mb-1">{batch.species}</Text>
          <Text className="text-sm text-gray-500">
            {batch.current_quantity.toLocaleString()} plantas - {batch.batch_number}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${statusColors[batch.status]}`}>
          <Text className="text-xs font-medium">{batch.stage_label}</Text>
        </View>
      </View>
      <View className="mb-2">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-xs text-gray-500">Progreso</Text>
          <Text className="text-xs text-gray-500">{batch.progress}%</Text>
        </View>
        <View className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <View
            className="bg-green-600 h-2 rounded-full"
            style={{ width: `${batch.progress}%` }}
          />
        </View>
      </View>
      <View className="flex-row items-center gap-1">
        <Clock size={14} color="#6b7280" />
        <Text className="text-xs text-gray-500">
          {batch.days_remaining > 0
            ? `${batch.days_remaining} días restantes`
            : 'Finalizado'}
        </Text>
      </View>
    </Link>
  );
}

function TripCard({
  trip,
}: {
  trip: {
    id: string;
    route: string;
    stops: number;
    completed: number;
    status: string;
    driver: string;
  };
}) {
  const statusConfig: Record<string, { text: string; color: string }> = {
    pending: { text: 'Pendiente', color: 'bg-gray-100' },
    'in-progress': { text: 'En Curso', color: 'bg-blue-100' },
    completed: { text: 'Completado', color: 'bg-green-100' },
  };

  const config = statusConfig[trip.status] ?? statusConfig.pending;

  return (
    <Link
      href={`/trips/${trip.id}`}
      className="bg-white rounded-xl shadow-sm p-4 active:bg-gray-50"
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 mb-1">{trip.route}</Text>
          <Text className="text-sm text-gray-500">{trip.driver}</Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${config.color}`}>
          <Text className="text-xs font-medium text-gray-700">{config.text}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-gray-600">
          {trip.completed} de {trip.stops} paradas completadas
        </Text>
        <Text className="text-green-600 text-lg">{'>'}</Text>
      </View>
    </Link>
  );
}

function ActivityItem({
  item,
  isLast,
}: {
  item: { icon: string; title: string; time: string; color: string };
  isLast: boolean;
}) {
  const IconComponent = ICON_MAP[item.icon] ?? Sprout;
  const colorMap: Record<string, string> = {
    'text-green-600': '#16a34a',
    'text-blue-600': '#2563eb',
    'text-orange-600': '#ea580c',
    'text-purple-600': '#9333ea',
  };

  const iconColor = colorMap[item.color] ?? '#16a34a';

  return (
    <View
      className={`flex-row items-start gap-3 p-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
    >
      <View className="mt-0.5">
        <IconComponent size={18} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-900">{item.title}</Text>
        <Text className="text-xs text-gray-500 mt-1">{item.time}</Text>
      </View>
    </View>
  );
}
