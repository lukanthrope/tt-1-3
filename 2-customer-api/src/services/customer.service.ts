import { eq, ilike } from 'drizzle-orm';
import { DatabaseService } from '../db/index.js';
import { customersTable } from '../db/schema.js';
import {
  CreateCustomer,
  Customer,
  CustomerListItem,
  UpdateCustomer,
} from '../types/index.js';

export class CustomerService {
  constructor(private readonly dbService: DatabaseService) {}

  async getById(id: number): Promise<Customer | null> {
    const data = await this.dbService
      .getInstance()
      .selectDistinct()
      .from(customersTable)
      .where(eq(customersTable.id, id));

    return data[0] || null;
  }

  async create(data: CreateCustomer): Promise<Customer> {
    const [exists] = await this.dbService
      .getInstance()
      .selectDistinct()
      .from(customersTable)
      .where(eq(customersTable.email, data.email));

    if (exists) return exists;

    const [customer] = await this.dbService
      .getInstance()
      .insert(customersTable)
      .values(data)
      .returning();

    return customer;
  }

  async list(filters: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }): Promise<CustomerListItem[]> {
    const query = this.dbService
      .getInstance()
      .select({
        id: customersTable.id,
        firstName: customersTable.firstName,
        lastName: customersTable.lastName,
        email: customersTable.email,
      })
      .from(customersTable);

    if (filters.firstName) {
      query.where(ilike(customersTable.firstName, `%${filters.firstName}%`));
    }

    if (filters.lastName) {
      query.where(ilike(customersTable.lastName, `%${filters.lastName}%`));
    }

    if (filters.email) {
      query.where(ilike(customersTable.email, `%${filters.email}%`));
    }

    const customers = await query;

    return customers;
  }

  async update(id: number, data: UpdateCustomer): Promise<Customer | null> {
    const [updatedCustomer] = await this.dbService
      .getInstance()
      .update(customersTable)
      .set(data)
      .where(eq(customersTable.id, id))
      .returning();

    return updatedCustomer || null;
  }

  async delete(id: number): Promise<void> {
    await this.dbService
      .getInstance()
      .delete(customersTable)
      .where(eq(customersTable.id, id));
  }
}
