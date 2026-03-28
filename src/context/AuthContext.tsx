import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'plantia_user_id';

type AuthContextType = {
  userId: string | null;
  isLoading: boolean;
  setUserId: (id: string | null) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, _setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync(STORAGE_KEY)
      .then((id) => _setUserId(id))
      .finally(() => setIsLoading(false));
  }, []);

  const setUserId = async (id: string | null) => {
    if (id) {
      await SecureStore.setItemAsync(STORAGE_KEY, id);
    } else {
      await SecureStore.deleteItemAsync(STORAGE_KEY);
    }
    _setUserId(id);
  };

  return (
    <AuthContext.Provider value={{ userId, isLoading, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
