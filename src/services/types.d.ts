enum URLS {
  signIn = 'storeProducts/login',
  signUp = 'storeProducts/signup',
  productSearch = 'storeProducts',
  productInfoById = 'storeProducts/product',
  manageFavoriteProduct = 'storeProducts/manageFavorite',
  getFavProducts = 'storeProducts/getFavProducts',
}

export type IResponse<T> = {
  status: number,
  data: T
}

export {URLS}