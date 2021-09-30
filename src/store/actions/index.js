import { createRoutine } from "redux-saga-routines";
import * as actionTypes from "./actionTypes";

export const login = createRoutine(actionTypes.LOGIN);
export const logout = createRoutine(actionTypes.LOGOUT);
export const checkAuthTimeout = createRoutine(actionTypes.CHECK_AUTH_TIMEOUT);
export const genericActionsAuth = createRoutine(
  actionTypes.GENERIC_ACTIONS_AUTH
);
export const resetErrorAuth = createRoutine(actionTypes.RESET_ERROR_AUTH);
export const manageLoading = createRoutine(actionTypes.MANAGE_LOADING);

export const genericActionsProducts = createRoutine(
  actionTypes.GENERIC_ACTIONS_PRODUCTS
);
export const getProductsFromNumberPage = createRoutine(
  actionTypes.GET_PRODUCTS_FROM_NUMBER_PAGE
);
export const getProductsFromSearch = createRoutine(
  actionTypes.GET_PRODUCTS_FROM_SEARCH
);
export const getAllProducts = createRoutine(actionTypes.GET_ALL_PRODUCTS);
export const getInitialProducts = createRoutine(
  actionTypes.GET_INITIAL_PRODUCTS
);
export const getPopularProducts = createRoutine(
  actionTypes.GET_POPULAR_PRODUCTS
);
export const getProduct = createRoutine(actionTypes.GET_PRODUCT);
// export const resetProduct = createRoutine(actionTypes.RESET_PRODUCT);
export const createProduct = createRoutine(actionTypes.CREATE_PRODUCT);
export const editProduct = createRoutine(actionTypes.EDIT_PRODUCT);
export const deleteProduct = createRoutine(actionTypes.DELETE_PRODUCT);

export const genericActionsCustomers = createRoutine(
  actionTypes.GENERIC_ACTIONS_CUSTOMERS
);
export const getCustomersFromNumberPage = createRoutine(
  actionTypes.GET_CUSTOMERS_FROM_NUMBER_PAGE
);
export const getCustomersFromSearch = createRoutine(
  actionTypes.GET_CUSTOMERS_FROM_SEARCH
);
export const getAllCustomers = createRoutine(actionTypes.GET_ALL_CUSTOMERS);
export const getInitialCustomers = createRoutine(
  actionTypes.GET_INITIAL_CUSTOMERS
);
export const getLoyalCustomers = createRoutine(actionTypes.GET_LOYAL_CUSTOMERS);
export const resetCustomer = createRoutine(actionTypes.RESET_CUSTOMER);
export const getCustomer = createRoutine(actionTypes.GET_CUSTOMER);
export const createCustomer = createRoutine(actionTypes.CREATE_CUSTOMER);
export const editCustomer = createRoutine(actionTypes.EDIT_CUSTOMER);
export const deleteCustomer = createRoutine(actionTypes.DELETE_CUSTOMER);
export const genericActionsOrders = createRoutine(
  actionTypes.GENERIC_ACTIONS_ORDERS
);
export const getOrdersFromNumberPage = createRoutine(
  actionTypes.GET_ORDERS_FROM_NUMBER_PAGE
);
export const getOrdersFromSearch = createRoutine(
  actionTypes.GET_ORDERS_FROM_SEARCH
);
export const getAllOrders = createRoutine(actionTypes.GET_ALL_ORDERS);
export const getInitialOrders = createRoutine(actionTypes.GET_INITIAL_ORDERS);
export const getLatestOrders = createRoutine(actionTypes.GET_LATEST_ORDERS);
export const genericActionsNotifications = createRoutine(
  actionTypes.GENERIC_ACTIONS_NOTIFICATIONS
);
export const getNotifications = createRoutine(actionTypes.GET_NOTIFICATIONS);
export const getTimeframeList = createRoutine(actionTypes.GET_TIMEFRAME_LIST);
export const updateCurrentNotification = createRoutine(
  actionTypes.UPDATE_CURRENT_NOTIFICATION
);
