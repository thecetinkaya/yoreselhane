import fs from 'fs'
import path from 'path'

const projectRoot = path.resolve('.');
const samplePath = path.join(projectRoot, 'src', 'sampleData.ts')
const constantsPath = path.join(projectRoot, 'src', 'config', 'constants.ts')
const outPath = path.join(projectRoot, 'public', 'sitemap.xml')

function readSiteUrl() {
  try {
    const txt = fs.readFileSync(constantsPath, 'utf-8')
    const m = txt.match(/SITE_URL\s*=\s*['"]([^'"]+)['"]/)
    if (m) return m[1]
  } catch (e) {
    // ignore
  }
  return 'https://yoreselhane.example'
}

function readSlugs() {
  const content = fs.readFileSync(samplePath, 'utf-8')
  const regex = /slug:\s*'([^']+)'/g
  const slugs = []
  let match
  while ((match = regex.exec(content)) !== null) {
    slugs.push(match[1])
  }
  return slugs
}

const SITE_URL = readSiteUrl()
const slugs = readSlugs()
const now = new Date().toISOString().split('T')[0]

const urls = [
  `${SITE_URL}/`,
  `${SITE_URL}/tum-urunler`,
  ...slugs.map(s => `${SITE_URL}/urun/${s}`)
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n')}\n</urlset>`

fs.writeFileSync(outPath, xml, 'utf-8')
console.log('Sitemap written to', outPath)
