import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import config from '@/payload.config'
import { ChevronRight, Heart, RefreshCw, Shield, ShoppingCart, Star, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

export default async function ProductPage(
  props: Promise<{
    id: string
  }>,
) {
  const id = (await props).id
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

            {/* Price Selection */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Select Package</h2>
              <div className="grid gap-4">
                {product.prices?.map(
                  (price, index) =>
                    typeof price === 'object' && (
                      <Card
                        key={index}
                        className="relative overflow-hidden hover:border-black transition-colors cursor-pointer"
                      >
                        <CardContent className="p-4 flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{price.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-2xl font-bold">
                                ₦{price.amount.toLocaleString()}
                              </span>
                              {price.amount < 100000 && (
                                <>
                                  <span className="text-sm text-gray-500 line-through">
                                    ₦{(price.amount * 1.2).toLocaleString()}
                                  </span>
                                  <Badge variant="destructive" className="text-xs">
                                    20% OFF
                                  </Badge>
                                </>
                              )}
                            </div>
                          </div>
                          <Button>Select</Button>
                        </CardContent>
                      </Card>
                    ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full bg-black hover:bg-black/90">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

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
