import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlistItems: localStorage.getItem('wishlistItems')
        ? JSON.parse(localStorage.getItem('wishlistItems'))
        : [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const item = action.payload;
            if (!item) return;

            const itemId = item._id || item.id;
            const existItem = state.wishlistItems.find((x) => (x?._id || x?.id) === itemId);

            if (!existItem) {
                state.wishlistItems = [...state.wishlistItems, item].filter(Boolean);
                localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
            }
        },
        removeFromWishlist: (state, action) => {
            const idToRemove = action.payload;
            state.wishlistItems = state.wishlistItems.filter(
                (x) => x && (x._id !== idToRemove && x.id !== idToRemove)
            );
            localStorage.setItem('wishlistItems', JSON.stringify(state.wishlistItems));
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
            localStorage.removeItem('wishlistItems');
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
