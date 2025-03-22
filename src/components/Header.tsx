'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FiShoppingCart, FiUser, FiSearch, FiMenu } from 'react-icons/fi'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Ebawara
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              Products
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-gray-900">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-600 hover:text-gray-900">
              Deals
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>

          {/* Search, Cart, and User */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <FiSearch className="h-6 w-6" />
            </button>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              <div className="relative">
                <FiShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  0
                </span>
              </div>
            </Link>
            <Link href="/account" className="text-gray-600 hover:text-gray-900">
              <FiUser className="h-6 w-6" />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4">
            <div className="relative max-w-lg mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-2 text-gray-400 hover:text-gray-600">
                <FiSearch className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/products"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Deals
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
