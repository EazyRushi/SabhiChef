import { getProductById, getProductReviews, getProducts } from '@/lib/supabase/queries'
import ProductDetailClient from './ProductDetailClient'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, reviews, allProducts] = await Promise.all([
    getProductById(id),
    getProductReviews(id),
    getProducts(),
  ])

  if (!product) notFound()

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return <ProductDetailClient product={product} reviews={reviews} related={related} />
}
