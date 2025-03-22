import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import config from '@/payload.config'
import { ChevronRight, Heart, RefreshCw, Shield, ShoppingCart, Star, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const product = await payload
    .findByID({
      collection: 'products',
      id,
    })
    .catch(() => null)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <Link href="/products" className="hover:text-gray-900">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={
                  typeof product.image === 'object'
                    ? product.image?.url
                      ? product.image.url
                      : '/placeholder.png'
                    : '/placeholder.png'
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Additional images would go here */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square relative rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    src={
                      typeof product.image === 'object'
                        ? product.image?.url
                          ? product.image.url
                          : '/placeholder.png'
                        : '/placeholder.png'
                    }
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">(121 reviews)</span>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>

            <Separator />

            {/* Price Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price ? `₦${product.price.toLocaleString()}` : 'Price not available'}
                  </span>
                  {product.price && product.price < 100000 && (
                    <>
                      <span className="text-lg text-gray-500 line-through">
                        ₦{(product.price * 1.2).toLocaleString()}
                      </span>
                      <Badge variant="destructive">20% OFF</Badge>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity (you might want to make this client-side interactive) */}
              {product.price && (
                <>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                    <div className="flex items-center border rounded-md">
                      <Button variant="ghost" size="sm" className="px-3">
                        -
                      </Button>
                      <span className="w-12 text-center">1</span>
                      <Button variant="ghost" size="sm" className="px-3">
                        +
                      </Button>
                    </div>
                  </div>

                  <Button size="lg" className="w-full bg-black hover:bg-black/90">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>

                  {product.price > 50000 && (
                    <p className="text-sm text-green-600 flex items-center justify-center gap-2">
                      <Truck className="h-4 w-4" />
                      Eligible for Free Shipping
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">Free Delivery</p>
                <p className="text-xs text-gray-500">Orders over ₦50,000</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">Secure Payment</p>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">Easy Returns</p>
                <p className="text-xs text-gray-500">30 Day Returns</p>
              </div>
            </div>

            <Separator />

            {/* Product Details Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose max-w-none">
                  <p className="text-gray-600">{product.descriptioon}</p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Brand</p>
                    <p className="font-medium">Brand Name</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Model</p>
                    <p className="font-medium">Model Number</p>
                  </div>
                  {/* Add more specifications as needed */}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Customer Reviews</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="ml-2 text-sm text-gray-500">Based on 121 reviews</p>
                      </div>
                    </div>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  {/* Add review list here */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
