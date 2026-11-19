
const BASE_URL = "https://dummyjson.com";

export const PRODUCTS_LIMIT = 24;

export const CATEGORIES_URL = `${BASE_URL}/products/categories`;

export const getProductsUrl = (category = "") => {
  if (category) {
    return `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${PRODUCTS_LIMIT}`;
  }

  return `${BASE_URL}/products?limit=${PRODUCTS_LIMIT}`;
};

export const getProductUrl = (id) => {
  return `${BASE_URL}/products/${id}`;
};
