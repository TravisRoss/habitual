/**
 * Data service for profile-related database operations.
 * Centralises all Supabase access so auth and server actions stay decoupled from the DB.
 */
import { createAdminClient } from "@/lib/supabase/server";

export type ProfileForCredentials = {
  id: string;
  email: string | null;
  full_name: string | null;
  password_hash: string | null;
};

export async function getProfileForCredentials(
  email: string
): Promise<ProfileForCredentials | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, password_hash")
    .eq("email", email)
    .single();

  return data;
}

export async function getProfileIdByEmail(email: string): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  return data?.id ?? null;
}

export async function profileExistsByEmail(email: string): Promise<boolean> {
  const id = await getProfileIdByEmail(email);
  return id !== null;
}

/** Upserts a profile by email. Used by OAuth sign-in to create or update on each login. */
export async function upsertProfile(data: {
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      email: data.email,
      full_name: data.full_name ?? null,
      avatar_url: data.avatar_url ?? null,
    },
    { onConflict: "email" }
  );

  return { error: error?.message ?? null };
}

/** Inserts a new profile. Used by email/password sign-up. */
export async function insertProfile(data: {
  email: string;
  full_name: string | null;
  password_hash: string;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").insert(data);

  return { error: error?.message ?? null };
}
