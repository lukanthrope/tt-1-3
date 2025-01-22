export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export interface CustomerListItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface UpdateCustomer {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}
