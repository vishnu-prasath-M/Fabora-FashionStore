import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { ShoppingBag, Heart, User, Menu, X, Search, ChevronDown, ChevronUp, ShoppingCart, LogOut, UserCog, Package, Home, Store, Info, Phone, LogIn, UserPlus } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// NavLink component with active state
const NavLink = ({ to, children, icon: Icon, isMobile = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`${isMobile ? 'flex items-center w-full px-4 py-3 text-lg' : 'relative px-4 py-2'}`}
    >
      <motion.span
        className={`flex items-center gap-2 transition-colors duration-300 ${
          isActive
            ? 'text-primary-600 font-medium'
            : 'text-gray-700 hover:text-primary-600'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </motion.span>
      {!isMobile && isActive && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
          layoutId="activeNavLink"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [isHoveringCart, setIsHoveringCart] = useState(false);
    const [isHoveringWishlist, setIsHoveringWishlist] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const navRef = useRef(null);
    
    const { scrollY } = useScroll();
    const backgroundColor = useTransform(
      scrollY,
      [0, 20],
      ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.98)']
    );
    const shadow = useTransform(
      scrollY,
      [0, 20],
      ['0 4px 6px -1px rgba(0, 0, 0, 0), 0 2px 4px -1px rgba(0, 0, 0, 0)', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)']
    );
    const backdropFilter = useTransform(
      scrollY,
      [0, 20],
      ['blur(0px)', 'blur(10px)']
    );

    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);
    
    const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const wishlistItemsCount = wishlistItems.length;

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
        setIsUserMenuOpen(false);
        setIsMobileSearchOpen(false);
    }, [location]);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsUserMenuOpen(false);
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${searchQuery}`);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { to: '/', label: 'Home', icon: Home },
        { to: '/shop', label: 'Shop', icon: Store },
        { to: '/about', label: 'About', icon: Info },
        { to: '/contact', label: 'Contact', icon: Phone },
    ];

    const userMenuItems = [
        { to: '/profile', label: 'Profile', icon: User },
        { to: '/orders', label: 'My Orders', icon: Package },
        ...(userInfo?.isAdmin ? [{ to: '/admin/dashboard', label: 'Admin Dashboard', icon: UserCog }] : []),
        { action: handleLogout, label: 'Logout', icon: LogOut }
    ];

    return (
        <motion.nav 
            ref={navRef}
            className="fixed w-full z-50 py-3 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundColor,
                boxShadow: shadow,
                backdropFilter,
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center">
                    {/* Mobile menu button (removed duplicate, single control kept on right) */}

                    {/* Logo */}
                    <motion.div 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link to="/" className="flex items-center group">
                            <motion.span 
                                className="text-3xl font-serif font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                FABORA
                            </motion.span>
                            <motion.span 
                                className="ml-2 text-xs text-gray-500 font-light italic hidden sm:inline-block"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                LUXURY FASHION
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <NavLink key={link.to} to={link.to}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <form 
                        onSubmit={handleSearch}
                        className="hidden md:flex items-center relative w-64"
                    >
                        <Search className="absolute left-3 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300"
                        />
                    </form>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Wishlist */}
                        <motion.div 
                            className="relative"
                            onHoverStart={() => setIsHoveringWishlist(true)}
                            onHoverEnd={() => setIsHoveringWishlist(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/wishlist" className="relative inline-flex items-center justify-center w-10 h-10 text-gray-600 hover:text-primary-600 transition-colors">
                                <Heart 
                                    className={`w-6 h-6 transition-all duration-300 ${isHoveringWishlist ? 'fill-primary-600 text-primary-600' : ''}`} 
                                />
                                {wishlistItemsCount > 0 && (
                                    <motion.span 
                                        className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-sm"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    >
                                        {wishlistItemsCount}
                                    </motion.span>
                                )}
                            </Link>
                        </motion.div>

                        {/* Cart */}
                        <motion.div 
                            className="relative"
                            onHoverStart={() => setIsHoveringCart(true)}
                            onHoverEnd={() => setIsHoveringCart(false)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to="/cart" className="relative inline-flex items-center justify-center w-10 h-10 text-gray-600 hover:text-primary-600 transition-colors">
                                <ShoppingCart 
                                    className={`w-6 h-6 transition-transform duration-300 ${isHoveringCart ? 'text-primary-600' : ''}`} 
                                />
                                {cartItemsCount > 0 && (
                                    <motion.span 
                                        className="absolute -top-0.5 -right-0.5 bg-primary-600 text-white text-[10px] rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-sm"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    >
                                        {cartItemsCount}
                                    </motion.span>
                                )}
                            </Link>

                            {/* Cart Preview */}
                            <AnimatePresence>
                                {isHoveringCart && cartItemsCount > 0 && (
                                    <motion.div 
                                        className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden z-50"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="p-3 bg-gray-50 border-b">
                                            <h3 className="text-sm font-medium text-gray-700">Your Cart ({cartItemsCount})</h3>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto p-2">
                                            {cartItems.slice(0, 3).map((item) => (
                                                <div key={item.product} className="flex items-center p-2 hover:bg-gray-50 rounded">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div className="ml-3 flex-1">
                                                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                                                        <p className="text-xs text-gray-500">{item.qty} × ₹{item.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {cartItems.length > 3 && (
                                                <p className="text-xs text-center text-gray-500 py-2">+{cartItems.length - 3} more items</p>
                                            )}
                                        </div>
                                        <div className="p-3 bg-gray-50 border-t">
                                            <Link 
                                                to="/cart" 
                                                className="block w-full text-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-md hover:bg-primary-700 transition-colors"
                                            >
                                                View Cart
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* User Menu */}
                        {userInfo ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center text-gray-600 hover:text-primary-600 transition-colors focus:outline-none"
                                    aria-expanded={isUserMenuOpen}
                                    aria-label="User menu"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="ml-1 text-sm hidden lg:inline-block">
                                        {userInfo.name.split(' ')[0]}
                                    </span>
                                    {isUserMenuOpen ? (
                                        <ChevronUp className="ml-1 w-4 h-4 hidden lg:block" />
                                    ) : (
                                        <ChevronDown className="ml-1 w-4 h-4 hidden lg:block" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                                        >
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                to="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                My Orders
                                            </Link>
                                            {userInfo.isAdmin && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                            >
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors hidden lg:inline-block"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden space-x-4">
                        <button 
                            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            aria-label="Menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                </div>

                {/* Mobile Search */}
                <AnimatePresence>
                    {isMobileSearchOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                        >
                            <form onSubmit={handleSearch} className="py-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-3 pl-10 text-sm border border-gray-200 focus:border-gray-400 focus:ring-0 focus:outline-none"
                                        autoFocus
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Fullscreen overlay for background dimming */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden"
                                onClick={() => setIsOpen(false)}
                            />
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="relative md:hidden overflow-hidden border-t border-gray-100 bg-white z-50"
                            >
                                <div className="py-4 space-y-1">
                                <Link 
                                    to="/" 
                                    className={`block px-4 py-3 text-base font-medium ${location.pathname === '/' ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                                >
                                    Home
                                </Link>
                                <Link 
                                    to="/shop" 
                                    className={`block px-4 py-3 text-base font-medium ${location.pathname.startsWith('/shop') ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                                >
                                    Shop
                                </Link>
                                <Link 
                                    to="/about" 
                                    className={`block px-4 py-3 text-base font-medium ${location.pathname === '/about' ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                                >
                                    About
                                </Link>
                                <Link 
                                    to="/contact" 
                                    className={`block px-4 py-3 text-base font-medium ${location.pathname === '/contact' ? 'text-gray-900 bg-gray-50' : 'text-gray-600 hover:bg-gray-50'} transition-colors`}
                                >
                                    Contact
                                </Link>
                                
                                {!userInfo && (
                                    <Link 
                                        to="/login" 
                                        className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                )}
                                
                                {userInfo && (
                                    <>
                                        <div className="border-t border-gray-100 my-2"></div>
                                        <Link 
                                            to="/profile" 
                                            className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            My Profile
                                        </Link>
                                        <Link 
                                            to="/orders" 
                                            className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            My Orders
                                        </Link>
                                        {userInfo.isAdmin && (
                                            <Link 
                                                to="/admin/dashboard" 
                                                className="block px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                            >
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
