'use client'
import { useEffect, useMemo, useState } from 'react'
import { findNeighbour } from 'fumadocs-core/page-tree'
import { getBreadcrumbItems } from 'fumadocs-core/breadcrumb'
import { SEED_CATEGORIES, SEED_PAGES } from './seedData'

export const CMS_BASE_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CMS_URL) || 'http://localhost:3001'

/**
 * Normalizes Payload CMS documents (where category can be a populated object or a slug)
 * into a unified structure consumed by Fumadocs PageTree and TOC builders.
 */
function normalizePayloadData(categories, pages) {
  const catById = new Map()
  const normCats = [...categories]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((c) => {
      catById.set(c.id, c.slug)
      catById.set(c.slug, c.slug)
      return c
    })

  const normPages = [...pages]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((p) => {
      const categorySlug =
        p.categorySlug ||
        (typeof p.category === 'object' && p.category !== null
          ? p.category.slug
          : catById.get(p.category)) ||
        'infra-custody'
      return { ...p, categorySlug }
    })

  return { categories: normCats, pages: normPages }
}

/**
 * Builds a genuine Fumadocs PageTree.Root from Payload CMS Categories and DocsPages.
 */
export function buildFumadocsPageTree(categories, pages, lang = 'pt', filterQuery = '') {
  const q = filterQuery.trim().toLowerCase()

  const folders = categories
    .map((cat) => {
      const catTitle = lang === 'pt' ? cat.titlePt : cat.titleEn
      const catPages = pages.filter((p) => p.categorySlug === cat.slug)

      const items = catPages
        .filter((p) => {
          if (!q) return true
          const label = (lang === 'pt' ? p.navLabelPt : p.navLabelEn) || ''
          const method = p.method || ''
          return label.toLowerCase().includes(q) || method.toLowerCase().includes(q)
        })
        .map((p) => ({
          type: 'page',
          name: lang === 'pt' ? p.navLabelPt : p.navLabelEn,
          url: `/docs/${p.slug}`,
          // Payload CMS metadata preserved on the Fumadocs Item node
          $slug: p.slug,
          $method: p.method || 'DOC',
          $badge: p.badge || null,
        }))

      return {
        type: 'folder',
        name: catTitle,
        $slug: cat.slug,
        $accent: !!cat.accent,
        $moduleId: cat.moduleId || 'treasury',
        children: items,
      }
    })
    .filter((folder) => folder.children.length > 0)

  return {
    name: lang === 'pt' ? 'Documentação ALL X' : 'ALL X Documentation',
    children: folders,
  }
}

/**
 * Extracts Fumadocs TOCItemType[] (`{ title, url, depth }`) from Payload CMS dynamic blocks.
 */
export function extractFumadocsToc(page, lang = 'pt') {
  if (!page || !Array.isArray(page.blocks)) return []
  return page.blocks
    .filter((b) => b.anchorId && (b.tocLabelPt || b.tocLabelEn || b.titlePt || b.titleEn))
    .map((b) => ({
      title:
        lang === 'pt'
          ? b.tocLabelPt || b.titlePt
          : b.tocLabelEn || b.titleEn,
      url: `#${b.anchorId}`,
      depth: 2,
    }))
}

/**
 * Hook that connects Payload CMS (/backend) -> Fumadocs PageTree, Breadcrumbs, Neighbours & TOC.
 */
export function usePayloadFumadocs({ activeSlug, lang = 'pt', sidebarFilter = '' }) {
  const [cmsState, setCmsState] = useState(() => ({
    source: 'seed',
    ...normalizePayloadData(SEED_CATEGORIES, SEED_PAGES),
  }))

  useEffect(() => {
    let cancelled = false
    fetch(`${CMS_BASE_URL}/api/docs-tree`, { mode: 'cors' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        if (cancelled) return
        if (Array.isArray(data?.categories) && data.categories.length > 0 && Array.isArray(data?.pages) && data.pages.length > 0) {
          setCmsState({
            source: 'payload-live',
            ...normalizePayloadData(data.categories, data.pages),
          })
        }
      })
      .catch(() => {
        // Fallback seamlessly to local Payload seed snapshot when backend is offline
      })
    return () => {
      cancelled = true
    }
  }, [])

  const fullTree = useMemo(
    () => buildFumadocsPageTree(cmsState.categories, cmsState.pages, lang, ''),
    [cmsState.categories, cmsState.pages, lang],
  )

  const filteredTree = useMemo(
    () => buildFumadocsPageTree(cmsState.categories, cmsState.pages, lang, sidebarFilter),
    [cmsState.categories, cmsState.pages, lang, sidebarFilter],
  )

  const currentPageDoc = useMemo(
    () => cmsState.pages.find((p) => p.slug === activeSlug) || cmsState.pages[0],
    [cmsState.pages, activeSlug],
  )

  const currentUrl = `/docs/${currentPageDoc?.slug || 'managed-wallets'}`

  const toc = useMemo(
    () => extractFumadocsToc(currentPageDoc, lang),
    [currentPageDoc, lang],
  )

  const neighbours = useMemo(
    () => findNeighbour(fullTree, currentUrl),
    [fullTree, currentUrl],
  )

  const breadcrumbs = useMemo(() => {
    const raw = lang === 'pt' ? currentPageDoc?.breadcrumbsPt : currentPageDoc?.breadcrumbsEn
    if (Array.isArray(raw) && raw.length >= 3) return raw
    const items = getBreadcrumbItems(currentUrl, fullTree, { includeRoot: true, includePage: true })
    return items.map((i) => String(i.name))
  }, [currentPageDoc, lang, currentUrl, fullTree])

  return {
    source: cmsState.source,
    categories: cmsState.categories,
    pages: cmsState.pages,
    pageTree: filteredTree,
    currentPageDoc,
    toc,
    neighbours,
    breadcrumbs,
  }
}
