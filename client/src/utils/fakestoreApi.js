/**
 * FakeStore API Service
 * Handles all API calls to fakestoreapi.com for fashion products
 */

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStore API
 */
export const fetchAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching all products:', error);
        throw error;
    }
};

/**
 * Fetch men's clothing category
 */
export const fetchMensClothing = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/category/men's clothing`);
        if (!response.ok) {
            throw new Error('Failed to fetch men\'s clothing');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching men\'s clothing:', error);
        throw error;
    }
};

/**
 * Fetch women's clothing category
 */
export const fetchWomensClothing = async () => {
    try {
        const response = await fetch(`${BASE_URL}/products/category/women's clothing`);
        if (!response.ok) {
            throw new Error('Failed to fetch women\'s clothing');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching women\'s clothing:', error);
        throw error;
    }
};

/**
 * Fetch fashion products (men's + women's clothing)
 */
export const fetchFashionProducts = async () => {
    try {
        const [mensClothing, womensClothing] = await Promise.all([
            fetchMensClothing(),
            fetchWomensClothing()
        ]);
        return [...mensClothing, ...womensClothing];
    } catch (error) {
        console.error('Error fetching fashion products:', error);
        throw error;
    }
};

/**
 * Fetch single product by ID
 */
export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw error;
    }
};

/**
 * Fetch products by category
 * @param {string} category - 'all', 'men', or 'women'
 */
export const fetchProductsByCategory = async (category) => {
    try {
        switch (category.toLowerCase()) {
            case 'men':
                return await fetchMensClothing();
            case 'women':
                return await fetchWomensClothing();
            case 'all':
            default:
                return await fetchFashionProducts();
        }
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};
