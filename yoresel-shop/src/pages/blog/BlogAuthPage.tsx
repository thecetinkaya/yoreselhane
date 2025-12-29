import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiLock } from 'react-icons/fi'
import { supabase } from '../../lib/subabase'
import { useAppDispatch } from '../../hooks'
import { login } from '../../slices/authSlice'
import Seo from '../../components/Seo'

export default function BlogAuthPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) throw error

            if (data.user) {
                // Check if user is admin
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.user.id)
                    .single()

                if (profile?.role !== 'admin') {
                    await supabase.auth.signOut()
                    throw new Error('Bu alana sadece yöneticiler giriş yapabilir.')
                }

                dispatch(login({
                    id: data.user.id,
                    name: data.user.email || '',
                    email: data.user.email || '',
                    role: profile.role
                }))

                navigate('/admin')
            }
        } catch (err: any) {
            setError(err.message || 'Giriş yapılırken bir hata oluştu.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <Seo title="Admin Girişi" />

            <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex min-h-[600px]">
                {/* Left Side - Illustration */}
                <div className="hidden lg:flex w-1/2 bg-white items-center justify-center relative p-12 border-r border-slate-100">
                    <div className="absolute top-8 left-0 w-full text-center">
                        <div className="flex items-center justify-center gap-2">
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            </div>
                            <span className="font-bold text-slate-700 tracking-wider text-sm">YÖRESELHANE</span>
                        </div>
                    </div>

                    <div className="relative w-full max-w-md">
                        {/* Abstract Security Illustration using CSS/SVG */}
                        <svg viewBox="0 0 400 300" className="w-full h-auto drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            {/* Monitor */}
                            <rect x="50" y="50" width="300" height="180" rx="10" fill="#fff" stroke="#334155" strokeWidth="3" />
                            <rect x="60" y="60" width="280" height="140" rx="5" fill="#f8fafc" />
                            <path d="M170 230 L230 230 L240 250 L160 250 Z" fill="#334155" />
                            <rect x="140" y="250" width="120" height="10" rx="2" fill="#334155" />

                            {/* User Icon inside Monitor */}
                            <circle cx="200" cy="110" r="25" fill="#e2e8f0" stroke="#8b5cf6" strokeWidth="2" />
                            <path d="M175 150 Q200 180 225 150" fill="none" stroke="#8b5cf6" strokeWidth="2" />

                            {/* Shield */}
                            <path d="M280 40 L340 40 L340 80 Q310 110 280 80 Z" fill="url(#grad1)" transform="translate(20, 20)" />
                            <path d="M300 65 L310 75 L325 55" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(20, 20)" />

                            {/* Lock */}
                            <rect x="220" y="140" width="40" height="30" rx="5" fill="#fff" stroke="#334155" strokeWidth="2" />
                            <path d="M230 140 L230 125 Q240 115 250 125 L250 140" fill="none" stroke="#334155" strokeWidth="2" />
                            <circle cx="240" cy="155" r="3" fill="#334155" />

                            {/* Decorative Elements */}
                            <circle cx="40" cy="100" r="5" fill="#fbbf24" />
                            <circle cx="360" cy="200" r="8" fill="#60a5fa" />
                            <path d="M30 200 Q80 150 130 220" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
                        </svg>

                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-yellow-50 rounded-full blur-3xl opacity-50"></div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center relative">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-10">
                            <div className="w-12 h-1 bg-purple-600 mb-6"></div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Login as Admin User</h2>
                            <p className="text-slate-500 text-sm">Please enter your credentials to access the dashboard.</p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiUser className="text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="admin@yoreselhane.com"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiLock className="text-slate-400 group-focus-within:text-purple-600 transition-colors" size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg shadow-purple-500/30 text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? 'LOGGING IN...' : 'LOGIN'}
                            </button>

                            <div className="flex flex-col items-center gap-4 mt-8">
                                <button type="button" className="text-sm text-slate-500 hover:text-purple-600 transition-colors">
                                    Forgot your password?
                                </button>
                                <button type="button" className="text-sm text-purple-600 font-medium hover:text-purple-700 transition-colors">
                                    Get help Signed in.
                                </button>
                            </div>
                        </form>

                        <div className="absolute bottom-8 left-0 w-full text-center">
                            <p className="text-xs text-slate-400">
                                <a href="#" className="hover:text-slate-600">Terms of use</a>
                                <span className="mx-2">.</span>
                                <a href="#" className="hover:text-slate-600">Privacy policy</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-600 transform -skew-y-12 origin-bottom-left opacity-10"></div>
                <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-green-400 transform skew-y-12 origin-bottom-right opacity-10"></div>
            </div>
        </div>
    )
}
