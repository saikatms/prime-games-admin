import {
  updateObject,
  getPartialList,
  containsValue,
} from "../../../shared/utility";

// function that returns the initial list of products
export function getInitialProductsFacade(state, action) {
  const { products } = action.payload;
  const { pageSize } = state;
  const partialList = getPartialList(0, pageSize, products);
  return updateObject(state, {
    numTotalProducts: products.length,
    currentPage: 0,
    searchText: "",
    allProducts: products,
    searchProducts: [],
    currentProducts: partialList,
  });
}

// function that returns the 3 products with the most sales
export function getPopularProductsFacade(state, action) {
  const { products } = action.payload;
  return updateObject(state, { currentProducts: products });
}

export function getProductFacade(state, action) {
  const { product } = action.payload;
  return updateObject(state, { detailProduct: product });
}

// function that returns 10 products based on the selected page number
export function getProductsFromNumPageFacade(state, action) {
  const { currentPage } = action.payload;
  const { allProducts, pageSize, searchProducts } = state;
  let productsForPaging = [];
  if (
    searchProducts.length > 0 &&
    searchProducts.length !== allProducts.length
  ) {
    productsForPaging = [...searchProducts];
  } else {
    productsForPaging = [...allProducts];
  }
  const partialList = getPartialList(currentPage, pageSize, productsForPaging);
  return updateObject(state, {
    numTotalProducts: productsForPaging.length,
    currentPage,
    currentProducts: partialList,
  });
}

/*
function that returns a list of products based on 
the parameter entered in the search 
*/
export function getProductsFromSearchFacade(state, action) {
  const { searchText } = action.payload;
  const { allProducts, pageSize } = state;
  const searchProducts = allProducts.filter((product) =>
    containsValue(product.gameName, searchText)
  );
  const partialList = getPartialList(0, pageSize, searchProducts);
  return updateObject(state, {
    numTotalProducts: searchProducts.length,
    currentPage: 0,
    searchProducts,
    searchText,
    currentProducts: partialList,
  });
}

/*
function that removes the selected product considering the total list of 
products and the list of products searched to derive the current list of products
*/
export function deleteProductFacade(state, action) {
  const { id } = action.payload;
  const { allProducts, pageSize, searchProducts } = state;
  let productsForPaging = [];
  let currentSearchProducts = [...searchProducts];
  let searchText = state.searchText;
  const allProductsFilter = allProducts.filter((product) => product.id !== id);
  if (
    searchProducts.length > 0 &&
    searchProducts.length !== allProducts.length
  ) {
    productsForPaging = searchProducts.filter((product) => product.id !== id);
    if (productsForPaging.length === 0) {
      productsForPaging = [...allProductsFilter];
      searchText = "";
      currentSearchProducts = [];
    }
  } else {
    productsForPaging = [...allProductsFilter];
    searchText = "";
  }
  let partialList = getPartialList(0, pageSize, productsForPaging);
  let currentPage = 0;
  if (productsForPaging.length) {
    currentPage = state.currentPage;
    partialList = getPartialList(currentPage, pageSize, productsForPaging);
  }
  return updateObject(state, {
    numTotalProducts: productsForPaging.length,
    currentPage,
    searchText,
    searchProducts: currentSearchProducts,
    allProducts: allProductsFilter,
    currentProducts: partialList,
  });
}

export function errorProductsFacade(state, action) {
  const { error } = action.payload;
  return updateObject(state, { error });
}
