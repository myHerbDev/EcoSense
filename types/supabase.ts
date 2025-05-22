export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      notes: {
        Row: {
          id: number
          title: string
        }
        Insert: {
          id?: never // Generated as identity
          title: string
        }
        Update: {
          id?: never
          title?: string
        }
      }
      // Add other tables here
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
