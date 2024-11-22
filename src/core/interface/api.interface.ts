export interface IApiResponse {
  code: number;
  status: boolean;
  message: string;
  data: object | string;
}

export interface IProductImage {
  url: string;
  isFeatured: boolean;
  _id: string;
}

export interface IProductData {
  _id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  description: string;
  images: IProductImage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProductListResponse {
  products: IProductData[];
}
