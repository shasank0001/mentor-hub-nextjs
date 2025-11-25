export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          role: "student" | "mentor" | "admin";
          prelims_access: boolean;
          mains_access: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: "student" | "mentor" | "admin";
          prelims_access?: boolean;
          mains_access?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          role?: "student" | "mentor" | "admin";
          prelims_access?: boolean;
          mains_access?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          exam_type: "prelims" | "mains";
          amount: number;
          currency: string;
          razorpay_order_id: string | null;
          razorpay_payment_id: string | null;
          razorpay_signature: string | null;
          idempotency_key: string | null;
          status: "pending" | "completed" | "failed";
          failure_reason: string | null;
          order_payload: Json;
          verification_payload: Json;
          webhook_payload: Json;
          verified_at: string | null;
          access_granted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          exam_type: "prelims" | "mains";
          amount: number;
          currency?: string;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          razorpay_signature?: string | null;
          idempotency_key?: string | null;
          status?: "pending" | "completed" | "failed";
          failure_reason?: string | null;
          order_payload?: Json;
          verification_payload?: Json;
          webhook_payload?: Json;
          verified_at?: string | null;
          access_granted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          exam_type?: "prelims" | "mains";
          amount?: number;
          currency?: string;
          razorpay_order_id?: string | null;
          razorpay_payment_id?: string | null;
          razorpay_signature?: string | null;
          idempotency_key?: string | null;
          status?: "pending" | "completed" | "failed";
          failure_reason?: string | null;
          order_payload?: Json;
          verification_payload?: Json;
          webhook_payload?: Json;
          verified_at?: string | null;
          access_granted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      prelims_questions: {
        Row: {
          id: string;
          prompt: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_option: number;
          difficulty: "easy" | "medium" | "hard" | null;
          topic: string | null;
          marks: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          prompt: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_option: number;
          difficulty?: "easy" | "medium" | "hard" | null;
          topic?: string | null;
          marks?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          prompt?: string;
          option_a?: string;
          option_b?: string;
          option_c?: string;
          option_d?: string;
          correct_option?: number;
          difficulty?: "easy" | "medium" | "hard" | null;
          topic?: string | null;
          marks?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      mains_questions: {
        Row: {
          id: string;
          prompt: string;
          marks: number;
          expected_length: string | null;
          topic: string | null;
          difficulty: "easy" | "medium" | "hard" | null;
          sample_answer: string | null;
          evaluation_criteria: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          prompt: string;
          marks: number;
          expected_length?: string | null;
          topic?: string | null;
          difficulty?: "easy" | "medium" | "hard" | null;
          sample_answer?: string | null;
          evaluation_criteria?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          prompt?: string;
          marks?: number;
          expected_length?: string | null;
          topic?: string | null;
          difficulty?: "easy" | "medium" | "hard" | null;
          sample_answer?: string | null;
          evaluation_criteria?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      prelims_attempts: {
        Row: {
          id: string;
          user_id: string;
          attempt_number: number;
          question_ids: string[];
          answers: Json;
          status: "in_progress" | "paused" | "submitted";
          started_at: string | null;
          submitted_at: string | null;
          time_remaining: number | null;
          score: number | null;
          total_questions: number | null;
          percentage: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          attempt_number: number;
          question_ids: string[];
          answers?: Json;
          status?: "in_progress" | "paused" | "submitted";
          started_at?: string | null;
          submitted_at?: string | null;
          time_remaining?: number | null;
          score?: number | null;
          total_questions?: number | null;
          percentage?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          attempt_number?: number;
          question_ids?: string[];
          answers?: Json;
          status?: "in_progress" | "paused" | "submitted";
          started_at?: string | null;
          submitted_at?: string | null;
          time_remaining?: number | null;
          score?: number | null;
          total_questions?: number | null;
          percentage?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prelims_attempts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      mains_submissions: {
        Row: {
          id: string;
          user_id: string;
          question_id: string;
          file_path: string;
          storage_key: string;
          original_filename: string;
          content_type: string | null;
          file_size: number | null;
          compressed_size: number | null;
          checksum: string | null;
          client_metadata: Json;
          status: "pending" | "under_review" | "evaluated";
          score: number | null;
          feedback: string | null;
          assigned_to: string | null;
          evaluated_by: string | null;
          evaluated_at: string | null;
          retention_expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          question_id: string;
          file_path: string;
          storage_key: string;
          original_filename: string;
          content_type?: string | null;
          file_size?: number | null;
          compressed_size?: number | null;
          checksum?: string | null;
          client_metadata?: Json;
          status?: "pending" | "under_review" | "evaluated";
          score?: number | null;
          feedback?: string | null;
          assigned_to?: string | null;
          evaluated_by?: string | null;
          evaluated_at?: string | null;
          retention_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          question_id?: string;
          file_path?: string;
          storage_key?: string;
          original_filename?: string;
          content_type?: string | null;
          file_size?: number | null;
          compressed_size?: number | null;
          checksum?: string | null;
          client_metadata?: Json;
          status?: "pending" | "under_review" | "evaluated";
          score?: number | null;
          feedback?: string | null;
          assigned_to?: string | null;
          evaluated_by?: string | null;
          evaluated_at?: string | null;
          retention_expires_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mains_submissions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mains_submissions_question_id_fkey";
            columns: ["question_id"];
            referencedRelation: "mains_questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mains_submissions_assigned_to_fkey";
            columns: ["assigned_to"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mains_submissions_evaluated_by_fkey";
            columns: ["evaluated_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
