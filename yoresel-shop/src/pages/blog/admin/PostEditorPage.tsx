import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../../lib/subabase'
import { FiSave, FiArrowLeft, FiImage } from 'react-icons/fi'
import type { Post } from '../../../types'

export default function PostEditorPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        image_url: '',
        published: false,
        seo_title: '',
        seo_description: '',
        tags: ''
    })

    useEffect(() => {
        if (id) {
            fetchPost(id)
        }
    }, [id])

    async function fetchPost(postId: string) {
        setLoading(true)
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single()

        if (error) {
            console.error('Error fetching post:', error)
        }

        if (data) {
            const post = data as Post
            setFormData({
                title: post.title || '',
                slug: post.slug || '',
                content: post.content || '',
                excerpt: post.excerpt || '',
                image_url: post.image_url || '',
                published: post.published || false,
                seo_title: post.seo_title || '',
                seo_description: post.seo_description || '',
                tags: post.tags ? post.tags.join(', ') : ''
            })
        }
        setLoading(false)
    }

    function generateSlug(title: string) {
        return title
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
            slug: !id ? generateSlug(title) : prev.slug // Only auto-generate slug for new posts
        }))
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return

        setUploading(true)
        const file = e.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('blog-images')
            .upload(filePath, file)

        if (uploadError) {
            alert('Resim yüklenirken hata oluştu: ' + uploadError.message)
        } else {
            const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath)
            setFormData(prev => ({ ...prev, image_url: data.publicUrl }))
        }
        setUploading(false)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)

        const user = (await supabase.auth.getUser()).data.user
        if (!user) {
            alert('Oturum açmanız gerekiyor.')
            setLoading(false)
            return
        }

        const postData = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            author_id: user.id,
            updated_at: new Date().toISOString()
        }

        let error
        if (id) {
            const { error: updateError } = await supabase
                .from('posts')
                .update(postData)
                .eq('id', id)
            error = updateError
        } else {
            const { error: insertError } = await supabase
                .from('posts')
                .insert([postData])
            error = insertError
        }

        if (error) {
            alert('Hata: ' + error.message)
        } else {
            navigate('/admin')
        }
        setLoading(false)
    }

    if (loading && id) return <div className="p-8 text-center">Yükleniyor...</div>

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-slate-600 mb-6 hover:text-slate-900">
                <FiArrowLeft /> Listeye Dön
            </button>

            <h1 className="text-2xl font-bold text-slate-800 mb-8">{id ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Temel Bilgiler */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="font-semibold text-lg border-b pb-2 mb-4">İçerik</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Başlık</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={handleTitleChange}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">URL (Slug)</label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={e => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50 font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Kısa Açıklama (Excerpt)</label>
                        <textarea
                            rows={3}
                            value={formData.excerpt}
                            onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">İçerik (HTML)</label>
                        <textarea
                            rows={15}
                            required
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2 font-mono text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="<p>Yazı içeriği buraya...</p>"
                        />
                        <p className="text-xs text-slate-500 mt-1">HTML etiketleri kullanabilirsiniz.</p>
                    </div>
                </div>

                {/* Medya */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="font-semibold text-lg border-b pb-2 mb-4">Kapak Görseli</h2>

                    <div className="flex items-start gap-6">
                        <div className="w-40 h-40 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                            {formData.image_url ? (
                                <img src={formData.image_url} alt="Kapak" className="w-full h-full object-cover" />
                            ) : (
                                <FiImage className="text-4xl text-slate-300" />
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block w-full">
                                <span className="sr-only">Resim Seç</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                  "
                                />
                            </label>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-slate-700 mb-1">veya Resim URL</label>
                                <input
                                    type="text"
                                    value={formData.image_url}
                                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full border border-slate-300 rounded-lg px-4 py-2 text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Ayarları */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
                    <h2 className="font-semibold text-lg border-b pb-2 mb-4">SEO Ayarları</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">SEO Başlığı (Title)</label>
                        <input
                            type="text"
                            value={formData.seo_title}
                            onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                            placeholder={formData.title}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">SEO Açıklaması (Description)</label>
                        <textarea
                            rows={3}
                            value={formData.seo_description}
                            onChange={e => setFormData({ ...formData, seo_description: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Etiketler (Virgülle ayırın)</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-2"
                            placeholder="yöresel, bal, doğal"
                        />
                    </div>
                </div>

                {/* Yayınlama */}
                <div className="flex items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={formData.published}
                            onChange={e => setFormData({ ...formData, published: e.target.checked })}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="font-medium text-slate-700">Yazıyı Yayınla</span>
                    </label>

                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <FiSave /> {loading ? 'Kaydediliyor...' : 'Kaydet'}
                    </button>
                </div>
            </form>
        </div>
    )
}
