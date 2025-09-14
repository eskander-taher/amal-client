// Database model types - these should match the Mongoose schemas

export interface INews {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

// You can add other model types here as they're created
// export interface IUser { ... }
// export interface IProduct { ... }
