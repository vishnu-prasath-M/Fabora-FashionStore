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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 py-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-3 group">
                        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-gray-300/40">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-4xl font-heading font-bold tracking-tighter text-gray-900">FABORA</span>
                    </Link>
                    <p className="mt-2 text-gray-500">Premium Fashion E‑Commerce</p>
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 sm:p-10">
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-heading font-bold text-gray-900 tracking-tight">Sign in</h1>
                        <p className="text-gray-500 mt-1">Welcome back to FABORA</p>
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
                            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black hover:shadow-2xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign in <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-500">
                        New to FABORA?{' '}
                        <Link to="/register" className="text-gray-900 font-bold hover:underline underline-offset-4">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
