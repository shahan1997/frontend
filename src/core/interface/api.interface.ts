export interface IApiResponse {
  code: number;
  status: boolean;
  message: string;
  data: object | string;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IOrderID {
  _id: string;
}

export interface IUserRegistrar {
  email: string;
  password: string;
  name: string;
}

export interface IAuth {
  token: string;
  user: IUserLogin;
}

export interface IUserLogin {
  id: string;
  name: string;
  email: string;
}

export interface IProductImage {
  url: string;
  isFeatured: boolean;
}

export interface IProductData {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  description: string;
  images: IProductImage[];
}
export interface IIngredient {
  name: string;
  price: number;
}

export interface IPizzaUpdate {
  name: string;
  basePrice: number;
  description: string;
  ingredients: IIngredient[];
  images: string[];
}

export interface IPizza {
  _id: string;
  name: string;
  basePrice: number;
  description: string;
  ingredients: IIngredient[];
  images: string[];
  customization?: string | null;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  pizzas: IPizzaOrder[];
  totalAmount: number;
  status: string;
  createdAt: Date;
}

export interface IPizzaOrder {
  _id: string;
  pizzaId: string;
  name: string;
  basePrice: number;
  description: string;
  ingredients: IIngredient[];
  quantity: number;
  totalPrice: number;
  images: string[];
  customText?: string;
}

export interface IProductListResponse {
  pizzas: IPizza[];
}
