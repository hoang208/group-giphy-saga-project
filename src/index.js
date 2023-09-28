import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { put, takeLatest, call } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import logger from "redux-logger";

const imageResultsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
};    

function* getSearch(action) {
  try {
    const imageResults = yield call (axios.get, `/api/search?search=${action.payload}`)
    yield put({ type: "SET_IMAGES", payload: imageResults.data });
  } catch (error) {
    console.log("error fetching images", error);
  }
}


function* watcherSaga() {

}

const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({
    imageResultsReducer,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

// This allows the watcherSaga to start watching for actions
sagaMiddleware.run(watcherSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);
