import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { User, Package, MapPin, Plus, X, ChevronRight, LogOut } from 'lucide-react';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { orders } = useSelector((state) => state.order);
    const [showAddressForm, setShowAddressForm] = useState(false);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    if (!userInfo) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start gap-8">

                    {/* Sidebar Profile Card */}
                    <div className="w-full md:w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/20">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white">{userInfo.name}</h2>
                                <p className="text-gray-300 text-sm mt-1">{userInfo.email}</p>
                            </div>

                            <nav className="p-4 space-y-1">
                                <Link to="/profile" className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 text-gray-900 font-medium">
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-primary" />
                                        <span>Personal Info</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Link>
                                <Link to="/orders" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Package className="w-5 h-5" />
                                        <span>My Orders</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Link>
                                {userInfo.isAdmin && (
                                    <Link to="/admin/dashboard" className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded bg-red-100 flex items-center justify-center text-xs font-bold text-red-600">A</div>
                                            <span>Admin Dashboard</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </Link>
                                )}
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors mt-4">
                                    <LogOut className="w-5 h-5" />
                                    <span>Sign Out</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full space-y-8">
                        {/* Status Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm mb-1">Membership Status</p>
                                <h3 className="text-2xl font-bold text-gray-900">Gold Member</h3>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm mb-1">Total Orders</p>
                                <h3 className="text-2xl font-bold text-gray-900">{orders ? orders.length : 0}</h3>
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-primary" />
                                Account Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                                    <input type="text" value={userInfo.name} disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                                    <input type="email" value={userInfo.email} disabled className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
                                </div>
                            </div>
                        </div>

                        {/* Address Book */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Address Book
                                </h2>
                                <button
                                    onClick={() => setShowAddressForm(!showAddressForm)}
                                    className="btn-outline flex items-center gap-2 text-sm py-2"
                                >
                                    {showAddressForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    {showAddressForm ? 'Cancel' : 'Add New'}
                                </button>
                            </div>

                            {/* Animated Add Form */}
                            <div className={`grid transition-all duration-300 ease-in-out ${showAddressForm ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                        <h3 className="font-bold mb-4">Add New Address</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <input type="text" placeholder="Street Address" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none" />
                                            <input type="text" placeholder="City" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none" />
                                            <input type="text" placeholder="Postal Code" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none" />
                                            <input type="text" placeholder="Country" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary outline-none" />
                                            <button className="md:col-span-2 btn-primary py-3 rounded-xl mt-2">Save Address</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address List */}
                            {userInfo.addresses && userInfo.addresses.length > 0 ? (
                                <div className="space-y-4">
                                    {userInfo.addresses.map((address, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors cursor-pointer group">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">Home</h4>
                                                <p className="text-gray-500 text-sm mt-1">{address.street}, {address.city}, {address.postalCode}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    No saved addresses found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProfilePage;
