import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';

export const customersTable = pgTable('customers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar('firstName', { length: 255 }).notNull(),
  lastName: varchar('lastName', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
});
