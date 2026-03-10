import { useState, useEffect, createContext, useContext } from 'react';

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  loginWithPin: (pin: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ADMIN_PIN = '3011';
const STORAGE_KEY = 'admin_authenticated';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setIsAdmin(stored === 'true');
    setLoading(false);
  }, []);

  const loginWithPin = (pin: string) => {
    if (pin === ADMIN_PIN) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, loginWithPin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
