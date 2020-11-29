import { takeEvery, call, put } from "redux-saga/effects";
import { actions } from "./slice";
import * as locationsAPI from "./api";

export function* fetchLocations({ payload }) {
  try {
    const data = yield call(locationsAPI.find, payload);
    yield put(actions.fetchSuccess({ data }));
  } catch (error) {
    console.log(error);
    // yield put(actions.fetchError({ error }));
  }
}

export function* createLocation({ payload }) {
  try {
    const data = yield call(locationsAPI.create, payload);
    yield put(actions.createSuccess({ data }));
  } catch (error) {
    yield put(actions.createError({ error }));
  }
}

export function* deleteLocation({ payload }) {
  try {
    const data = yield call(locationsAPI.deleteItem, payload);
    yield put(actions.deleteSuccess({ data }));
  } catch (error) {
    yield put(actions.deleteError({ error }));
  }
}

export function* editLocation({ payload }) {
  try {
    const data = yield call(locationsAPI.edit, payload);
    yield put(actions.editSuccess({ data }));
  } catch (error) {
    yield put(actions.editError({ error }));
  }
}

export default function* locationsSaga() {
  yield takeEvery(actions.fetch.type, fetchLocations);
  yield takeEvery(actions.create.type, createLocation);
  yield takeEvery(actions.delete.type, deleteLocation);
  yield takeEvery(actions.edit.type, editLocation);
}
