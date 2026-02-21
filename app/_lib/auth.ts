import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import {
  getProfileForCredentials,
  getProfileIdByEmail,
  upsertProfile,
} from "@/lib/data-service";

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
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const profile = await getProfileForCredentials(credentials.email as string);
        if (!profile?.password_hash) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          profile.password_hash
        );
        if (!isValid) return null;

        return { id: profile.id, email: profile.email, name: profile.full_name };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Upsert a profiles row on every sign-in so we always have one.
    async signIn({ user }) {
      if (!user.email) return false;

      const { error } = await upsertProfile({
        email: user.email,
        full_name: user.name ?? null,
        avatar_url: user.image ?? null,
      });

      if (error) {
        console.error("[auth] profile upsert failed:", error);
        return false;
      }

      return true;
    },

    // Fetch the Supabase profile UUID and store it in the JWT.
    async jwt({ token, user }) {
      if (user?.email) {
        const profileId = await getProfileIdByEmail(user.email);
        if (profileId) token.supabaseId = profileId;
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
