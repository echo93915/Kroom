import { createClient } from "@/lib/supabase/client";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export async function signInWithGoogle() {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
}

export async function signInWithApple() {
  const supabase = createClient();
  await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
}

export async function signInWithEmail(credentials: SignInWithPasswordCredentials) {
  const supabase = createClient();
  return supabase.auth.signInWithPassword(credentials);
}

export async function signUpWithEmail(credentials: SignInWithPasswordCredentials) {
  const supabase = createClient();
  return supabase.auth.signUp(credentials);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  window.location.reload();
} 