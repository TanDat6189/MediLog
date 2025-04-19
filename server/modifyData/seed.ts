import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import bcrypt from "bcryptjs";

import { reset } from "drizzle-seed";
import { seed } from "drizzle-seed";

import * as schema from "@/server/schema";

const sql = postgres(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function resetData() {
  await reset(db, schema);

  console.log("Clear data complete! Ready to seed Data!");
}

async function seedData() {
  //Enum
  const bloodType = ["A", "B", "AB", "O"];

  const hashedPassword = await bcrypt.hash("123456", 10);

  await seed(db, schema).refine((f) => ({
    users: {
      count: 10,
      columns: {
        name: f.firstName(),
        email: f.email(),
        emailVerified: f.timestamp(),
        image: f.default({
          defaultValue:
            "https://images.prismic.io/noteplan-landing-cms/Zl70u5m069VX1cHY_TechnicalDesignDocumentTemplate.png?auto=format,compress",
        }),
        password: f.default({ defaultValue: hashedPassword }),
      },
      with: {
        profiles: [{ weight: 1, count: [1] }],
      },
    },
    profiles: {
      columns: {
        fullName: f.fullName(),
        birthYear: f.year(),
        hometown: f.country(),
        height: f.int({
          minValue: 150,
          maxValue: 190,
        }),
        weight: f.number({
          minValue: 50,
          maxValue: 80,
          precision: 1,
        }),
        bloodType: f.valuesFromArray({ values: bloodType }),
        medicalHistory: f.loremIpsum(),
      },
      with: {
        hospitals: [
          {
            weight: 0.4,
            count: [3, 4],
          },
          {
            weight: 0.5,
            count: [5, 6],
          },
          {
            weight: 0.1,
            count: [6, 7],
          },
        ],
      },
    },
    hospitals: {
      columns: {
        name: f.companyName(),
        address: f.streetAddress(),
        hotline: f.phoneNumber({ template: "0#########" }),
      },
      with: {
        visitNotes: [
          { weight: 0.8, count: [3, 4] },
          { weight: 0.2, count: [5, 6] },
        ],
      },
    },
    visitNotes: {
      columns: {
        visitDate: f.date(),
        notes: f.loremIpsum(),
      },
      with: {
        visitImages: [
          { weight: 0.8, count: [1, 2] },
          { weight: 0.2, count: [3, 4] },
        ],
      },
    },
    visitImages: {
      columns: {
        imageUrl: f.default({
          defaultValue:
            "https://images.prismic.io/noteplan-landing-cms/Zl70u5m069VX1cHY_TechnicalDesignDocumentTemplate.png?auto=format,compress",
        }),
      },
    },
  }));

  console.log("Seed data complete!");
}

async function main() {
  try {
    await resetData();
    // await seedData();
    await sql.end();
    console.log("✅ Database reset and seed completed successfully!");
  } catch (error) {
    console.error("Error during data reset or seeding:", error);
    process.exit(1);
  }
}

main();
