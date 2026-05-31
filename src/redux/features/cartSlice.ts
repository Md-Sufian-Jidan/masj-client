import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
    orderQuantity: number
}

interface InitialState {
    products: CartProduct[]
}

const initialState: InitialState = {
    products: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const productToAdd = state.products.find(
                (product) => product._id === action.payload._id
            );

            if (productToAdd) {
                productToAdd.orderQuantity += 1;
                return;
            }

            state.products.push({ ...action.payload, orderQuantity: 1 });
        },

        incrementOrderQuantity: (state, action) => {
            const productToIncrement = state.products.find((p) => p._id === action.payload._id);
            if (productToIncrement && productToIncrement.orderQuantity < productToIncrement.stock) {
                productToIncrement.orderQuantity += 1;
            }
        },

        decrementOrderQuantity: (state, action) => {
            const productToDecrement = state.products.find((p) => p._id === action.payload._id);
            if (productToDecrement && productToDecrement.orderQuantity > 1) {
                productToDecrement.orderQuantity -= 1;
            }
        },

        removeProduct: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload._id)
        },

    }
});

export const orderedProductsSelector = (state: RootState) => {
    return state.cart.products;
}

export const { addProduct, incrementOrderQuantity, decrementOrderQuantity, removeProduct } = cartSlice.actions
export default cartSlice.reducer