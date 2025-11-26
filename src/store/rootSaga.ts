import { all } from "redux-saga/effects";
import { watchTodoSaga } from "./watchTodoSaga";

export function* rootSaga() {
  yield all([watchTodoSaga()]);
}
