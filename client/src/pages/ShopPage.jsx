import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchFakestoreProducts, setCategory } from '../redux/slices/fakestoreSlice';
import ProductCard from '../components/ProductCard';
import SkeletonProductCard from '../components/SkeletonProductCard';
import { Filter, X } from 'lucide-react';

const ShopPage = () => {
    const [searchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('');

    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.fakestore);

    const keyword = searchParams.get('search') || '';

    useEffect(() => {
        dispatch(fetchFakestoreProducts(selectedCategory));
    }, [dispatch, selectedCategory]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        dispatch(setCategory(category));
        setShowFilters(false);
    };

    const handleRetry = () => {
        dispatch(fetchFakestoreProducts(selectedCategory));
    };

    const searchFilteredProducts = keyword
        ? products.filter((p) =>
            p.title.toLowerCase().includes(keyword.toLowerCase()) ||
            p.description.toLowerCase().includes(keyword.toLowerCase())
        )
        : products;

    const sortedProducts = [...searchFilteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        if (sortBy === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        return 0;
    });

    const categories = [
        { value: 'all', label: 'All Collection' },
        { value: 'men', label: "Gentlemen" },
        { value: 'women', label: "Ladies" },
        { value: 'jewelery', label: "Accessories" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Minimalist Header */}
            <div className="bg-gray-50/50 border-b border-gray-100 flex items-center h-24 sm:h-32">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 w-full flex justify-between items-end pb-6 sm:pb-10">
                    <div>
                        <h1 className="text-3xl sm:text-5xl font-heading font-bold tracking-tighter text-gray-900 leading-none">
                            {selectedCategory === 'all' ? 'The Collection' : categories.find(c => c.value === selectedCategory)?.label}
                        </h1>
                        <div className="flex items-center gap-2 mt-3 text-gray-400 text-sm font-medium">
                            <span>Shop</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{sortedProducts.length} items</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-10 sm:py-16 flex flex-col lg:flex-row gap-12">

                {/* Slim Sidebar Filters */}
                <aside className="lg:w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-12">

                        {/* Categories Desktop */}
                        <div className="hidden lg:block">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Categories</h3>
                            <div className="space-y-1">
                                {categories.map((category) => (
                                    <button
                                        key={category.value}
                                        onClick={() => handleCategoryChange(category.value)}
                                        className={`group flex items-center justify-between w-full text-left py-2 text-[15px] font-medium transition-all duration-300 ${selectedCategory === category.value
                                                ? 'text-gray-900 border-b border-gray-900'
                                                : 'text-gray-400 hover:text-gray-900'
                                            }`}
                                    >
                                        {category.label}
                                        {selectedCategory === category.value && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort Dropdown Premium */}
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Sort By</h3>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-200 py-3 text-[14px] font-bold text-gray-900 outline-none focus:border-gray-900 transition-all cursor-pointer appearance-none"
                                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center', backgroundSize: '16px' }}
                            >
                                <option value="">Latest Arrival</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Most Popular</option>
                            </select>
                        </div>

                        {/* Mobile Filter Toggle Overlay Link */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className="lg:hidden flex items-center justify-center gap-3 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl"
                        >
                            <Filter className="w-4 h-4" />
                            Filters & Sorting
                        </button>
                    </div>
                </aside>

                {/* Dense High-Quality Grid */}
                <div className="flex-1">
                    {error ? (
                        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
                            <p className="text-gray-500 mb-8">{error}</p>
                            <button onClick={handleRetry} className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold">Try Again</button>
                        </div>
                    ) : loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 row-gap-10 sm:gap-10">
                            {[...Array(8)].map((_, index) => <SkeletonProductCard key={index} />)}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 sm:gap-x-10 sm:gap-y-16">
                                {sortedProducts.map((product) => (
                                    <div key={product.id} className="h-full">
                                        <ProductCard product={product} isFakestoreProduct={true} />
                                    </div>
                                ))}
                            </div>

                            {/* Pagination/Load More Placeholder */}
                            <div className="mt-24 text-center border-t border-gray-100 pt-16">
                                <p className="text-[12px] font-bold tracking-[0.3em] text-gray-300 uppercase mb-8">End of Collection</p>
                                <button className="inline-flex items-center gap-2 group text-gray-400 hover:text-gray-900 transition-colors font-bold duration-300">
                                    <span>Back To Top</span>
                                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                                    </div>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Filter Drawer Overlay */}
            {showFilters && (
                <div className="fixed inset-0 z-[60] lg:hidden animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowFilters(false)}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] p-8 pb-12 shadow-2xl animate-in slide-in-from-bottom duration-500">
                        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8"></div>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold">Filters</h2>
                            <button onClick={() => setShowFilters(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.value}
                                            onClick={() => handleCategoryChange(cat.value)}
                                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${selectedCategory === cat.value ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopPage;
