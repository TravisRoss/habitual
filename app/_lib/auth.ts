import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { createAdminClient } from "@/lib/supabase/server";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Upsert a profiles row on every sign-in so we always have one.
    async signIn({ user }) {
      if (!user.email) return false;

      const supabase = createAdminClient();
      const { error } = await supabase.from("profiles").upsert(
        {
          email: user.email,
          full_name: user.name ?? null,
          avatar_url: user.image ?? null,
        },
        { onConflict: "email" }
      );

      if (error) {
        console.error("[auth] profile upsert failed:", error.message);
        return false;
      }

      return true;
    },

    // Fetch the Supabase profile UUID and store it in the JWT.
    async jwt({ token, user }) {
      if (user?.email) {
        const supabase = createAdminClient();
        const { data } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", user.email)
          .single();

        if (data) token.supabaseId = data.id;
      }
      return token;
    },

    // Expose the Supabase profile UUID as session.user.id.
    async session({ session, token }) {
      if ((token as JWT & { supabaseId?: string }).supabaseId) {
        session.user.id = (token as JWT & { supabaseId: string }).supabaseId;
      }
      return session;
    },

    authorized({
      auth,
      request: { nextUrl },
    }: {
      auth: { user?: unknown } | null;
      request: NextRequest;
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard && !isLoggedIn) return false;
      return true;
    },
  },
  trustHost: true,
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
