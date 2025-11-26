import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../store/slices/todoSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const storeRouting = configureStore({
  reducer: {
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof storeRouting.getState>;
export type AppDispatch = typeof storeRouting.dispatch;
