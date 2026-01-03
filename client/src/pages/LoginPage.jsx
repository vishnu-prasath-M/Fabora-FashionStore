import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { ArrowRight, Mail, Lock, Sparkles } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-24">
                <div className="max-w-md w-full mx-auto">
                    {/* Brand */}
                    <div className="mb-12">
                        <Link to="/" className="inline-flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="text-3xl font-heading font-bold tracking-tighter text-gray-900">FABORA</span>
                        </Link>
                    </div>

                    <div className="mb-10">
                        <h1 className="text-4xl font-heading font-bold text-gray-900 mb-3 tracking-tight">Welcome back</h1>
                        <p className="text-gray-500 text-lg font-light">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-gray-700">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-bold uppercase tracking-wider text-gray-700">
                                    Password
                                </label>
                                <a href="#" className="text-sm font-semibold text-primary hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-gray-900 outline-none transition-all duration-300 placeholder:text-gray-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign in <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 text-center border-t border-gray-100 pt-8">
                        <p className="text-gray-500">
                            New to FABORA?{' '}
                            <Link to="/register" className="text-gray-900 font-bold hover:underline underline-offset-4 decoration-2 decoration-primary">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Image */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
                <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2600&auto=format&fit=crop"
                    alt="Fashion Auth"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-16">
                    <div className="max-w-lg">
                        <h3 className="text-4xl font-heading font-bold text-white mb-4">Elegance in every stitch, style in every click.</h3>
                        <p className="text-gray-200 text-lg font-light leading-relaxed">
                            Join our community of fashion enthusiasts and discover a world of curated premium collections.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
