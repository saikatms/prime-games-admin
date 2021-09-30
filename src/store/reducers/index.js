import { combineReducers } from "redux";
import manageLoading from "./manageLoading";
import authReducer from "./auth";
import ordersReducer from "./orders";
import notificationsReducer from "./notifications";
import customersReducer from "./customers";
import productsReducer from "./products";
import listsToSelectReducer from "./listsToSelect";

const rootReducer = combineReducers({
  manageLoading: manageLoading,
  authData: authReducer,
  ordersData: ordersReducer,
  notificationsData: notificationsReducer,
  customersData: customersReducer,
  productsData: productsReducer,
  listsToSelectData: listsToSelectReducer,
});

export default rootReducer;
