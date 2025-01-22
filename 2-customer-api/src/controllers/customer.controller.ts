import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service.js';
import {
  createCustomerSchema,
  updateCustomerSchema,
} from '../validators/customer.schema.js';
import { numericIdSchema } from '../validators/numeric-id.schema.js';

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  async createCustomer(req: Request, res: Response): Promise<void> {
    const result = createCustomerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error.errors });
      return;
    }

    const { firstName, lastName, email, phone, address } = result.data;

    const data = await this.customerService.create({
      firstName,
      lastName,
      email,
      phone,
      address,
    });

    res.status(201).json({ data });
  }

  async listCustomers(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email } = req.query;

    const filters = {
      firstName: firstName ? (firstName as string) : undefined,
      lastName: lastName ? (lastName as string) : undefined,
      email: email ? (email as string) : undefined,
    };

    const data = await this.customerService.list(filters);

    res.status(200).json({ data });
  }

  async getCustomer(req: Request, res: Response): Promise<void> {
    const id = numericIdSchema.safeParse(req.params);

    if (!id.success) {
      res.status(400).json({ error: id.error.format() });
      return;
    }

    const data = await this.customerService.getById(id.data.customerId);

    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  }

  async updateCustomer(req: Request, res: Response): Promise<void> {
    const id = numericIdSchema.safeParse(req.params);
    const result = updateCustomerSchema.safeParse(req.body);

    if (!result.success || !id.success) {
      res
        .status(400)
        .json({ errors: result.error?.errors || id.error?.format() });
      return;
    }

    const { firstName, lastName, phone, address } = result.data;

    const customer = await this.customerService.update(id.data.customerId, {
      firstName,
      lastName,
      phone,
      address,
    });

    if (customer) {
      res.status(200).json({ data: customer });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  }

  async deleteCustomer(req: Request, res: Response): Promise<void> {
    const id = numericIdSchema.safeParse(req.params);

    if (!id.success) {
      res.status(400).json({ error: id.error.format() });
      return;
    }

    await this.customerService.delete(id.data.customerId);
    res.status(204).json({ message: 'No content' });
  }
}
