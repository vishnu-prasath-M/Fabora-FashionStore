import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, Package, MapPin, Plus, X, ChevronRight, LogOut, Settings, Bell, Shield } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.order);
    const [showAddressForm, setShowAddressForm] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 text-gray-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-4">
                        <User className="w-3 h-3" />
                        <span>Account Dashboard</span>
                    </div>
                    <h1 className="text-5xl font-heading font-bold text-gray-900 tracking-tighter mb-4">My Profile</h1>
                    <p className="text-gray-500 font-light">Manage your account settings and preferences.</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Sidebar Profile Card */}
                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden sticky top-24">
                            {/* Profile Header */}
                            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 text-center">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
                                <div className="relative">
                                    <div className="w-28 h-28 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center mx-auto mb-6 border-4 border-white/20 shadow-2xl">
                                        <User className="w-12 h-12 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold text-white mb-2">{userInfo.name}</h2>
                                    <p className="text-gray-300 text-sm">{userInfo.email}</p>
                                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">Gold Member</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <nav className="p-6 space-y-3">
                                {/* My Profile */}
                                <Link
                                    to="/profile"
                                    className="group flex items-center justify-between px-6 py-4 rounded-[1.5rem] bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm">My Profile</span>
                                            <span className="block text-xs text-gray-500 mt-0.5">Personal information</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                                </Link>

                                {/* My Orders */}
                                <Link
                                    to="/orders"
                                    className="group flex items-center justify-between px-6 py-4 rounded-[1.5rem] bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all">
                                            <Package className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm">My Orders</span>
                                            <span className="block text-xs text-gray-500 mt-0.5">{orders?.length || 0} total orders</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                                </Link>

                                {/* Settings */}
                                <button className="group w-full flex items-center justify-between px-6 py-4 rounded-[1.5rem] bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg shadow-gray-500/30 group-hover:shadow-xl group-hover:shadow-gray-500/40 transition-all">
                                            <Settings className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-gray-900 text-sm">Settings</span>
                                            <span className="block text-xs text-gray-500 mt-0.5">Preferences & privacy</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                                </button>

                                {/* Divider */}
                                <div className="py-2">
                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                                </div>

                                {/* Sign Out */}
                                <button
                                    onClick={handleLogout}
                                    className="group w-full flex items-center justify-between px-6 py-4 rounded-[1.5rem] bg-gradient-to-r from-red-50 to-red-100/50 border border-red-200 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-200 hover:scale-[1.02]"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-xl group-hover:shadow-red-500/40 transition-all">
                                            <LogOut className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <span className="block font-bold text-red-600 text-sm">Sign Out</span>
                                            <span className="block text-xs text-red-500 mt-0.5">Logout from account</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-red-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full space-y-8">
                        {/* Status Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Membership</p>
                                <h3 className="text-3xl font-heading font-bold text-gray-900">Gold</h3>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                                    <Package className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Total Orders</p>
                                <h3 className="text-3xl font-heading font-bold text-gray-900">{orders?.length || 0}</h3>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
                                    <Bell className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">Notifications</p>
                                <h3 className="text-3xl font-heading font-bold text-gray-900">3</h3>
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
                            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                Account Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Full Name</label>
                                    <input
                                        type="text"
                                        value={userInfo.name}
                                        disabled
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">Email Address</label>
                                    <input
                                        type="email"
                                        value={userInfo.email}
                                        disabled
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Book */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-heading font-bold text-gray-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    Address Book
                                </h2>
                                <button
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-black transition-all hover:scale-105 shadow-xl shadow-gray-200"
                                >
                                    {showAddressForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    {showAddressForm ? 'Cancel' : 'Add New'}
                                </button>
                            </div>

                            {/* Animated Add Form */}
                            <div className={`grid transition-all duration-300 ease-in-out ${showAddressForm ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                                        <h3 className="font-bold text-lg mb-6">Add New Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Street Address" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-gray-900 outline-none transition-colors" />
                                            <input type="text" placeholder="City" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-gray-900 outline-none transition-colors" />
                                            <input type="text" placeholder="Postal Code" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-gray-900 outline-none transition-colors" />
                                            <input type="text" placeholder="Country" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:border-gray-900 outline-none transition-colors" />
                                            <button className="md:col-span-2 bg-gray-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all mt-2 shadow-xl shadow-gray-200">Save Address</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address List */}
                            {userInfo.addresses && userInfo.addresses.length > 0 ? (
                                <div className="space-y-4">
                                    {userInfo.addresses.map((address, index) => (
                                        <div key={index} className="flex items-start gap-5 p-6 border border-gray-200 rounded-2xl hover:border-gray-900 transition-all cursor-pointer group hover:shadow-lg">
                                            <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:from-purple-500 group-hover:to-purple-600 transition-all shadow-lg">
                                                <MapPin className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg mb-1">Home</h4>
                                                <p className="text-gray-500 text-sm">{address.street}, {address.city}, {address.postalCode}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="font-medium">No saved addresses found.</p>
                                    <p className="text-sm mt-1">Add your first address to get started.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
