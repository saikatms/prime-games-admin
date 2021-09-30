import { all } from "redux-saga/effects";
import { productsSagas } from "./products";

import { timeframeListSagas } from "./listsToSelect";
import { authSagas } from "./auth";

export default function* rootSaga() {
  yield all([...authSagas, ...productsSagas, ...timeframeListSagas]);
}
