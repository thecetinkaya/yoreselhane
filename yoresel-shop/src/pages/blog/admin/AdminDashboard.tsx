import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/subabase'
import type { Post } from '../../../types'

export default function AdminDashboard() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

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

    if (loading) return <div className="p-8 text-center">Yükleniyor...</div>

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Blog Yönetim Paneli</h1>
                <Link
                    to="/admin/yeni"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                    <FiPlus /> Yeni Yazı Ekle
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="p-4 font-semibold text-slate-600">Başlık</th>
                            <th className="p-4 font-semibold text-slate-600">Durum</th>
                            <th className="p-4 font-semibold text-slate-600">Tarih</th>
                            <th className="p-4 font-semibold text-slate-600 text-right">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {posts.map(post => (
                            <tr key={post.id} className="hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="font-medium text-slate-900">{post.title}</div>
                                    <div className="text-sm text-slate-500">/{post.slug}</div>
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => togglePublish(post)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium border ${post.published
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-slate-100 text-slate-600 border-slate-200'
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
                                <td colSpan={4} className="p-8 text-center text-slate-500">
                                    Henüz hiç yazı eklenmemiş.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
