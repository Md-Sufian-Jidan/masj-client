import { ICoupon, IProduct } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addCoupon } from "@/services/couponService";

export interface CartProduct extends IProduct {
    orderQuantity: number;
};

interface InitialState {
    products: CartProduct[];
    city: string;
    shippingAddress: string;
    shopId: string;
    coupon: {
        code: string;
        discountValue: number;
        isLoading: boolean;
        error: string;
    };
};

const initialState: InitialState = {
    products: [],
    city: "",
    shippingAddress: "",
    shopId: "",
    coupon: {
        code: "",
        discountValue: 0,
        isLoading: false,
        error: ""
    }
};

export const fetchCoupon = createAsyncThunk(
    "cart/fetchCoupon",
    async ({ couponCode, subtotal, shopId }: ICoupon) => {
        try {
            const res = await addCoupon({ couponCode, subtotal, shopId });
            return res;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {

            if (state.products.length === 0) {
                state.shopId = action.payload.shop._id;
            } else if (state.shopId !== action.payload.shop._id) {
                return;
            }

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
            const productToIncrement = state.products.find(
                (product) => product._id === action.payload
            );

            if (productToIncrement) {
                productToIncrement.orderQuantity += 1;
                return;
            }
        },
        decrementOrderQuantity: (state, action) => {
            const productToIncrement = state.products.find(
                (product) => product._id === action.payload
            );

            if (productToIncrement && productToIncrement.orderQuantity > 1) {
                productToIncrement.orderQuantity -= 1;
                return;
            }
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product._id !== action.payload
            );
        },
        updateCity: (state, action) => {
            state.city = action.payload;
        },
        updateShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        clearCart: (state) => {
            state.products = [];
            state.city = "";
            state.shippingAddress = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoupon.pending, (state) => {
            state.coupon.isLoading = true;
            state.coupon.error = "";
        });
        builder.addCase(fetchCoupon.rejected, (state, action) => {
            state.coupon.isLoading = false;
            state.coupon.error = action.error.message as string;
            state.coupon.code = "";
            state.coupon.discountValue = 0;
        });
        builder.addCase(fetchCoupon.fulfilled, (state, action) => {
            state.coupon.isLoading = false;
            state.coupon.error = "";
            state.coupon.code = action.payload.data.coupon.code;
            state.coupon.discountValue = action.payload.data.discountValue;
        });
    },
});

// Products
export const orderedProductsSelector = (state: RootState) => {
    return state.cart.products;
};

export const orderSelector = (state: RootState) => {
    return {
        products: state.cart.products.map((product) => ({
            product: product._id,
            quantity: product.orderQuantity,
            color: "White", // make it dynamic
        })),
        // coupon: state.cart.coupon.code,
        shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
        paymentMethod: "Online",
    };
};

export const shopSelector = (state: RootState) => {
    return state.cart.shopId;
};

// Payment
export const subtotalSelector = (state: RootState) => {
    return state.cart.products.reduce((acc, product) => {
        if (product.offerPrice) {
            console.log(product.offerPrice);
            return acc + product.offerPrice * product.orderQuantity;
        } else {
            console.log(product.price, "Price");
            return acc + product.price * product.orderQuantity;
        }
    }, 0);
};

export const shippingCostSelector = (state: RootState) => {
    if (
        state.cart.city &&
        state.cart.city === "Dhaka" &&
        state.cart.products.length > 0
    ) {
        return 60;
    } else if (
        state.cart.city &&
        state.cart.city !== "Dhaka" &&
        state.cart.products.length > 0
    ) {
        return 120;
    } else {
        return 0;
    }
};

export const grandTotalSelector = (state: RootState) => {
    const subTotal = subtotalSelector(state);
    const shippingCost = shippingCostSelector(state);
    const discountAmout = discountValueSelector(state);

    return (subTotal - discountAmout) + shippingCost;
};

export const couponSelector = (state: RootState) => {
    return state.cart.coupon;
};

export const discountValueSelector = (state: RootState) => {
    return state.cart.coupon.discountValue;
};

// Address
export const citySelector = (state: RootState) => {
    return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
    return state.cart.shippingAddress;
};

export const { addProduct, incrementOrderQuantity, decrementOrderQuantity, removeProduct, updateCity, updateShippingAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;