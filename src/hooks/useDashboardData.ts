import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const STAGE_LABELS: Record<string, string> = {
  propagation: 'Propagación',
  rooting: 'Enraizado',
  transplant: 'Trasplante',
  acclimation: 'Aclimatación',
  ready: 'Listo',
  sold: 'Vendido',
};

const STATUS_BADGE: Record<string, 'on-track' | 'warning' | 'delayed'> = {
  ready: 'on-track',
  sold: 'on-track',
};

export type BatchItem = {
  id: string;
  batch_number: string;
  species: string;
  quantity: number;
  current_quantity: number;
  stage: string;
  stage_label: string;
  progress: number;
  location: string;
  days_remaining: number;
  status: 'on-track' | 'warning' | 'delayed';
};

export type DashboardState = {
  operatorStats: {
    activeBatches: number;
    readyPlants: number;
    todayTasks: number;
    pending: number;
  } | null;
  activeBatches: BatchItem[] | null;
  driverStats: {
    todayTrips: number;
    deliveries: number;
    completedStops: number;
    pendingStops: number;
  } | null;
  todayTrips: {
    id: string;
    route: string;
    stops: number;
    completed: number;
    status: string;
    driver: string;
  }[] | null;
  recentActivity: {
    icon: string;
    title: string;
    time: string;
    color: string;
  }[] | null;
  loading: boolean;
  error: string | null;
};

function computeProgressStatus(progress: number, stage: string): 'on-track' | 'warning' | 'delayed' {
  if (stage === 'ready' || stage === 'sold') return 'on-track';
  if (progress >= 50) return 'on-track';
  if (progress >= 25) return 'warning';
  return 'delayed';
}

export function useDashboardData() {
  const { user } = useAuth();
  const [state, setState] = useState<DashboardState>({
    operatorStats: null,
    activeBatches: null,
    driverStats: null,
    todayTrips: null,
    recentActivity: null,
    loading: true,
    error: null,
  });

  const role = user?.role;
  const isOperator = role === 'production' || role === 'admin';
  const isDriver = role === 'driver';

  useEffect(() => {
    const uid: string | undefined = user?.id;
    if (!uid) return;

    let cancelled = false;

    async function fetchData() {
      setState((s) => ({ ...s, loading: true, error: null }));

      try {
        const operatorStats = isOperator ? await fetchOperatorStats() : null;
        const activeBatches = isOperator ? await fetchActiveBatches() : null;
        const driverStats = isDriver ? await fetchDriverStats(uid!) : null;
        const todayTrips = isDriver ? await fetchTodayTrips(uid!) : null;
        const recentActivity = await fetchRecentActivity(role ?? null, uid!);

        if (cancelled) return;

        setState({
          operatorStats,
          activeBatches,
          driverStats,
          todayTrips,
          recentActivity,
          loading: false,
          error: null,
        });
      } catch (err) {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          loading: false,
          error: err instanceof Error ? err.message : 'Error al cargar datos',
        }));
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [user?.id, role, isOperator, isDriver]);

  return state;
}

async function fetchOperatorStats() {
  const { count: activeBatches } = await supabase
    .from('production_batches')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'En Progreso');

  const { data: readyData } = await supabase
    .from('production_batches')
    .select('current_quantity')
    .eq('stage', 'ready');

  const readyPlants =
    readyData?.reduce((sum, b) => sum + (b.current_quantity ?? 0), 0) ?? 0;

  return {
    activeBatches: activeBatches ?? 0,
    readyPlants,
    todayTasks: 0,
    pending: 0,
  };
}

async function fetchActiveBatches(): Promise<BatchItem[]> {
  const { data } = await supabase
    .from('production_batches')
    .select(
      `id, batch_number, quantity, current_quantity, stage, progress, start_date, expected_duration, status, plants(name)`
    )
    .neq('status', 'Completado')
    .order('created_at', { ascending: false })
    .limit(10);

  if (!data) return [];

  const today = new Date();

  return data.map((b) => {
    const start = new Date(b.start_date);
    const elapsed = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, b.expected_duration - elapsed);
    const progress = b.progress ?? 0;

    return {
      id: b.id,
      batch_number: b.batch_number,
      species: (b.plants as { name: string } | null)?.name ?? 'Sin especie',
      quantity: b.quantity,
      current_quantity: b.current_quantity ?? b.quantity,
      stage: b.stage ?? 'unknown',
      stage_label: STAGE_LABELS[b.stage ?? ''] ?? b.stage ?? 'Desconocido',
      progress,
      location: '-',
      days_remaining: daysRemaining,
      status: STATUS_BADGE[b.stage ?? ''] ?? computeProgressStatus(progress, b.stage ?? ''),
    };
  });
}

async function fetchDriverStats(driverId: string) {
  const today = new Date().toISOString().split('T')[0];

  const { data: trips } = await supabase
    .from('trips')
    .select('id, trip_stops(id, status)')
    .eq('driver_id', driverId)
    .eq('date', today);

  const todayTrips = trips?.length ?? 0;
  let completedStops = 0;
  let pendingStops = 0;

  for (const trip of trips ?? []) {
    for (const stop of (trip.trip_stops as { id: string; status: string }[]) ?? []) {
      if (stop.status === 'completed') completedStops++;
      else pendingStops++;
    }
  }

  return { todayTrips, deliveries: completedStops, completedStops, pendingStops };
}

async function fetchTodayTrips(driverId: string) {
  const today = new Date().toISOString().split('T')[0];

  const { data } = await supabase
    .from('trips')
    .select(
      `id, trip_number, status, start_time, routes(name), trip_stops(id, status), profiles!trips_driver_id_fkey(full_name)`
    )
    .eq('driver_id', driverId)
    .eq('date', today)
    .order('start_time', { ascending: true, nullsFirst: false });

  if (!data || data.length === 0) return [];

  return data.map((t) => {
    const stops = (t.trip_stops as { id: string; status: string }[]) ?? [];
    const completed = stops.filter((s) => s.status === 'completed').length;
    const routeName = (t.routes as { name: string } | null)?.name ?? 'Ruta sin asignar';
    const driverName = (t.profiles as { full_name: string } | null)?.full_name ?? 'Conductor';

    return {
      id: t.id,
      route: routeName,
      stops: stops.length,
      completed,
      status: t.status ?? 'pending',
      driver: driverName,
    };
  });
}

async function fetchRecentActivity(
  role: string | null,
  userId: string
) {
  const items: { icon: string; title: string; time: string; color: string }[] = [];

  const isOperator = role === 'production' || role === 'admin';

  if (isOperator) {
    const { data: recentBatches } = await supabase
      .from('production_batches')
      .select('batch_number, stage, created_at, plants(name)')
      .order('created_at', { ascending: false })
      .limit(5);

    for (const b of recentBatches ?? []) {
      if (!b.created_at) continue;
      const plantName = (b.plants as { name: string } | null)?.name ?? '';
      items.push({
        icon: 'Sprout',
        title: `Lote ${b.batch_number}${plantName ? ` - ${plantName}` : ''} creado`,
        time: formatTimeAgo(new Date(b.created_at)),
        color: 'text-green-600',
      });
    }

    const { data: recentApps } = await supabase
      .from('batch_applications')
      .select('date, type, product, created_at, batch_id')
      .order('created_at', { ascending: false })
      .limit(3);

    for (const a of recentApps ?? []) {
      if (!a.created_at) continue;
      items.push({
        icon: 'Droplet',
        title: `Aplicación: ${a.product ?? a.type} en lote`,
        time: formatTimeAgo(new Date(a.created_at)),
        color: 'text-blue-600',
      });
    }
  }

  if (role === 'driver') {
    const { data: recentTrips } = await supabase
      .from('trips')
      .select('trip_number, status, date, routes(name)')
      .eq('driver_id', userId)
      .order('date', { ascending: false })
      .limit(5);

    const statusMap: Record<string, string> = {
      pending: 'Pendiente',
      'in-progress': 'En curso',
      completed: 'Completado',
    };

    for (const t of recentTrips ?? []) {
      if (!t.date) continue;
      const routeName = (t.routes as { name: string } | null)?.name ?? 'Ruta sin asignar';
      const statusText = statusMap[t.status ?? ''] ?? t.status ?? 'Desconocido';
      items.push({
        icon: 'Truck',
        title: `Viaje ${t.trip_number} - ${routeName} (${statusText})`,
        time: formatTimeAgo(new Date(t.date)),
        color: 'text-purple-600',
      });
    }
  }

  return items.slice(0, 10);
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'ahora';
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  return date.toLocaleDateString('es-ES');
}
