import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { RoscoService } from '../data/RoscoService';

interface UserContextType {
  user: any;
  loadingUser: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  roscosService: RoscoService;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const roscosService = new RoscoService();
  const supabase = roscosService.getSupabase();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error al obtener el usuario:', error.message);
      } else {
        setUser(data?.user);
      }
      setLoadingUser(false);
    };

    fetchUser();
  }, [supabase]);

  // Escuchar cambios de sesión
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user, loadingUser, setUser, roscosService }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
