import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { put, takeLatest} from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import logger from "redux-logger";

const imageResultsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            console.log("in imageResultsReducer action.payload is:", action.payload);
            return action.payload;
        default:
            return state;
    }
};    


function* getSearch(action) {
  try {
    const imageResults = yield axios.get(`/api/search/${action.payload}`);
    console.log(imageResults)
    yield put({ type: 'SET_IMAGES', payload: imageResults.data.data});
    // console.log("Image Results:", imageResults.data);
  } catch (error) {
    console.log("error fetching images", error);
  }
}


function* watcherSaga() {
    yield takeLatest('GET_IMAGES', getSearch);
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
