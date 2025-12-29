import { useEffect } from 'react'
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, SITE_TWITTER } from '../config/constants'

type Props = {
    title?: string
    description?: string
    url?: string
    image?: string
    overrideTitle?: string
    type?: string
}

export default function Seo({ title, description, url, image, overrideTitle, type = 'website' }: Props) {
    useEffect(() => {
        let fullTitle = SITE_TITLE
        if (overrideTitle) {
            fullTitle = overrideTitle
        } else if (title && title !== SITE_TITLE) {
            fullTitle = `${title} | ${SITE_TITLE}`
        }
        document.title = fullTitle

        const setMeta = (name: string, content?: string) => {
            if (!content) return
            let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
            if (!el) {
                el = document.createElement('meta')
                el.setAttribute('name', name)
                document.head.appendChild(el)
            }
            el.setAttribute('content', content)
        }

        const setProp = (prop: string, content?: string) => {
            if (!content) return
            let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null
            if (!el) {
                el = document.createElement('meta')
                el.setAttribute('property', prop)
                document.head.appendChild(el)
            }
            el.setAttribute('content', content)
        }

        setMeta('description', description ?? SITE_DESCRIPTION)
        setMeta('twitter:card', 'summary_large_image')
        setMeta('twitter:creator', SITE_TWITTER)

        setProp('og:title', fullTitle)
        setProp('og:description', description ?? SITE_DESCRIPTION)
        setProp('og:type', type)
        setProp('og:url', url ?? SITE_URL)
        setProp('og:image', image ?? '/assets/og-image.png')

        // canonical link
        let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']")
        if (!link) {
            link = document.createElement('link')
            link.setAttribute('rel', 'canonical')
            document.head.appendChild(link)
        }
        link.setAttribute('href', url ?? SITE_URL)

        // tidy up: no cleanup to keep site meta persistent
    }, [title, description, url, image, overrideTitle, type])

    return null
}
