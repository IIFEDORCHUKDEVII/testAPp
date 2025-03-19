import createSagaMiddleware from '@redux-saga/core';
import {configureStore} from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

/**
 * Creates a store with the given reducers and middleware.
 * @returns {Store} the store
 */
const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  /**
   * Creates the store with the given reducers and middleware.
   */
  const store = configureStore({
    /**
     * The reducers to use.
     */
    reducer: rootReducer,

    /**
     * The middleware to use.
     * @param {getDefaultMiddleware} getDefaultMiddleware - A function that returns the default middleware.
     * @returns {Array<Middleware>} The middleware to use.
     */
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        /**
         * Disable the thunk middleware.
         */
        thunk: false,

        /**
         * Disable the serializable check.
         */
        serializableCheck: false,
      }).concat(sagaMiddleware),
    /**
     * Enable the dev tools.
     */
    devTools: __DEV__,
  });

  /**
   * Runs the root saga.
   */
  sagaMiddleware.run(rootSaga);

  return store;
};

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
