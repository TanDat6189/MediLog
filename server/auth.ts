import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { db } from "./connectDB";
import { users } from "./schema";
import { LoginSchema } from "@/types/login-schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  events: {},
  callbacks: {
    async jwt({ token, user }) {
      if (!user) return token;

      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.image = user.image;

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }

      if (session.user.id) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // safeParse() trả về { success: true, data } nếu đúng định dạng.
        const validatedFields = LoginSchema.safeParse(credentials);
        console.log(validatedFields);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log(user);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
});
