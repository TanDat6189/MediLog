import { createSafeActionClient } from "next-safe-action";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { RegisterSchema } from "types/register-schema";
import { db } from "..";
import { users, profiles } from "../schema";

const action = createSafeActionClient();

export const emailRegister = action(
  RegisterSchema,
  async ({ email, password, fullName }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const result = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
      })
      .returning({ insertedId: users.id });

    if (result.length > 0) {
      console.log("Create a new user successfully!");

      await db.insert(profiles).values({
        userId: result[0].insertedId,
        fullName: fullName,
        bloodType: "unknown",
      });
    } else {
      ("Cannot create a new user!");
    }
  }
);
