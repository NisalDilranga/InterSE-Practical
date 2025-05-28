export interface user {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface itemType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface item {
  id: string;
  type: string;
  price: number;
  imgUrl: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  ingredients: string[];
  description: string;
}
export interface orderItem {

  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  ingredients: string[];
  price: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}