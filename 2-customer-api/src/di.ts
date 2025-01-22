/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomerService } from './services/customer.service.js';
import { CustomerController } from './controllers/customer.controller.js';
import { DatabaseService } from './db/index.js';

type Constructor<T> = new (..._args: any[]) => T;

class DIContainer {
  private services = new Map<
    string,
    { service: Constructor<any>; dependencies: Constructor<any>[] }
  >();
  private instances = new Map<string, any>();

  public register<T>(
    service: Constructor<T>,
    dependencies: Constructor<any>[] = []
  ): void {
    this.services.set(service.name, { service, dependencies });
  }

  public get<T>(s: Constructor<T>): T {
    const key = s.name;

    if (this.instances.has(key)) {
      return this.instances.get(key);
    }

    const entry = this.services.get(key);
    if (!entry) {
      throw new Error(`Service not found: ${key}`);
    }

    const { service, dependencies } = entry;

    const resolvedDependencies = dependencies.map((dep) => this.get(dep));
    const instance = new service(...resolvedDependencies);
    this.instances.set(key, instance);
    return instance;
  }
}

export const container = new DIContainer();

container.register(DatabaseService);
container.register(CustomerService, [DatabaseService]);
container.register(CustomerController, [CustomerService]);
