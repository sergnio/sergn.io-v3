export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bag_size: {
        Row: {
          g: number | null
          id: string
          oz: number | null
        }
        Insert: {
          g?: number | null
          id?: string
          oz?: number | null
        }
        Update: {
          g?: number | null
          id?: string
          oz?: number | null
        }
        Relationships: []
      }
      brew_method: {
        Row: {
          id: string
          name: Database["public"]["Enums"]["brew_method_name"]
        }
        Insert: {
          id?: string
          name: Database["public"]["Enums"]["brew_method_name"]
        }
        Update: {
          id?: string
          name?: Database["public"]["Enums"]["brew_method_name"]
        }
        Relationships: []
      }
      coffee: {
        Row: {
          bag_size_id: string
          bought_from: string
          id: string
          image_url: string | null
          name: string
          price: number
        }
        Insert: {
          bag_size_id: string
          bought_from: string
          id?: string
          image_url?: string | null
          name: string
          price: number
        }
        Update: {
          bag_size_id?: string
          bought_from?: string
          id?: string
          image_url?: string | null
          name?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "coffee_bag_size_id_fkey"
            columns: ["bag_size_id"]
            isOneToOne: false
            referencedRelation: "bag_size"
            referencedColumns: ["id"]
          },
        ]
      }
      coffee_brew_method: {
        Row: {
          brew_method_id: string
          coffee_id: string
          grinder_settings_id: string
        }
        Insert: {
          brew_method_id: string
          coffee_id: string
          grinder_settings_id: string
        }
        Update: {
          brew_method_id?: string
          coffee_id?: string
          grinder_settings_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coffee_brew_method_brew_method_id_fkey"
            columns: ["brew_method_id"]
            isOneToOne: false
            referencedRelation: "brew_method"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coffee_brew_method_coffee_id_fkey"
            columns: ["coffee_id"]
            isOneToOne: false
            referencedRelation: "coffee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coffee_brew_method_grinder_settings_id_fkey"
            columns: ["grinder_settings_id"]
            isOneToOne: false
            referencedRelation: "grinder_settings"
            referencedColumns: ["id"]
          },
        ]
      }
      grinder_model: {
        Row: {
          id: string
          type: Database["public"]["Enums"]["grinder_type"]
        }
        Insert: {
          id?: string
          type: Database["public"]["Enums"]["grinder_type"]
        }
        Update: {
          id?: string
          type?: Database["public"]["Enums"]["grinder_type"]
        }
        Relationships: []
      }
      grinder_settings: {
        Row: {
          grinder_model_id: string
          id: string
          number: number | null
          rotations: number | null
          setting: number | null
        }
        Insert: {
          grinder_model_id: string
          id?: string
          number?: number | null
          rotations?: number | null
          setting?: number | null
        }
        Update: {
          grinder_model_id?: string
          id?: string
          number?: number | null
          rotations?: number | null
          setting?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "grinder_grinder_model_id_fkey"
            columns: ["grinder_model_id"]
            isOneToOne: false
            referencedRelation: "grinder_model"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      brew_method_name: "Moka Pot" | "Filter" | "v60" | "Espresso"
      grinder_type: "Manual" | "Niche Zero"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      brew_method_name: ["Moka Pot", "Filter", "v60", "Espresso"],
      grinder_type: ["Manual", "Niche Zero"],
    },
  },
} as const
