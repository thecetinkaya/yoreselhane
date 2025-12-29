export interface Post {
    id: string
    title: string
    slug: string
    content: string
    excerpt?: string
    image_url?: string
    published: boolean
    created_at: string
    seo_title?: string
    seo_description?: string
    tags?: string[]
}
