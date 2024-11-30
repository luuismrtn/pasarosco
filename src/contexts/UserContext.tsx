import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { RoscoService } from "../data/RoscoService";

interface UserContextType {
  user: user | null;
  loadingUser: boolean;
  setUser: React.Dispatch<React.SetStateAction<user | null>>;
  roscosService: RoscoService;
}

interface user {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<user | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const roscosService = useMemo(() => new RoscoService(), []);

  const supabase = roscosService.getSupabase();

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);

      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Error al obtener la sesión:", sessionError.message);
          setUser(null);
        } else if (session?.user) {
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, email, username, role")
            .eq("id", session.user.id)
            .single();

          if (userError) {
            console.error("Error al obtener el rol del usuario:", userError.message);
            setUser(null);
          } else {
            setUser(userData as user);
          }
        } else {
          console.log("No hay sesión activa.");
          setUser(null);
        }
      } catch (err) {
        console.error("Error inesperado al obtener la sesión:", err);
        setUser(null);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          supabase
            .from("users")
            .select("id, email, username, role")
            .eq("id", session.user.id)
            .single()
            .then(({ data, error }) => {
              if (error) {
                console.error("Error al obtener el rol del usuario:", error.message);
                setUser(null);
              } else {
                setUser(data as user);
              }
              setLoadingUser(false);
            });
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

  return (
    <UserContext.Provider value={{ user, loadingUser, setUser, roscosService }}>
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
