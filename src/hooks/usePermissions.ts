import { useAuth } from '@/contexts/AuthContext';

export function usePermissions() {
  const { user, loading } = useAuth();

  function isOperator(): boolean {
    return user?.role === 'production' || user?.role === 'admin';
  }

  function isDriver(): boolean {
    return user?.role === 'driver';
  }

  return { isOperator, isDriver, isLoading: loading };
}
