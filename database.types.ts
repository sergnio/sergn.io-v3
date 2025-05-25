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
          coffee_id: string | null
          grinder_id: string | null
          id: string
          name: Database["public"]["Enums"]["brew_method_name"]
        }
        Insert: {
          coffee_id?: string | null
          grinder_id?: string | null
          id?: string
          name: Database["public"]["Enums"]["brew_method_name"]
        }
        Update: {
          coffee_id?: string | null
          grinder_id?: string | null
          id?: string
          name?: Database["public"]["Enums"]["brew_method_name"]
        }
        Relationships: [
          {
            foreignKeyName: "brew_method_coffee_id_fkey"
            columns: ["coffee_id"]
            isOneToOne: false
            referencedRelation: "coffee"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brew_method_grinder_id_fkey"
            columns: ["grinder_id"]
            isOneToOne: false
            referencedRelation: "grinder"
            referencedColumns: ["id"]
          },
        ]
      }
      coffee: {
        Row: {
          bag_size_id: string | null
          bought_from: string | null
          id: string
          image_url: string | null
          name: string
          price: number | null
        }
        Insert: {
          bag_size_id?: string | null
          bought_from?: string | null
          id?: string
          image_url?: string | null
          name: string
          price?: number | null
        }
        Update: {
          bag_size_id?: string | null
          bought_from?: string | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number | null
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
      grinder: {
        Row: {
          id: string
          number: number | null
          rotations: number | null
          setting: number | null
          type: Database["public"]["Enums"]["grinder_type"]
        }
        Insert: {
          id?: string
          number?: number | null
          rotations?: number | null
          setting?: number | null
          type: Database["public"]["Enums"]["grinder_type"]
        }
        Update: {
          id?: string
          number?: number | null
          rotations?: number | null
          setting?: number | null
          type?: Database["public"]["Enums"]["grinder_type"]
        }
        Relationships: []
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
