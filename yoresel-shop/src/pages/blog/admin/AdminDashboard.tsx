import { Link, useNavigate } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiLogOut } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/subabase'
import type { Post } from '../../../types'
import { useAppDispatch } from '../../../hooks'
import { logout } from '../../../slices/authSlice'

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetchPosts()
    }, [])

    async function fetchPosts() {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching posts:', error)
        }

        if (data) setPosts(data)
        setLoading(false)
    }

    async function handleDelete(id: string) {
        if (!window.confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return

        const { error } = await supabase.from('posts').delete().eq('id', id)
        if (!error) {
            setPosts(posts.filter(p => p.id !== id))
        } else {
            console.error('Error deleting post:', error)
            alert('Silme işlemi başarısız oldu.')
        }
    }

    async function togglePublish(post: Post) {
        const { error } = await supabase
            .from('posts')
            .update({ published: !post.published })
            .eq('id', post.id)

        if (!error) {
            setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p))
        } else {
            console.error('Error updating post:', error)
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut()
        dispatch(logout())
        navigate('/')
    }

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Admin Header */}
            <div className="bg-white border-b border-slate-200 mb-8">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-slate-800">Yönetim Paneli</h1>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">Admin</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-sm text-slate-600 hover:text-slate-900">Siteyi Görüntüle</Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                            <FiLogOut /> Çıkış Yap
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-slate-700">Blog Yazıları</h2>
                    <Link
                        to="/admin/yeni"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
                    >
                        <FiPlus /> Yeni Yazı Ekle
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Başlık</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Durum</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm">Tarih</th>
                                <th className="p-4 font-semibold text-slate-600 text-sm text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {posts.map(post => (
                                <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-slate-900">{post.title}</div>
                                        <div className="text-xs text-slate-500 mt-0.5">/{post.slug}</div>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => togglePublish(post)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${post.published
                                                ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                                                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                                                }`}
                                        >
                                            {post.published ? 'Yayında' : 'Taslak'}
                                        </button>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">
                                        {new Date(post.created_at).toLocaleDateString('tr-TR')}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                to={`/admin/duzenle/${post.id}`}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Düzenle"
                                            >
                                                <FiEdit2 />
                                            </Link>
                                            <a
                                                href={`/${post.slug}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                title="Görüntüle"
                                            >
                                                <FiEye />
                                            </a>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Sil"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center gap-2">
                                            <span className="text-4xl">📝</span>
                                            <p>Henüz hiç yazı eklenmemiş.</p>
                                            <Link to="/admin/yeni" className="text-blue-600 hover:underline text-sm">İlk yazını ekle</Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
