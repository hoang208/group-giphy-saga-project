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

const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITES':
            console.log("in favoritesReducer action.payload is:", action.payload);
            return action.payload;
        default:
            return state;
    }
};    

const favoritesCategoryUpdate = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            console.log("in favoritesReducer action.payload is:", action.payload);
            return action.payload;
        default:
            return state;
    }
};    

function* postFavorite(action) {
  try {
      yield axios.post('/api/favorite', action.payload);
      yield put({ type: 'GET_IMAGES' });
  } catch (error) {
      console.log('error posting favorite', error);
  }    
}

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

function* getFavorite() {
  try {
      console.log('in getFavorite')
      const favoriteResponse = yield axios.get('/api/favorite');
      yield put({ type: 'SET_FAVORITES', payload: favoriteResponse.data });
  } catch (error) {
      console.log('error fetching favorite', error);
  }
}

function* updateFavorite(action) {
  try {
    const updateFavorite = yield axios.put(`/api/favorite/${action.payload.id}`, action.payload);
    console.log(updateFavorite)
    yield put({ type: 'SET_CATEGORY', payload: updateFavorite});
    // console.log("Image Results:", imageResults.data);
  } catch (error) {
    console.log("error fetching images", error);
  }
}

function* watcherSaga() {
    yield takeLatest('GET_IMAGES', getSearch);
    yield takeLatest('ADD_FAVORITE', postFavorite)
    yield takeLatest('GET_FAVORITES', getFavorite)
    yield takeLatest('UPDATE_CATEGORY', updateFavorite)

}

const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({
    imageResultsReducer,
    favoritesReducer,
    favoritesCategoryUpdate
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
