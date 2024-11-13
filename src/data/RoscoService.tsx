import { createClient } from "@supabase/supabase-js";
import { Word, Rosco } from "../types/types";

export class RoscoService {
  private supabase;

  constructor() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Función para guardar o actualizar un rosco
  async saveRosco(
    nombreUsuario: string,
    palabras: Word[],
    theme: string,
    time: number,
    roscoId?: number
  ) {

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

      if (data) {
        const { data: updatedData, error: updateError } = await this.supabase
          .from("roscos")
          .update({
            words: palabras,
            theme,
            time,
            date_modification: new Date().toISOString(),
          })
          .eq("id", roscoId);

        if (updateError) {
          console.error("Error al actualizar el rosco:", updateError);
          return null;
        }

        return updatedData;
      }
    }

    const { data, error } = await this.supabase.from("roscos").insert([
      {
        id: roscoId,
        user_name: nombreUsuario,
        words: palabras,
        theme,
        time,
        date_modification: new Date().toISOString(),
        name: `Rosco_${roscoId}`,
      },
    ]);

    if (error) {
      console.error("Error al guardar el rosco:", error);
      return null;
    }

    return data;
  }

  // Función para actualizar un rosco
  async updateRosco(roscoId: number, palabras: Word[], theme: string, time: number, name: string, user_name: string) {
    console.log("Palabras:", palabras);
    const { data, error } = await this.supabase
      .from("roscos")
      .update({
        name: name,
        words: palabras,
        theme: theme,
        time: time,
        user_name: user_name,
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
  async getRoscoById(roscoId: number): Promise<Rosco | null> {
    const { data, error } = await this.supabase
      .from("roscos")
      .select("*")
      .eq("id", roscoId)
      .single();

    if (error) {
      console.error("Error al obtener el rosco:", error);
      return null;
    }

    console.log("Rosco:", data);

    return data;
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

    return data;
  }

// Método para obtener todos los roscos
async getAllRoscos(): Promise<Rosco[]> {
    const { data, error } = await this.supabase
      .from("roscos")
      .select("id, user_name, date_modification, name, theme, time, words");
  
    if (error) {
      console.error("Error al obtener los roscos:", error);
      return [];
    }
  
    return data;
  }

  // Función para eliminar un rosco por su ID
  async deleteRosco(roscoId: number) {
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
