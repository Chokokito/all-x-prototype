import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const [categoriesRes, pagesRes] = await Promise.all([
      payload.find({
        collection: 'categories',
        sort: 'order',
        limit: 100,
      }),
      payload.find({
        collection: 'docs-pages',
        sort: 'order',
        limit: 200,
        depth: 1,
      }),
    ])

    return NextResponse.json(
      {
        source: 'payload-cms',
        categories: categoriesRes.docs,
        pages: pagesRes.docs,
      },
      { headers: corsHeaders },
    )
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to query Payload CMS' },
      { status: 500, headers: corsHeaders },
    )
  }
}
