import { combineReducers } from "@reduxjs/toolkit";

import { reducer as locationsReducer } from "../features/locations/slice";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    locationsReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
