import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/cartSlice'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist"
import storage from './storage';

const persistConfig = { key: 'cart', storage };
const persistedCart = persistReducer(persistConfig, cartSlice);

export const makeStore = () => {
    return configureStore({
        reducer: {
            cart: persistedCart
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']