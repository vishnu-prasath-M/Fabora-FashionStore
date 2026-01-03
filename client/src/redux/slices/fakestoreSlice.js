import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsByCategory, fetchProductById } from '../../utils/fakestoreApi';

/**
 * Async thunk to fetch products from FakeStore API
 */
export const fetchFakestoreProducts = createAsyncThunk(
    'fakestore/fetchProducts',
    async (category = 'all', { rejectWithValue }) => {
        try {
            const data = await fetchProductsByCategory(category);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Async thunk to fetch single product details
 */
export const fetchFakestoreProductDetails = createAsyncThunk(
    'fakestore/fetchProductDetails',
    async (id, { rejectWithValue }) => {
        try {
            const data = await fetchProductById(id);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const fakestoreSlice = createSlice({
    name: 'fakestore',
    initialState: {
        products: [],
        currentProduct: null,
        loading: false,
        productLoading: false,
        error: null,
        productError: null,
        selectedCategory: 'all',
    },
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearError: (state) => {
            state.error = null;
            state.productError = null;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch products
            .addCase(fetchFakestoreProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFakestoreProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchFakestoreProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch product details
            .addCase(fetchFakestoreProductDetails.pending, (state) => {
                state.productLoading = true;
                state.productError = null;
            })
            .addCase(fetchFakestoreProductDetails.fulfilled, (state, action) => {
                state.productLoading = false;
                state.currentProduct = action.payload;
                state.productError = null;
            })
            .addCase(fetchFakestoreProductDetails.rejected, (state, action) => {
                state.productLoading = false;
                state.productError = action.payload;
            });
    },
});

export const { setCategory, clearError, clearCurrentProduct } = fakestoreSlice.actions;
export default fakestoreSlice.reducer;
