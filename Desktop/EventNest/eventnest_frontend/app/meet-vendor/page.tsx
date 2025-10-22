"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

const NIGERIAN_STATES = [
  "Lagos",
  "Abuja",
  "Kano",
  "Ibadan",
  "Katsina",
  "Kaduna",
  "Enugu",
  "Port Harcourt",
  "Benin City",
  "Ilorin",
  "Abeokuta",
  "Calabar",
  "Owerri",
  "Akure",
  "Gusau",
  "Maiduguri",
  "Damaturu",
  "Yola",
  "Bauchi",
  "Jos",
  "Lokoja",
  "Lafia",
  "Makurdi",
  "Ado-Ekiti",
  "Osogbo",
  "Asaba",
  "Umuahia",
  "Awka",
  "Gombe",
  "Birnin Kebbi",
  "Sokoto",
  "Zamfara",
  "Zaria",
  "Dutse",
]

const VENDOR_CATEGORIES = [
  { id: 1, name: "DJs", icon: "🎵", color: "from-blue-100 to-blue-50" },
  { id: 2, name: "MCs", icon: "🎤", color: "from-purple-100 to-purple-50" },
  { id: 3, name: "Caterers", icon: "🍽️", color: "from-orange-100 to-orange-50" },
  { id: 4, name: "Decorators", icon: "🎨", color: "from-pink-100 to-pink-50" },
  { id: 5, name: "Light Technicians", icon: "💡", color: "from-yellow-100 to-yellow-50" },
  { id: 6, name: "Photographers", icon: "📸", color: "from-green-100 to-green-50" },
  { id: 7, name: "Dancers", icon: "💃", color: "from-red-100 to-red-50" },
]

export default function MeetVendorPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [searchState, setSearchState] = useState("")

  const filteredStates = NIGERIAN_STATES.filter((state) => state.toLowerCase().includes(searchState.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      <DashboardNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {!selectedState ? (
          <>
            {/* State Selection */}
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Find Vendors</h1>
              <p className="text-gray-600 font-light mb-8">Select your state to browse available vendors</p>

              {/* Search Box */}
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Search states..."
                  value={searchState}
                  onChange={(e) => setSearchState(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-pink-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all font-light"
                />
              </div>

              {/* States Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredStates.map((state) => (
                  <button
                    key={state}
                    onClick={() => setSelectedState(state)}
                    className="p-4 rounded-xl border-2 border-pink-100 hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-light text-gray-900 group-hover:text-pink-600">{state}</span>
                      <ChevronRight size={20} className="text-gray-400 group-hover:text-pink-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Vendor Categories */}
            <div className="mb-12">
              <button
                onClick={() => setSelectedState(null)}
                className="mb-6 text-pink-600 hover:text-pink-700 font-light flex items-center gap-2"
              >
                ← Back to States
              </button>

              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Vendors in {selectedState}</h1>
              <p className="text-gray-600 font-light mb-8">Choose a category to see available vendors</p>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {VENDOR_CATEGORIES.map((category) => (
                  <Card
                    key={category.id}
                    className={`p-8 cursor-pointer hover:shadow-lg transition-all duration-300 border-pink-100/50 bg-gradient-to-br ${category.color} group`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-light text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 font-light mb-4">
                        {Math.floor(Math.random() * 50) + 10} vendors available
                      </p>
                      <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-light w-full">
                        Browse
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Featured Vendors */}
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">Featured Vendors in {selectedState}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((vendor) => (
                  <Card
                    key={vendor}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 border-pink-100/50 bg-white/60 backdrop-blur-sm"
                  >
                    <div className="h-40 bg-gradient-to-br from-pink-200 to-pink-100"></div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Events Co.</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-yellow-400">★★★★★</span>
                        <span className="text-sm text-gray-600 font-light">(124 reviews)</span>
                      </div>
                      <p className="text-sm text-gray-600 font-light mb-4">
                        Professional DJ services for all occasions
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-pink-600 font-medium">₦50,000 - ₦150,000</span>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
