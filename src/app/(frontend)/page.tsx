import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Heart, Star } from 'lucide-react'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const products = await payload.find({
    collection: 'products',
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30">
          <Image src="/hero-image.jpg" alt="Hero" fill className="object-cover -z-10" priority />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Your Perfect Style
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Shop the latest trends in fashion with our curated collection
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-white/90">
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Fashion', 'Electronics', 'Home', 'Beauty'].map((category) => (
              <Link
                href={`/category/${category.toLowerCase()}`}
                key={category}
                className="group relative h-48 overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.docs.map((product, i) => (
              <Card key={i} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="relative p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={
                        typeof product.image === 'object'
                          ? product.image?.url
                            ? product.image.url
                            : '/placeholder.png'
                          : '/placeholder.png'
                      }
                      width={500}
                      height={500}
                      alt={product.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {['New', 'Trending'].map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.descriptioon}</CardDescription>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">(4.5)</span>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter className="p-4">
                  <div className="w-full">
                    {product.prices &&
                      product.prices.length > 0 &&
                      typeof product.prices[0] === 'object' && (
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-2xl font-bold text-gray-900">
                                ₦{product.prices[0].amount.toLocaleString()}
                              </p>
                              {product.prices[0].amount < 100000 && (
                                <Badge variant="destructive" className="text-xs">
                                  20% OFF
                                </Badge>
                              )}
                            </div>
                            {product.prices[0].amount < 100000 && (
                              <p className="text-sm text-gray-500 line-through">
                                ₦{(product.prices[0].amount * 1.2).toLocaleString()}
                              </p>
                            )}
                            {product.prices.length > 1 && (
                              <p className="text-xs text-gray-600 mt-1">
                                +{product.prices.length - 1} more options
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Link href={`/products/${product.id}`}>
                              <Button size="sm" className="bg-black hover:bg-black/90">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                View Options
                              </Button>
                            </Link>
                            {product.prices[0].amount > 50000 && (
                              <p className="text-xs text-green-600 font-medium">Free Shipping</p>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Free Shipping',
                description: 'On orders over $100',
                icon: '🚚',
              },
              {
                title: '24/7 Support',
                description: 'Get help when you need it',
                icon: '💬',
              },
              {
                title: 'Money Back Guarantee',
                description: '30-day return policy',
                icon: '✨',
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
