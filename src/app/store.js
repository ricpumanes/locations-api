import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createInjectorsEnhancer } from "redux-injectors";
import createSagaMiddleware from "redux-saga";

import createReducer from "./reducers";

export default function configureAppStore(initialState = {}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  const middleware = [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== "production",
    enhancers,
  });

  return store;
}
