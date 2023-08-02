import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gjhklzwrqpqowszcmhgt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqaGtsendycXBxb3dzemNtaGd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgwNTEzNjYsImV4cCI6MjAwMzYyNzM2Nn0.Z6TDeHwlNxErk64SF7Oqvr0NlyZ9-W-iFmBkwNhv9bU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
