import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import userReducer from './userRedux'

import {
    persisstStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "react-persist"
import storage from "react-persist/lib/storage"

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export let persistor = persisstStore(store);