import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { RoscoService } from "../data/RoscoService";

import { User } from "types";

interface UserContextType {
  user: User | null;
  loadingUser: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  roscosService: RoscoService;
}
interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const roscosService = useMemo(() => new RoscoService(), []);

  const supabase = roscosService.getSupabase();

  const fetchUserFromSession = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error al obtener la sesión:", sessionError.message);
        setUser("bbdd" as unknown as User);
      } else if (session?.user) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id, email, username, role")
          .eq("id", session.user.id)
          .single();

        if (userError) {
          console.error("Error al obtener el usuario:", userError.message);
          setUser("bbdd" as unknown as User);
        } else {
          setUser(userData as unknown as User);
        }
      } else {
        console.log("No hay sesión activa.");
        setUser(null);
      }
    } catch (err) {
      console.error("Error inesperado al obtener la sesión:", err);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUserFromSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          fetchUserFromSession();
        } else {
          setUser(null);
          setLoadingUser(false);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase]);

  const getUser = (): User | null => {
    console.log("getUser", user);
    return user;
  };

  return (
    <UserContext.Provider
      value={{
        user: getUser(),
        loadingUser,
        setUser,
        roscosService,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
