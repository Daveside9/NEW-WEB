"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-pink-50 to-white overflow-hidden">
      {/* Animated Floral Background */}
      <div className="floral-bg">
        <svg
          className="floral-element"
          style={{ top: "10%", left: "5%", width: "200px", height: "200px" }}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="1"
            className="text-pink-300"
            opacity="0.3"
          />
          <path d="M100 20 Q140 60 100 100 Q60 60 100 20" fill="currentColor" className="text-pink-200" opacity="0.2" />
          <circle cx="100" cy="100" r="15" fill="currentColor" className="text-pink-400" opacity="0.3" />
        </svg>
        <svg
          className="floral-element"
          style={{ top: "60%", right: "8%", width: "250px", height: "250px" }}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="1"
            className="text-pink-300"
            opacity="0.2"
          />
          <path
            d="M100 10 Q150 50 100 100 Q50 50 100 10"
            fill="currentColor"
            className="text-pink-200"
            opacity="0.15"
          />
          <path
            d="M100 100 Q150 150 100 190 Q50 150 100 100"
            fill="currentColor"
            className="text-pink-200"
            opacity="0.15"
          />
        </svg>
        <svg
          className="floral-element"
          style={{ top: "30%", right: "15%", width: "180px", height: "180px" }}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="currentColor"
            strokeWidth="1"
            className="text-pink-300"
            opacity="0.25"
          />
          <circle cx="100" cy="100" r="20" fill="currentColor" className="text-pink-300" opacity="0.2" />
        </svg>
        <svg
          className="floral-element"
          style={{ bottom: "15%", left: "10%", width: "220px", height: "220px" }}
          viewBox="0 0 200 200"
          fill="none"
        >
          <path d="M100 20 L140 80 L100 100 L60 80 Z" fill="currentColor" className="text-pink-200" opacity="0.15" />
          <path d="M100 100 L150 140 L100 160 L50 140 Z" fill="currentColor" className="text-pink-200" opacity="0.15" />
        </svg>
        <svg
          className="floral-element"
          style={{ bottom: "25%", right: "5%", width: "200px", height: "200px" }}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="currentColor"
            strokeWidth="1"
            className="text-pink-300"
            opacity="0.2"
          />
          <circle cx="100" cy="100" r="25" fill="currentColor" className="text-pink-300" opacity="0.25" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-2 tracking-tight">
              EventVendor
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-light">Find & Book Perfect Vendors for Your Event</p>
          </div>

          {/* Main Heading */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">
              Plan Your Perfect Event
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
              Connect with top-rated event vendors across Nigeria. From DJs and caterers to decorators and
              photographers, find everything you need in one place.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-12 sm:mb-16 bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-sm border border-pink-100/50">
            <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">How It Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-3 text-pink-600 font-semibold">
                  1
                </div>
                <p className="text-sm text-gray-600 font-light">Browse vendors by category and location</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-3 text-pink-600 font-semibold">
                  2
                </div>
                <p className="text-sm text-gray-600 font-light">Compare prices and reviews</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-3 text-pink-600 font-semibold">
                  3
                </div>
                <p className="text-sm text-gray-600 font-light">Book and manage your vendors</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link href="/meet-vendor" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Meet a Vendor
              </Button>
            </Link>
            <Link href="/event-planning" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-medium rounded-full transition-all duration-300 bg-transparent"
              >
                Full Event Planning
              </Button>
            </Link>
          </div>

          {/* Auth Links */}
          <div className="mt-12 sm:mt-16 flex gap-4 justify-center text-sm">
            <Link href="/login" className="text-gray-600 hover:text-pink-600 transition-colors font-light">
              Login
            </Link>
            <span className="text-gray-300">•</span>
            <Link href="/signup" className="text-gray-600 hover:text-pink-600 transition-colors font-light">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
