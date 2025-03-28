import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jqwsmjkibnkrjvnfogxt.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxd3NtamtpYm5rcmp2bmZvZ3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDIxNDEsImV4cCI6MjA1ODQ3ODE0MX0.yblKEV3RRVuq06ODs0JhBMkDJvBy8YPYN_C8J4EfPaw";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log("✅ Supabase initialized!");

export { supabase };