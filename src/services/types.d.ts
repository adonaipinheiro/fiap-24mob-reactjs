enum URLS {
  signIn = 'storeProducts/login',
  signUp = 'storeProducts/signup',
  productSearch = 'storeProducts',
  productInfoById = 'storeProducts/product/',
  manageFavoriteProduct = 'storeProducts/manageFavorite',
  getFavProducts = 'storeProducts/getFavProducts',
}

export type IResponse<T> = {
  status: number,
  data: T
}

export type SignInType = {
  name: string,
  phone: string,
  token: string,
  userId: string
} 

export type SignUpType = {
  name: string,
  phone: string,
  token: string,
  userId: string
}

export type IProduct = {
  _id: string;
  name: string;
  price: number;
  favorite: boolean;
};

export type GetProductsRespType = {
  products: IProduct[];
  totalItems: number;
  page: string;
  perPage: number;
};

export type GetFavoritesProductsRespType = {
  products: IProduct[];
};

export type fullProductDetail = {
  _id: string;
  name: string;
  price: string;
  favorite: boolean;
  stores: [
    {
      _id: string;
      name: string;
      address: string;
      latitude: number;
      longitude: number;
    },
  ];
  createdDate: string;
  updatedDate: string;
};

export type GetProductDetailRespType = {
  product: fullProductDetail;
};

export {URLS}