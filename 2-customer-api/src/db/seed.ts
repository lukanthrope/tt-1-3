import { DatabaseService } from './index.js';
import { customersTable } from './schema.js';

const service = new DatabaseService();
const db = service.getInstance();

async function start(): Promise<void> {
  const data: (typeof customersTable.$inferInsert)[] = [
    {
      firstName: 'Jay',
      lastName: 'Johnson',
      email: 'ray_j1@mail.co',
      phone: '+1231232333',
      address: 'some address',
    },
    {
      firstName: 'Jane',
      lastName: 'Foster',
      email: 'jane_fos1@mail.co',
      phone: '+1231232211',
      address: 'some address, 2',
    },
  ];

  console.log('Seeding Customers', data);

  await db.insert(customersTable).values(data);

  console.log('Success');
}

start();
