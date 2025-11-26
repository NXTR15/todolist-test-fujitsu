import { all } from "redux-saga/effects";
import { todoSaga } from "./todoSaga";

export function* rootSaga() {
  yield all([todoSaga()]);
}
