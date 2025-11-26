import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../store/slices/uiSlice";
import authReducer from "../store/slices/authSlice";

/* Configure the store to store more than one reducers an states
 * This store will decide which reducer will run based on the given data or action
 * Exporting store so it can be "opened" by Redux Provider in App.tsx
 */
export const storeRouting = configureStore({
  /* reducers store here */
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

/* Exporting all states type from store (number, custom, string, etc)*/
export type RootState = ReturnType<typeof storeRouting.getState>;

/* Export store dispatch (For each components use this store then referenced to this dispatch) */
export type AppDispatch = typeof storeRouting.dispatch;
