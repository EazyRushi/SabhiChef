import { NextRequest, NextResponse } from 'next/server'
import { products } from '@/lib/products'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')

    let filteredProducts = products

    if (category && category !== 'all') {
      filteredProducts = products.filter(p => p.category === category)
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
