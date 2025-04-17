"use server";

import { createSafeActionClient } from "next-safe-action";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";

import { LoginSchema } from "types/login-schema";
import { db } from "..";
import { users } from "../schema";
import { signIn } from "../auth";

const action = createSafeActionClient();

export const emailSignIn = action(LoginSchema, async ({ email, password }) => {
  try {
    // Check if the user is in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser?.email !== email) {
      return { error: "Email not found!" };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });

    return { success: "User Signed In!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email or Password Incorrect" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
});
