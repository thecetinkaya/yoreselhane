// Allow importing CSS files and static assets in TypeScript
declare module '*.css'
declare module '*.scss'

declare module '*.png' {
    const value: string
    export default value
}
declare module '*.jpg' {
    const value: string
    export default value
}
declare module '*.jpeg' {
    const value: string
    export default value
}
declare module '*.svg' {
    const value: string
    export default value
}

// Allow importing other static assets generically
declare module '*?url' {
    const value: string
    export default value
}

// Swiper ships CSS using path imports like 'swiper/css' and 'swiper/css/navigation'
declare module 'swiper/css'
declare module 'swiper/css/navigation'

