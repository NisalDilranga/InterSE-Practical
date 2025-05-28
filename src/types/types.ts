// Explicitly define the Ingredient interface
export interface Ingredient {
  name: string;
  quantity: string;
}

export interface itemType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface item {
  id: string;
  name: string;
  type: string;
  price: number;
  imgUrl: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  ingredients: Ingredient[];
  description: string;
}
export interface orderItem {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  ingredients: Ingredient[];
  price: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
