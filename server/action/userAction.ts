import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "../connectDB";
import { users } from "../schema";

export async function createUser(email: string, password: string) {
  let hashedPassword = await bcrypt.hash(password, 10);

  return await db.insert(users).values({ email, password: hashedPassword });
}

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email));
}
