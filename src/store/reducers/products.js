import {
  genericActionsProducts,
  getProductsFromNumberPage,
  getProductsFromSearch,
  getInitialProducts,
  getPopularProducts,
  getProduct,
  deleteProduct,
} from "../actions";
import { createReducer } from "../../shared/utility";
import {
  getInitialProductsFacade,
  getPopularProductsFacade,
  getProductFacade,
  errorProductsFacade,
  getProductsFromNumPageFacade,
  getProductsFromSearchFacade,
  deleteProductFacade,
} from "./facade/products";

const initialState = {
  loading: false,
  currentPage: 0,
  pageSize: 6,
  numTotalProducts: 0,
  allProducts: [],
  searchText: "",
  searchProducts: [],
  currentProducts: [],
  detailProduct: {},
  error: {},
};

/*
I used the facade pattern because there are functions that manage 
client side both paging and filtering
*/
const productsReducer = createReducer(initialState, {
  [getInitialProducts.SUCCESS]: getInitialProductsFacade,
  [getPopularProducts.SUCCESS]: getPopularProductsFacade,
  [getProductsFromNumberPage.TRIGGER]: getProductsFromNumPageFacade,
  [getProductsFromSearch.TRIGGER]: getProductsFromSearchFacade,
  [getProduct.SUCCESS]: getProductFacade,
  [deleteProduct.SUCCESS]: deleteProductFacade,
  [genericActionsProducts.FAILURE]: errorProductsFacade,
});

export default productsReducer;
