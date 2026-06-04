import {createClient, type ClientConfig} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'
import {toHTML, type PortableTextComponents} from '@portabletext/to-html'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error(
    "Variable d'environnement manquante : PUBLIC_SANITY_PROJECT_ID. " +
      'Crée un fichier .env à la racine (voir .env.example).',
  )
}

const config: ClientConfig = {
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  // Lecture au build : le CDN suffit. Un éventuel token (dataset privé)
  // est lu côté serveur uniquement.
  useCdn: true,
  token: import.meta.env.SANITY_API_READ_TOKEN || undefined,
}

export const client = createClient(config)

// ----------------------------------------------------------------------------
// Images
// ----------------------------------------------------------------------------
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ----------------------------------------------------------------------------
// Rendu Portable Text -> HTML (cible les styles existants d'origenea.css)
// ----------------------------------------------------------------------------
const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({value}) => {
      if (!value?.asset) return ''
      const url = urlFor(value).width(1200).fit('max').auto('format').url()
      const alt = value.alt ? String(value.alt) : ''
      return `<img src="${url}" alt="${alt}" loading="lazy" style="width:100%;height:auto;border-radius:14px;margin:32px 0" />`
    },
  },
}

export function renderPortableText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ''
  return toHTML(blocks as any, {components: portableTextComponents})
}

// ----------------------------------------------------------------------------
// Helpers dérivés du contenu (le schema ne stocke ni extrait ni temps de lecture)
// ----------------------------------------------------------------------------
function plainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ''
  return (blocks as any[])
    .filter((b) => b?._type === 'block' && Array.isArray(b.children))
    .map((b) => b.children.map((c: any) => c.text || '').join(''))
    .join(' ')
    .trim()
}

export function excerptFromBlocks(blocks: unknown, max = 160): string {
  const text = plainText(blocks)
  if (text.length <= max) return text
  return text.slice(0, max).replace(/\s+\S*$/, '') + '…'
}

export function readingTime(blocks: unknown): number {
  const words = plainText(blocks).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export function formatDateFr(date: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

// ----------------------------------------------------------------------------
// Requêtes GROQ
// ----------------------------------------------------------------------------
export const POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)]
  | order(date desc){
    title,
    "slug": slug.current,
    date,
    image,
    content
  }`

export const POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    date,
    image,
    content
  }`

export const PAGE_SLUGS_QUERY = `*[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }`

export const PAGE_BY_SLUG_QUERY = `*[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    content
  }`

// ----------------------------------------------------------------------------
// Fetch résilient : en cas d'erreur réseau au build (Sanity injoignable), on
// log un avertissement et on retombe sur une valeur par défaut plutôt que de
// faire échouer tout le build.
// ----------------------------------------------------------------------------
async function safeFetch<T>(query: string, params: Record<string, unknown>, fallback: T): Promise<T> {
  try {
    return await client.fetch<T>(query, params)
  } catch (err) {
    console.warn('[sanity] Échec de la requête, utilisation du fallback :', (err as Error).message)
    return fallback
  }
}

export const getPosts = () => safeFetch<BlogPost[]>(POSTS_QUERY, {}, [])
export const getPostBySlug = (slug: string) =>
  safeFetch<BlogPost | null>(POST_BY_SLUG_QUERY, {slug}, null)
export const getPageSlugs = () => safeFetch<{slug: string}[]>(PAGE_SLUGS_QUERY, {}, [])
export const getPageBySlug = (slug: string) =>
  safeFetch<CmsPage | null>(PAGE_BY_SLUG_QUERY, {slug}, null)

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------
export interface BlogPost {
  title: string
  slug: string
  date: string
  image?: SanityImageSource & {alt?: string}
  content?: unknown
}

export interface CmsPage {
  title: string
  slug: string
  content?: unknown
}
