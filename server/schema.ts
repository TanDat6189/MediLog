import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  real,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const bloodTypeEnum = pgEnum("bloodType", [
  "A",
  "B",
  "AB",
  "O",
  "unknown",
]);

// Users Table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique(),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// export const userRelations = relations(users, ({ one }) => ({
//   profiles: one(profiles),
// }));

// Profiles Table
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }),
  birthYear: integer("birth_year"),
  hometown: varchar("hometown", { length: 255 }),
  height: integer("height"),
  weight: real("weight"),
  bloodType: bloodTypeEnum(),
  medicalHistory: text("medical_history"),
  createdAt: timestamp("created_at").defaultNow(),
});

// export const profilesRelations = relations(profiles, ({ one, many }) => ({
//   users: one(users, {
//     fields: [profiles.userId],
//     references: [users.id],
//   }),
//   hospitals: many(hospitals),
// }));

// Hospitals Table
export const hospitals = pgTable("hospitals", {
  id: uuid("id").primaryKey().defaultRandom(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }),
  address: text("address"),
  hotline: varchar("hotline", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// export const hospitalsRelations = relations(hospitals, ({ one, many }) => ({
//   profiles: one(profiles, {
//     fields: [hospitals.profileId],
//     references: [profiles.id],
//   }),
//   visitNotes: many(visitNotes),
// }));

// Visit Notes Table
export const visitNotes = pgTable("visit_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  hospitalId: uuid("hospital_id")
    .notNull()
    .references(() => hospitals.id, { onDelete: "cascade" }),
  visitDate: date("visit_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// export const visitNotesRelations = relations(visitNotes, ({ one, many }) => ({
//   hospitals: one(hospitals, {
//     fields: [visitNotes.hospitalId],
//     references: [hospitals.id],
//   }),
//   visitImages: many(visitImages),
// }));

// Visit Images Table
export const visitImages = pgTable("visit_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  noteId: uuid("note_id")
    .notNull()
    .references(() => visitNotes.id, { onDelete: "cascade" }),
  imageUrl: text("image_url"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

// export const visitImagesRelations = relations(visitImages, ({ one }) => ({
//   visitNotes: one(visitNotes, {
//     fields: [visitImages.noteId],
//     references: [visitNotes.id],
//   }),
// }));
