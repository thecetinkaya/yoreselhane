import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/subabase'
import { FiCalendar, FiArrowLeft, FiShare2 } from 'react-icons/fi'
import Seo from '../../components/Seo'
import type { Post } from '../../types'

export default function BlogPostPage() {
    const { slug } = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchPost() {
            if (!slug) return
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .single()

            if (error) {
                console.error('Error fetching post:', error)
            }

            if (data) setPost(data)
            setLoading(false)
        }
        fetchPost()
    }, [slug])

    if (loading) return <div className="p-20 text-center">Yükleniyor...</div>
    if (!post) return <div className="p-20 text-center">Yazı bulunamadı.</div>

    return (
        <>
            <Seo
                title={post.seo_title || post.title}
                description={post.seo_description || post.excerpt}
                image={post.image_url}
                type="article"
            />

            <article className="bg-white min-h-screen pb-20">
                {/* Header Image */}
                {post.image_url && (
                    <div className="w-full h-[400px] md:h-[500px] relative">
                        <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 container mx-auto">
                            <div className="max-w-4xl mx-auto text-white">
                                <div className="flex items-center gap-4 text-sm md:text-base opacity-90 mb-4">
                                    <span className="flex items-center gap-2"><FiCalendar /> {new Date(post.created_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    {post.tags && post.tags.map((tag: string) => (
                                        <span key={tag} className="bg-white/20 px-3 py-1 rounded-full text-xs backdrop-blur-sm">{tag}</span>
                                    ))}
                                </div>
                                <h1 className="text-3xl md:text-5xl font-bold leading-tight">{post.title}</h1>
                            </div>
                        </div>
                    </div>
                )}

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl mx-auto">
                        {!post.image_url && (
                            <div className="mb-8 border-b pb-8">
                                <h1 className="text-4xl font-bold text-slate-900 mb-4">{post.title}</h1>
                                <div className="text-slate-500 flex items-center gap-4">
                                    <span className="flex items-center gap-2"><FiCalendar /> {new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                                </div>
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="prose prose-lg prose-slate max-w-none
                prose-headings:font-bold prose-headings:text-slate-900
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-lg
              "
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Footer / Share */}
                        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
                            <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
                                <FiArrowLeft /> Tüm Yazılar
                            </Link>
                            <button className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                                <FiShare2 /> Paylaş
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}
