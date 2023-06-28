interface Catalog {
  id: number;
  name: string;
}

interface User {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  catalog: Catalog;
  inStock: number;
  used: number;
  createdDate: Date;
  createdByUser: User;
  lastModifiedDate: Date;
  modifiedByUser: User;
}
