import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/subabase'
import { FiCalendar, FiArrowRight } from 'react-icons/fi'
import type { Post } from '../../types'

export default function BlogHomePage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPosts() {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('published', true)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching posts:', error)
            }

            if (data) setPosts(data)
            setLoading(false)
        }
        fetchPosts()
    }, [])

    if (loading) return <div className="container mx-auto p-8 text-center">Yükleniyor...</div>

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Yöreselhane Blog</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Doğal yaşam, sağlıklı beslenme ve yöresel lezzetler hakkında merak ettiğiniz her şey.
                    </p>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                        <article key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                            <Link to={`/${post.slug}`} className="block aspect-video bg-slate-100 overflow-hidden">
                                {post.image_url ? (
                                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">Görsel Yok</div>
                                )}
                            </Link>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                                    <span className="flex items-center gap-1"><FiCalendar /> {new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                                    {/* <span className="flex items-center gap-1"><FiUser /> Yöreselhane</span> */}
                                </div>

                                <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                                    <Link to={`/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                                    {post.excerpt || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...'}
                                </p>

                                <Link to={`/${post.slug}`} className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:gap-2 transition-all">
                                    Devamını Oku <FiArrowRight />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        Henüz yayınlanmış bir yazı bulunmuyor.
                    </div>
                )}
            </div>
        </div>
    )
}
