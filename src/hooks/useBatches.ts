import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

const STAGE_LABELS: Record<string, string> = {
  propagation: 'Propagación',
  rooting: 'Enraizado',
  transplant: 'Trasplante',
  acclimation: 'Aclimatación',
  ready: 'Listo',
  sold: 'Vendido',
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

function computeProgressStatus(
  progress: number,
  stage: string,
): 'on-track' | 'warning' | 'delayed' {
  if (stage === 'ready' || stage === 'sold') return 'on-track';
  if (progress >= 50) return 'on-track';
  if (progress >= 25) return 'warning';
  return 'delayed';
}

export function useBatches(search?: string, stage?: string) {
  const [allBatches, setAllBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBatches = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await supabase
        .from('production_batches')
        .select(
          `id,
          batch_number,
          quantity,
          current_quantity,
          stage,
          progress,
          start_date,
          expected_duration,
          status,
          plants(name),
          batch_beds(beds:bed_id(name))`,
        )
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;

      const today = new Date();
      const mapped: BatchItem[] = (data ?? []).map((b: any) => {
        const start = new Date(b.start_date);
        const elapsed = Math.floor(
          (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );
        const daysRemaining = Math.max(0, b.expected_duration - elapsed);
        const progress = b.progress ?? 0;
        const beds = b.batch_beds ?? [];
        const location =
          beds.length > 0
            ? beds
                .map((bb: any) => bb.beds?.name)
                .filter(Boolean)
                .join(', ')
            : '-';

        return {
          id: b.id,
          batch_number: b.batch_number,
          species: b.plants?.name?.trim() ?? 'Sin especie',
          quantity: b.quantity,
          current_quantity: b.current_quantity ?? b.quantity,
          stage: b.stage ?? 'unknown',
          stage_label: STAGE_LABELS[b.stage ?? ''] ?? b.stage ?? 'Desconocido',
          progress,
          location,
          days_remaining: daysRemaining,
          status: computeProgressStatus(progress, b.stage ?? ''),
        };
      });

      setAllBatches(mapped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar lotes',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

  const filtered = useMemo(() => {
    let result = allBatches;

    if (stage && stage !== 'Todos') {
      const stageKey = Object.entries(STAGE_LABELS).find(
        ([, label]) => label === stage,
      )?.[0];
      if (stageKey) {
        result = result.filter((b) => b.stage === stageKey);
      }
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.species.toLowerCase().includes(q) ||
          b.location.toLowerCase().includes(q),
      );
    }

    return result;
  }, [allBatches, search, stage]);

  return { batches: filtered, loading, error, refetch: fetchBatches };
}
