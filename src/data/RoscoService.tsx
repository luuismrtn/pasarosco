import { createClient } from "@supabase/supabase-js";
import { Word, Rosco } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export class RoscoService {
  private supabase!: ReturnType<typeof createClient>;
  static instance: RoscoService;

  constructor() {
    if (!RoscoService.instance) {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      this.supabase = createClient(supabaseUrl, supabaseKey);
      RoscoService.instance = this;
    }
    return RoscoService.instance;
  }

  getSupabase() {
    return this.supabase;
  }

  // Función para comprobar la conexión a la base de datos
  async testConnection() {
    return await this.supabase.from("roscos").select("id").limit(1);
  }

  // Función para guardar o actualizar un rosco
  async saveRosco(
    palabras: Word[],
    theme: string,
    time: number,
    name: string,
    user_name: string,
    user_email: string,
    difficulty: string,
    roscoId?: string
  ) {
    const id = roscoId || uuidv4();

    if (roscoId) {
      const { data, error } = await this.supabase
        .from("roscos")
        .select("*")
        .eq("id", roscoId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error al verificar el rosco:", error);
        return null;
      }

      // Si el rosco existe, actualizamos
      if (data) {
        const { error: updateError } = await this.supabase
          .from("roscos")
          .update({
            words: palabras,
            theme,
            time,
            name,
            user_name,
            user_email,
            difficulty,
            date_modification: new Date().toISOString(),
          })
          .eq("id", roscoId);

        if (updateError) {
          console.error("Error al actualizar el rosco:", updateError);
          return null;
        }

        return roscoId;
      }
    }

    // Si el rosco no existe, lo insertamos
    const { error: insertError } = await this.supabase.from("roscos").insert([
      {
        id: id,
        user_name,
        user_email,
        words: palabras,
        theme,
        time,
        difficulty,
        date_modification: new Date().toISOString(),
        name: name || `Rosco_${id}`,
      },
    ]);

    if (insertError) {
      console.error("Error al guardar el rosco:", insertError);
      return null;
    }

    return id;
  }

  // Función para actualizar un rosco
  async updateRosco(
    roscoId: string,
    words: Word[],
    theme: string,
    time: number,
    name: string,
    difficulty: string
  ) {
    const { data, error } = await this.supabase
      .from("roscos")
      .update({
        name: name,
        words: words,
        theme: theme,
        time: time,
        difficulty,
        date_modification: new Date().toISOString(),
      })
      .eq("id", roscoId);

    if (error) {
      console.error("Error al actualizar el rosco:", error);
      return null;
    }

    return data;
  }

  // Función para obtener un rosco por su ID
  async getRoscoById(roscoId: string): Promise<Rosco | null> {
    const { data, error } = await this.supabase
      .from("roscos")
      .select("*")
      .eq("id", roscoId)
      .single();

    if (error) {
      console.error("Error al obtener el rosco:", error);
      return null;
    }

    return data as Rosco;
  }

  // Función para obtener todos los roscos por email
  async getRoscodByEmail(user_email: string): Promise<Rosco[]> {
    const { data, error } = await this.supabase
      .from("roscos")
      .select("*")
      .eq("user_email", user_email);

    if (error) {
      console.error(
        "Error al obtener los roscos del usuario por email:",
        error
      );
      return [];
    }

    return data as Rosco[];
  }

  // Función para obtener todos los roscos de un usuario
  async getRoscodByUser(nombreUsuario: string): Promise<Rosco[]> {
    const { data, error } = await this.supabase
      .from("roscos")
      .select("*")
      .eq("user_name", nombreUsuario);

    if (error) {
      console.error("Error al obtener los roscos del usuario:", error);
      return [];
    }

    return data as Rosco[];
  }

  // Método para obtener todos los roscos
  async getAllRoscos(): Promise<Rosco[]> {
    const { data, error } = await this.supabase.from("roscos").select("*");

    if (error) {
      console.error("Error al obtener los roscos:", error);
      return [];
    }

    return data as Rosco[];
  }

  async existsRosco(roscoId: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from("roscos")
        .select("*")
        .eq("id", roscoId)
        .single();

      if (error) {
        throw new Error(`Error al verificar el rosco: ${error.message}`);
      }

      return data !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // Función para eliminar un rosco por su ID
  async deleteRosco(roscoId: string) {
    const { data, error } = await this.supabase
      .from("roscos")
      .delete()
      .eq("id", roscoId);

    if (error) {
      console.error("Error al eliminar el rosco:", error);
      return null;
    }

    return data;
  }
}
