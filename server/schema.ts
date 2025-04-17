import {
  pgTable,
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
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
});

// export const userRelations = relations(users, ({ one }) => ({
//   profiles: one(profiles),
// }));

// Profiles Table
export const profiles = pgTable("profile", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }),
  birthYear: integer("birth_year"),
  hometown: varchar("hometown", { length: 255 }),
  height: integer("height"),
  weight: real("weight"),
  bloodType: bloodTypeEnum(),
  medicalHistory: text("medical_history"),
});

// export const profilesRelations = relations(profiles, ({ one, many }) => ({
//   users: one(users, {
//     fields: [profiles.userId],
//     references: [users.id],
//   }),
//   hospitals: many(hospitals),
// }));

// Hospitals Table
export const hospitals = pgTable("hospital", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  profileId: text("profile_id")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }),
  address: text("address"),
  hotline: varchar("hotline", { length: 50 }),
});

// export const hospitalsRelations = relations(hospitals, ({ one, many }) => ({
//   profiles: one(profiles, {
//     fields: [hospitals.profileId],
//     references: [profiles.id],
//   }),
//   visitNotes: many(visitNotes),
// }));

// Visit Notes Table
export const visitNotes = pgTable("visit_note", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  hospitalId: text("hospital_id")
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
export const visitImages = pgTable("visit_image", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  noteId: text("note_id")
    .notNull()
    .references(() => visitNotes.id, { onDelete: "cascade" }),
  imageUrl: text("image_url"),
});

// export const visitImagesRelations = relations(visitImages, ({ one }) => ({
//   visitNotes: one(visitNotes, {
//     fields: [visitImages.noteId],
//     references: [visitNotes.id],
//   }),
// }));
