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
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Tiempo de espera agotado")), 2000);
      });

      const sessionPromise = supabase.auth.getSession();

      const result = (await Promise.race([
        sessionPromise,
        timeoutPromise,
      ])) as any;

      const {
        data: { session },
        error: sessionError,
      } = result || { data: {} };

      if (sessionError) {
        console.error("Error al obtener la sesión:", sessionError.message);
        setUser("bbdd" as unknown as User);
        return;
      } else if (session?.user) {
        const userDataPromise = supabase
          .from("users")
          .select("id, email, username, role")
          .eq("id", session.user.id)
          .single();

        const userResult = (await Promise.race([
          userDataPromise,
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Tiempo de espera agotado")),
              3000
            )
          ),
        ])) as any;

        const { data: userData, error: userError } = userResult || {};

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
      setUser("bbdd" as unknown as User);
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
