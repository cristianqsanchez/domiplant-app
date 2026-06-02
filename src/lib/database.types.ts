export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.5'
  }
  public: {
    Tables: {
      areas: {
        Row: {
          beds_count: number
          capacity: number
          created_at: string | null
          description: string | null
          id: string
          length: number | null
          name: string
          type: string
          updated_at: string | null
          width: number | null
        }
        Insert: {
          beds_count: number
          capacity: number
          created_at?: string | null
          description?: string | null
          id?: string
          length?: number | null
          name: string
          type: string
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          beds_count?: number
          capacity?: number
          created_at?: string | null
          description?: string | null
          id?: string
          length?: number | null
          name?: string
          type?: string
          updated_at?: string | null
          width?: number | null
        }
        Relationships: []
      }
      batch_applications: {
        Row: {
          applied_by: string | null
          batch_id: string | null
          created_at: string | null
          date: string
          id: string
          product: string
          quantity: string
          type: string
        }
        Insert: {
          applied_by?: string | null
          batch_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          product: string
          quantity: string
          type: string
        }
        Update: {
          applied_by?: string | null
          batch_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          product?: string
          quantity?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: 'batch_applications_applied_by_fkey'
            columns: ['applied_by']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'batch_applications_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
        ]
      }
      batch_beds: {
        Row: {
          batch_id: string | null
          bed_id: string | null
          created_at: string | null
          id: string
          quantity_assigned: number
        }
        Insert: {
          batch_id?: string | null
          bed_id?: string | null
          created_at?: string | null
          id?: string
          quantity_assigned: number
        }
        Update: {
          batch_id?: string | null
          bed_id?: string | null
          created_at?: string | null
          id?: string
          quantity_assigned?: number
        }
        Relationships: [
          {
            foreignKeyName: 'batch_beds_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'batch_beds_bed_id_fkey'
            columns: ['bed_id']
            isOneToOne: false
            referencedRelation: 'beds'
            referencedColumns: ['id']
          },
        ]
      }
      batch_losses: {
        Row: {
          batch_id: string | null
          bed_id: string | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          quantity: number
          reason: string
        }
        Insert: {
          batch_id?: string | null
          bed_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          quantity: number
          reason: string
        }
        Update: {
          batch_id?: string | null
          bed_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          quantity?: number
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: 'batch_losses_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'batch_losses_bed_id_fkey'
            columns: ['bed_id']
            isOneToOne: false
            referencedRelation: 'beds'
            referencedColumns: ['id']
          },
        ]
      }
      batch_photos: {
        Row: {
          batch_id: string | null
          created_at: string | null
          date: string
          file_path: string | null
          id: string
          name: string | null
          temp_id: string | null
          url: string
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          date?: string
          file_path?: string | null
          id?: string
          name?: string | null
          temp_id?: string | null
          url: string
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          date?: string
          file_path?: string | null
          id?: string
          name?: string | null
          temp_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: 'batch_photos_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
        ]
      }
      beds: {
        Row: {
          area_id: string
          capacity: number
          created_at: string | null
          id: string
          name: string
          occupied: number | null
          updated_at: string | null
        }
        Insert: {
          area_id: string
          capacity: number
          created_at?: string | null
          id?: string
          name: string
          occupied?: number | null
          updated_at?: string | null
        }
        Update: {
          area_id?: string
          capacity?: number
          created_at?: string | null
          id?: string
          name?: string
          occupied?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'beds_area_id_fkey'
            columns: ['area_id']
            isOneToOne: false
            referencedRelation: 'areas'
            referencedColumns: ['id']
          },
        ]
      }
      branches: {
        Row: {
          address: string
          capacity: string | null
          created_at: string | null
          email: string
          id: string
          manager: string | null
          name: string
          phone: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          capacity?: string | null
          created_at?: string | null
          email: string
          id?: string
          manager?: string | null
          name: string
          phone: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          capacity?: string | null
          created_at?: string | null
          email?: string
          id?: string
          manager?: string | null
          name?: string
          phone?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      container_purchase_alerts: {
        Row: {
          available_quantity: number
          batch_id: string
          container_id: string
          created_at: string | null
          id: string
          is_resolved: boolean | null
          required_quantity: number
          resolved_at: string | null
        }
        Insert: {
          available_quantity: number
          batch_id: string
          container_id: string
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          required_quantity: number
          resolved_at?: string | null
        }
        Update: {
          available_quantity?: number
          batch_id?: string
          container_id?: string
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          required_quantity?: number
          resolved_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'container_purchase_alerts_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'container_purchase_alerts_container_id_fkey'
            columns: ['container_id']
            isOneToOne: false
            referencedRelation: 'inventory_containers'
            referencedColumns: ['id']
          },
        ]
      }
      container_types: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      inventory_containers: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          min_stock: number
          name: string
          stock: number
          type: string
          unit: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_stock?: number
          name: string
          stock?: number
          type: string
          unit: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_stock?: number
          name?: string
          stock?: number
          type?: string
          unit?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory_materials: {
        Row: {
          category: string
          created_at: string | null
          id: string
          is_active: boolean | null
          min_stock: number
          name: string
          stock: number
          unit: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_stock?: number
          name: string
          stock?: number
          unit: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_stock?: number
          name?: string
          stock?: number
          unit?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      inventory_movements: {
        Row: {
          batch_id: string | null
          created_at: string | null
          id: string
          invoice_number: string | null
          item_id: string
          item_name: string | null
          item_type: string
          movement_type: string
          notes: string | null
          quantity: number
          reason: string | null
          supplier: string | null
          user_id: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          invoice_number?: string | null
          item_id: string
          item_name?: string | null
          item_type: string
          movement_type: string
          notes?: string | null
          quantity: number
          reason?: string | null
          supplier?: string | null
          user_id?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          id?: string
          invoice_number?: string | null
          item_id?: string
          item_name?: string | null
          item_type?: string
          movement_type?: string
          notes?: string | null
          quantity?: number
          reason?: string | null
          supplier?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'inventory_movements_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'inventory_movements_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      invoice_items: {
        Row: {
          id: string
          invoice_id: string | null
          plant_name: string
          quantity: number
          sku: string | null
          subtotal: number
          unit_price: number
        }
        Insert: {
          id?: string
          invoice_id?: string | null
          plant_name: string
          quantity: number
          sku?: string | null
          subtotal: number
          unit_price: number
        }
        Update: {
          id?: string
          invoice_id?: string | null
          plant_name?: string
          quantity?: number
          sku?: string | null
          subtotal?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: 'invoice_items_invoice_id_fkey'
            columns: ['invoice_id']
            isOneToOne: false
            referencedRelation: 'invoices'
            referencedColumns: ['id']
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          customer_name: string
          customer_rnc: string | null
          date: string
          due_date: string
          file_url: string | null
          id: string
          invoice_number: string
          notes: string | null
          odoo_id: string | null
          payment_method: string | null
          status: string
          total: number
        }
        Insert: {
          created_at?: string | null
          customer_name: string
          customer_rnc?: string | null
          date: string
          due_date: string
          file_url?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          odoo_id?: string | null
          payment_method?: string | null
          status?: string
          total: number
        }
        Update: {
          created_at?: string | null
          customer_name?: string
          customer_rnc?: string | null
          date?: string
          due_date?: string
          file_url?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          odoo_id?: string | null
          payment_method?: string | null
          status?: string
          total?: number
        }
        Relationships: []
      }
      material_types: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      mother_plant_cuts: {
        Row: {
          created_at: string | null
          cut_date: string
          cuttings_quantity: number
          id: string
          mother_plant_id: string | null
          notes: string | null
          taken_by: string | null
        }
        Insert: {
          created_at?: string | null
          cut_date: string
          cuttings_quantity: number
          id?: string
          mother_plant_id?: string | null
          notes?: string | null
          taken_by?: string | null
        }
        Update: {
          created_at?: string | null
          cut_date?: string
          cuttings_quantity?: number
          id?: string
          mother_plant_id?: string | null
          notes?: string | null
          taken_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'mother_plant_cuts_mother_plant_id_fkey'
            columns: ['mother_plant_id']
            isOneToOne: false
            referencedRelation: 'mother_plants'
            referencedColumns: ['id']
          },
        ]
      }
      mother_plants: {
        Row: {
          acquisition_date: string
          available_from: string | null
          created_at: string | null
          id: string
          location: string
          notes: string | null
          plant_id: string | null
          rest_days: number | null
          retired_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          acquisition_date: string
          available_from?: string | null
          created_at?: string | null
          id?: string
          location: string
          notes?: string | null
          plant_id?: string | null
          rest_days?: number | null
          retired_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          acquisition_date?: string
          available_from?: string | null
          created_at?: string | null
          id?: string
          location?: string
          notes?: string | null
          plant_id?: string | null
          rest_days?: number | null
          retired_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'mother_plants_plant_id_fkey'
            columns: ['plant_id']
            isOneToOne: false
            referencedRelation: 'plants'
            referencedColumns: ['id']
          },
        ]
      }
      plant_skus: {
        Row: {
          container_id: string | null
          created_at: string | null
          id: string
          plant_id: string
          price: number
          size: string
        }
        Insert: {
          container_id?: string | null
          created_at?: string | null
          id?: string
          plant_id: string
          price: number
          size: string
        }
        Update: {
          container_id?: string | null
          created_at?: string | null
          id?: string
          plant_id?: string
          price?: number
          size?: string
        }
        Relationships: [
          {
            foreignKeyName: 'plant_skus_container_id_fkey'
            columns: ['container_id']
            isOneToOne: false
            referencedRelation: 'inventory_containers'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'plant_skus_plant_id_fkey'
            columns: ['plant_id']
            isOneToOne: false
            referencedRelation: 'plants'
            referencedColumns: ['id']
          },
        ]
      }
      plant_species: {
        Row: {
          code: string | null
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      plants: {
        Row: {
          code: string | null
          created_at: string | null
          difficulty: string
          fixed_total_cost: number | null
          id: string
          image_url: string | null
          name: string
          production_days: number
          propagation: string
          scientific_name: string | null
          species_id: string | null
          sunlight: string
          temperature: string | null
          updated_at: string | null
          watering: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          difficulty: string
          fixed_total_cost?: number | null
          id?: string
          image_url?: string | null
          name: string
          production_days: number
          propagation: string
          scientific_name?: string | null
          species_id?: string | null
          sunlight: string
          temperature?: string | null
          updated_at?: string | null
          watering: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          difficulty?: string
          fixed_total_cost?: number | null
          id?: string
          image_url?: string | null
          name?: string
          production_days?: number
          propagation?: string
          scientific_name?: string | null
          species_id?: string | null
          sunlight?: string
          temperature?: string | null
          updated_at?: string | null
          watering?: string
        }
        Relationships: [
          {
            foreignKeyName: 'plants_species_id_fkey'
            columns: ['species_id']
            isOneToOne: false
            referencedRelation: 'plant_species'
            referencedColumns: ['id']
          },
        ]
      }
      production_batches: {
        Row: {
          area_id: string | null
          batch_number: string
          bed_id: string | null
          created_at: string | null
          current_quantity: number | null
          end_date: string | null
          expected_duration: number
          id: string
          notes: string | null
          plant_id: string | null
          priority: string | null
          progress: number | null
          quantity: number
          sku: string
          sku_id: string | null
          stage: string | null
          start_date: string
          status: string | null
          target_market: string | null
          updated_at: string | null
        }
        Insert: {
          area_id?: string | null
          batch_number: string
          bed_id?: string | null
          created_at?: string | null
          current_quantity?: number | null
          end_date?: string | null
          expected_duration: number
          id?: string
          notes?: string | null
          plant_id?: string | null
          priority?: string | null
          progress?: number | null
          quantity: number
          sku: string
          sku_id?: string | null
          stage?: string | null
          start_date: string
          status?: string | null
          target_market?: string | null
          updated_at?: string | null
        }
        Update: {
          area_id?: string | null
          batch_number?: string
          bed_id?: string | null
          created_at?: string | null
          current_quantity?: number | null
          end_date?: string | null
          expected_duration?: number
          id?: string
          notes?: string | null
          plant_id?: string | null
          priority?: string | null
          progress?: number | null
          quantity?: number
          sku?: string
          sku_id?: string | null
          stage?: string | null
          start_date?: string
          status?: string | null
          target_market?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'production_batches_area_id_fkey'
            columns: ['area_id']
            isOneToOne: false
            referencedRelation: 'areas'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'production_batches_bed_id_fkey'
            columns: ['bed_id']
            isOneToOne: false
            referencedRelation: 'beds'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'production_batches_plant_id_fkey'
            columns: ['plant_id']
            isOneToOne: false
            referencedRelation: 'plants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'production_batches_sku_id_fkey'
            columns: ['sku_id']
            isOneToOne: false
            referencedRelation: 'plant_skus'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      returns: {
        Row: {
          action: string
          branch_id: string | null
          client: string
          created_at: string | null
          id: string
          notes: string | null
          plant_id: string | null
          quantity: number
          reason: string
          return_number: string
          sale_id: string | null
          sku_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          action: string
          branch_id?: string | null
          client: string
          created_at?: string | null
          id?: string
          notes?: string | null
          plant_id?: string | null
          quantity: number
          reason: string
          return_number: string
          sale_id?: string | null
          sku_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          action?: string
          branch_id?: string | null
          client?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          plant_id?: string | null
          quantity?: number
          reason?: string
          return_number?: string
          sale_id?: string | null
          sku_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'returns_branch_id_fkey'
            columns: ['branch_id']
            isOneToOne: false
            referencedRelation: 'branches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'returns_plant_id_fkey'
            columns: ['plant_id']
            isOneToOne: false
            referencedRelation: 'plants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'returns_sale_id_fkey'
            columns: ['sale_id']
            isOneToOne: false
            referencedRelation: 'sales'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'returns_sku_id_fkey'
            columns: ['sku_id']
            isOneToOne: false
            referencedRelation: 'plant_skus'
            referencedColumns: ['id']
          },
        ]
      }
      routes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      sale_items: {
        Row: {
          batch_id: string | null
          bed_id: string | null
          created_at: string | null
          id: string
          plant_id: string | null
          quantity: number
          sale_id: string
          sku_id: string | null
          unit_price: number
        }
        Insert: {
          batch_id?: string | null
          bed_id?: string | null
          created_at?: string | null
          id?: string
          plant_id?: string | null
          quantity: number
          sale_id: string
          sku_id?: string | null
          unit_price: number
        }
        Update: {
          batch_id?: string | null
          bed_id?: string | null
          created_at?: string | null
          id?: string
          plant_id?: string | null
          quantity?: number
          sale_id?: string
          sku_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: 'sale_items_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sale_items_bed_id_fkey'
            columns: ['bed_id']
            isOneToOne: false
            referencedRelation: 'beds'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sale_items_plant_id_fkey'
            columns: ['plant_id']
            isOneToOne: false
            referencedRelation: 'plants'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sale_items_sale_id_fkey'
            columns: ['sale_id']
            isOneToOne: false
            referencedRelation: 'sales'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sale_items_sku_id_fkey'
            columns: ['sku_id']
            isOneToOne: false
            referencedRelation: 'plant_skus'
            referencedColumns: ['id']
          },
        ]
      }
      sales: {
        Row: {
          branch_id: string | null
          client: string
          created_at: string | null
          id: string
          notes: string | null
          payment_method: string
          sale_number: string
          status: string | null
          total: number | null
          user_id: string | null
        }
        Insert: {
          branch_id?: string | null
          client: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method: string
          sale_number: string
          status?: string | null
          total?: number | null
          user_id?: string | null
        }
        Update: {
          branch_id?: string | null
          client?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_method?: string
          sale_number?: string
          status?: string | null
          total?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'sales_branch_id_fkey'
            columns: ['branch_id']
            isOneToOne: false
            referencedRelation: 'branches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'sales_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
        ]
      }
      trip_stops: {
        Row: {
          address: string
          arrival_time: string | null
          batch_id: string | null
          client: string
          created_at: string | null
          departure_time: string | null
          id: string
          incidents: string | null
          notes: string | null
          order_index: number
          plants_delivered: number | null
          returns: number | null
          sku_id: string | null
          status: string | null
          trip_id: string | null
        }
        Insert: {
          address: string
          arrival_time?: string | null
          batch_id?: string | null
          client: string
          created_at?: string | null
          departure_time?: string | null
          id?: string
          incidents?: string | null
          notes?: string | null
          order_index: number
          plants_delivered?: number | null
          returns?: number | null
          sku_id?: string | null
          status?: string | null
          trip_id?: string | null
        }
        Update: {
          address?: string
          arrival_time?: string | null
          batch_id?: string | null
          client?: string
          created_at?: string | null
          departure_time?: string | null
          id?: string
          incidents?: string | null
          notes?: string | null
          order_index?: number
          plants_delivered?: number | null
          returns?: number | null
          sku_id?: string | null
          status?: string | null
          trip_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'trip_stops_batch_id_fkey'
            columns: ['batch_id']
            isOneToOne: false
            referencedRelation: 'production_batches'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'trip_stops_sku_id_fkey'
            columns: ['sku_id']
            isOneToOne: false
            referencedRelation: 'plant_skus'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'trip_stops_trip_id_fkey'
            columns: ['trip_id']
            isOneToOne: false
            referencedRelation: 'trips'
            referencedColumns: ['id']
          },
        ]
      }
      trips: {
        Row: {
          created_at: string | null
          date: string
          driver_id: string | null
          end_time: string | null
          id: string
          route_id: string | null
          start_time: string | null
          status: string | null
          trip_number: string
          updated_at: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          driver_id?: string | null
          end_time?: string | null
          id?: string
          route_id?: string | null
          start_time?: string | null
          status?: string | null
          trip_number: string
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          driver_id?: string | null
          end_time?: string | null
          id?: string
          route_id?: string | null
          start_time?: string | null
          status?: string | null
          trip_number?: string
          updated_at?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'trips_driver_id_fkey'
            columns: ['driver_id']
            isOneToOne: false
            referencedRelation: 'profiles'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'trips_route_id_fkey'
            columns: ['route_id']
            isOneToOne: false
            referencedRelation: 'routes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'trips_vehicle_id_fkey'
            columns: ['vehicle_id']
            isOneToOne: false
            referencedRelation: 'vehicles'
            referencedColumns: ['id']
          },
        ]
      }
      vehicles: {
        Row: {
          capacity: number
          created_at: string | null
          id: string
          name: string
          plate: string
          status: string | null
          type: string
        }
        Insert: {
          capacity: number
          created_at?: string | null
          id?: string
          name: string
          plate: string
          status?: string | null
          type: string
        }
        Update: {
          capacity?: number
          created_at?: string | null
          id?: string
          name?: string
          plate?: string
          status?: string | null
          type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission']
        }
        Returns: boolean
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      upsert_plant_skus: {
        Args: { p_plant_id: string; p_skus: Json }
        Returns: undefined
      }
    }
    Enums: {
      app_permission:
        | 'dashboard.read'
        | 'catalog.read'
        | 'production.read'
        | 'planning.read'
        | 'nursery_areas.read'
        | 'inventory.read'
        | 'sales.read'
        | 'returns.read'
        | 'logistics.read'
        | 'billing.read'
        | 'settings.read'
      app_role: 'admin' | 'sales_logistics'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_permission: [
        'dashboard.read',
        'catalog.read',
        'production.read',
        'planning.read',
        'nursery_areas.read',
        'inventory.read',
        'sales.read',
        'returns.read',
        'logistics.read',
        'billing.read',
        'settings.read',
      ],
      app_role: ['admin', 'sales_logistics'],
    },
  },
} as const
