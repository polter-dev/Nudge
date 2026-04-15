import NextAuth, { type NextAuthOptions } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { env } from "~/env";
import { db } from "~/server/db";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    ...(env.MICROSOFT_CLIENT_ID && env.MICROSOFT_CLIENT_SECRET
      ? [
          AzureADProvider({
            clientId: env.MICROSOFT_CLIENT_ID,
            clientSecret: env.MICROSOFT_CLIENT_SECRET,
            // "common" allows any org (any university) to sign in.
            // Set MICROSOFT_TENANT_ID to restrict to a single institution.
            tenantId: env.MICROSOFT_TENANT_ID ?? "common",
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "azure-ad") return false;

      const microsoftId = account.providerAccountId;
      const email = user.email ?? "";
      const nameParts = (user.name ?? "").trim().split(" ");
      const firstName = nameParts[0] ?? "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const isEdu = email.toLowerCase().endsWith(".edu");

      await db.user.upsert({
        where: { microsoftId },
        create: {
          microsoftId,
          firstName,
          lastName,
          userName: email.split("@")[0]?.replaceAll(/[^a-zA-Z0-9]/g, "").toLowerCase() ?? microsoftId,
          email,
          authenticated: isEdu,
          university: null,
        },
        update: {
          firstName,
          lastName,
          email,
          authenticated: isEdu,
        },
      });

      return true;
    },

    async session({ session }) {
      if (session.user?.email) {
        const dbUser = await db.user.findUnique({
          where: { email: session.user.email },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userName: true,
            email: true,
            authenticated: true,
            university: true,
          },
        });
        if (dbUser) {
          session.user = {
            ...session.user,
            ...dbUser,
          };
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default NextAuth(authOptions);
