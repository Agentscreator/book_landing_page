import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const nailTechs = pgTable('nail_techs', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
