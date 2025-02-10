export interface IApiResponse {
  code: number;
  status: boolean;
  message: string;
  data: object | string;
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

export interface IPizza {
  _id: string;
  name: string;
  basePrice: number;
  description: string;
  ingredients: IIngredient[];
  images: string[];
}

export interface IProductListResponse {
  pizzas: IPizza[];
}
