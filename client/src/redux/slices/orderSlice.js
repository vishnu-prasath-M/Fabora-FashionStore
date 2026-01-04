import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

export const createOrder = createAsyncThunk(
    'order/create',
    async (order, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(`/orders`, order, config);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'order/cancel',
    async ({ orderId, itemId }, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(`/orders/${orderId}/cancel`, { itemId }, config);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const getOrderDetails = createAsyncThunk(
    'order/details',
    async (id, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`/orders/${id}`, config);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const payOrder = createAsyncThunk(
    'order/pay',
    async ({ orderId, paymentResult }, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/orders/${orderId}/pay`,
                paymentResult,
                config
            );
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const listMyOrders = createAsyncThunk(
    'order/myList',
    async (_, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`/orders/myorders`, config);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        success: false,
        order: null,
        orders: [],
        error: null,
    },
    reducers: {
        resetOrder: (state) => {
            state.success = false;
            state.order = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload || null;
                if (action.payload && Array.isArray(state.orders)) {
                    state.orders = [action.payload, ...state.orders].filter(Boolean);
                }
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(listMyOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(listMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(listMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload) return;

                // Update current order if it matches
                if (state.order && state.order._id === action.payload._id) {
                    state.order = action.payload;
                }
                // Update in orders list
                state.orders = (state.orders || []).map((o) =>
                    o && o._id === action.payload._id ? action.payload : o
                ).filter(Boolean);
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
