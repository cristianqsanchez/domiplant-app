import { View, Text, ScrollView } from 'react-native';
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
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { usePermissions } from '@/hooks/usePermissions';

export default function Dashboard() {
  const { user } = useAuth();
  const { isOperator, isDriver } = usePermissions();

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
          {isOperator() && (
            <>
              <StatCard
                icon={<Package size={20} color="white" />}
                value="24"
                label="Lotes Activos"
                color="bg-blue-500"
              />
              <StatCard
                icon={<Sprout size={20} color="white" />}
                value="18,450"
                label="Plantas Listas"
                color="bg-green-500"
              />
              <StatCard
                icon={<TrendingUp size={20} color="white" />}
                value="32"
                label="Tareas Hoy"
                color="bg-purple-500"
              />
              <StatCard
                icon={<CheckCircle2 size={20} color="white" />}
                value="12"
                label="Pendientes"
                color="bg-orange-500"
              />
            </>
          )}
          {isDriver() && (
            <>
              <StatCard
                icon={<Truck size={20} color="white" />}
                value="5"
                label="Viajes Hoy"
                color="bg-purple-500"
              />
              <StatCard
                icon={<CheckCircle2 size={20} color="white" />}
                value="18"
                label="Entregas"
                color="bg-blue-500"
              />
              <StatCard
                icon={<Package size={20} color="white" />}
                value="12"
                label="Completadas"
                color="bg-green-500"
              />
              <StatCard
                icon={<Clock size={20} color="white" />}
                value="6"
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

      {isOperator() && (
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
            <BatchCard
              id="1"
              species="Ficus lyrata"
              quantity={2500}
              stage="Enraizado"
              progress={65}
              location="Cama A-12"
              daysRemaining={15}
              status="on-track"
            />
            <BatchCard
              id="2"
              species="Monstera deliciosa"
              quantity={1800}
              stage="Aclimatación"
              progress={90}
              location="Cama B-05"
              daysRemaining={5}
              status="on-track"
            />
            <BatchCard
              id="3"
              species="Pothos aureus"
              quantity={3200}
              stage="Trasplante"
              progress={45}
              location="Cama C-08"
              daysRemaining={22}
              status="warning"
            />
          </View>
        </View>
      )}

      {isDriver() && (
        <View className="px-4 mb-6">
          <Text className="text-sm text-gray-500 uppercase tracking-wide mb-3">
            Entregas de Hoy
          </Text>
          <View className="gap-3">
            <TripCard
              id="1"
              route="Santo Domingo - Ruta A"
              stops={8}
              completed={3}
              status="in-progress"
              driver="Carlos Fernández"
            />
            <TripCard
              id="2"
              route="Santiago - Ruta B"
              stops={5}
              completed={0}
              status="pending"
              driver="María González"
            />
          </View>
        </View>
      )}

      <View className="px-4 mb-6">
        <Text className="text-sm text-gray-500 uppercase tracking-wide mb-3">
          Actividad Reciente
        </Text>
        <View className="bg-white rounded-xl shadow-sm">
          {isOperator() && (
            <>
              <ActivityItem
                icon={<Sprout size={18} color="#16a34a" />}
                title="Lote #B-2024-045 movido a Listo"
                time="hace 15 min"
              />
              <ActivityItem
                icon={<TrendingUp size={18} color="#2563eb" />}
                title="Tratamiento aplicado: 500 plantas"
                time="hace 1 hora"
              />
              <ActivityItem
                icon={<AlertCircle size={18} color="#ea580c" />}
                title="Pérdida reportada: Lote #B-2024-032"
                time="hace 2 horas"
              />
            </>
          )}
          {isDriver() && (
            <>
              <ActivityItem
                icon={<Truck size={18} color="#9333ea" />}
                title="Viaje iniciado: Ruta A"
                time="hace 15 min"
              />
              <ActivityItem
                icon={<CheckCircle2 size={18} color="#16a34a" />}
                title="Entrega completada: Parada #3"
                time="hace 1 hora"
              />
              <ActivityItem
                icon={<Package size={18} color="#2563eb" />}
                title="Cargado: 250 plantas"
                time="hace 2 horas"
              />
              <ActivityItem
                icon={<Truck size={18} color="#16a34a" />}
                title="Viaje completado: Ruta B"
                time="hace 3 horas"
              />
            </>
          )}
        </View>
      </View>
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

function BatchCard({
  id,
  species,
  quantity,
  stage,
  progress,
  location,
  daysRemaining,
  status,
}: {
  id: string;
  species: string;
  quantity: number;
  stage: string;
  progress: number;
  location: string;
  daysRemaining: number;
  status: 'on-track' | 'warning' | 'delayed';
}) {
  const statusColors: Record<string, string> = {
    'on-track': 'text-green-600 bg-green-50',
    warning: 'text-orange-600 bg-orange-50',
    delayed: 'text-red-600 bg-red-50',
  };

  return (
    <Link
      href={`/batches/${id}`}
      className="bg-white rounded-xl shadow-sm p-4 active:bg-gray-50"
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 mb-1">{species}</Text>
          <Text className="text-sm text-gray-500">
            {quantity.toLocaleString()} plants - {location}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${statusColors[status]}`}>
          <Text className="text-xs font-medium">{stage}</Text>
        </View>
      </View>
      <View className="mb-2">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-xs text-gray-500">Progreso</Text>
          <Text className="text-xs text-gray-500">{progress}%</Text>
        </View>
        <View className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <View className="bg-green-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </View>
      </View>
      <View className="flex-row items-center gap-1">
        <Clock size={14} color="#6b7280" />
        <Text className="text-xs text-gray-500">{daysRemaining} días restantes</Text>
      </View>
    </Link>
  );
}

function TripCard({
  id,
  route,
  stops,
  completed,
  status,
  driver,
}: {
  id: string;
  route: string;
  stops: number;
  completed: number;
  status: 'pending' | 'in-progress' | 'completed';
  driver: string;
}) {
  const statusConfig: Record<string, { text: string; color: string }> = {
    pending: { text: 'Pendiente', color: 'bg-gray-100' },
    'in-progress': { text: 'En Curso', color: 'bg-blue-100' },
    completed: { text: 'Completado', color: 'bg-green-100' },
  };

  return (
    <Link
      href={`/trips/${id}`}
      className="bg-white rounded-xl shadow-sm p-4 active:bg-gray-50"
    >
      <View className="flex-row items-start justify-between mb-3">
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 mb-1">{route}</Text>
          <Text className="text-sm text-gray-500">{driver}</Text>
        </View>
        <View className={`px-2 py-1 rounded-full ${statusConfig[status].color}`}>
          <Text className="text-xs font-medium text-gray-700">
            {statusConfig[status].text}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-gray-600">
          {completed} de {stops} paradas completadas
        </Text>
        <Text className="text-green-600 text-lg">{'>'}</Text>
      </View>
    </Link>
  );
}

function ActivityItem({
  icon,
  title,
  time,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
}) {
  return (
    <View className="flex-row items-start gap-3 p-4 border-b border-gray-100">
      <View className="mt-0.5">{icon}</View>
      <View className="flex-1">
        <Text className="text-sm text-gray-900">{title}</Text>
        <Text className="text-xs text-gray-500 mt-1">{time}</Text>
      </View>
    </View>
  );
}
