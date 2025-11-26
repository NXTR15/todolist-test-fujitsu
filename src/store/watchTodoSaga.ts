import { call, put, takeLatest } from "redux-saga/effects";
import type { Todo } from "../types/todos.types";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/todos.services";
import {
  addTodoFailure,
  addTodoRequest,
  addTodoSuccess,
  deleteTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  fetchTodosByFilterFailure,
  fetchTodosByFilterRequest,
  fetchTodosByFilterSuccess,
  fetchTodosFailure,
  fetchTodosRequest,
  fetchTodosSuccess,
  updateTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
} from "./slices/todoSlice";

function* fetchTodosSaga(): Generator<any, any, any> {
  try {
    const todos: Todo[] = yield call(getTodos);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure("Failed to fetch todos"));
  }
}

function* fetchTodosByFilterSaga(action: any): Generator<any, any, any> {
  try {
    const todos: Todo[] = yield call(getTodos);
    yield put(fetchTodosSuccess(todos));
    yield put(fetchTodosByFilterSuccess(action.payload));
  } catch (error) {
    yield put(fetchTodosByFilterFailure("Failed to fetch todos"));
  }
}

function* addTodoSaga(action: any): Generator<any, any, any> {
  try {
    const response = yield call(addTodo, action.payload);
    yield put(addTodoSuccess(response));
  } catch (error: any) {
    yield put(addTodoFailure(error.message));
  }
}

function* updateTodoSaga(action: any): Generator<any, any, any> {
  try {
    const response = yield call(updateTodo, action.payload);
    yield put(updateTodoSuccess(response));
  } catch (error: any) {
    yield put(updateTodoFailure(error.message));
  }
}

function* deleteTodoSaga(action: any): Generator<any, any, any> {
  try {
    yield call(deleteTodo, action.payload);
    yield put(deleteTodoSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteTodoFailure(error.message));
  }
}

export function* watchTodoSaga() {
  yield takeLatest(fetchTodosRequest.type, fetchTodosSaga);
  yield takeLatest(fetchTodosByFilterRequest.type, fetchTodosByFilterSaga);
  yield takeLatest(addTodoRequest.type, addTodoSaga);
  yield takeLatest(updateTodoRequest.type, updateTodoSaga);
  yield takeLatest(deleteTodoRequest.type, deleteTodoSaga);
}
