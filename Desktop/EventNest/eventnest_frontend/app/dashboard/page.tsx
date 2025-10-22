"use client"

import { useEffect, useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("User") // default name
  const [loading, setLoading] = useState(true)

  const upcomingEvents = [
    {
      id: 1,
      name: "Wedding Reception",
      date: "Dec 15, 2024",
      location: "Lagos",
      vendors: 5,
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Corporate Gala",
      date: "Jan 10, 2025",
      location: "Abuja",
      vendors: 3,
      status: "Planning",
    },
  ]

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.status === 401) {
          localStorage.removeItem("accessToken")
          router.push("/login")
          return
        }

        const data = await res.json()
        setUserName(data.full_name || data.username || "User")
      } catch (err) {
        console.error("Error fetching user:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [router])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your dashboard...
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      <DashboardNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">
            Welcome to Eventnest,!
          </h1>
          <p className="text-gray-600 font-light">
            Manage your events and vendors all in one place
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          <Link href="/meet-vendor">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-pink-100/50 bg-white/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-light text-gray-900">Find Vendors</h3>
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                  🔍
                </div>
              </div>
              <p className="text-sm text-gray-600 font-light">Browse and book vendors by category</p>
            </Card>
          </Link>

          <Link href="/event-planning">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-pink-100/50 bg-white/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-light text-gray-900">Plan Event</h3>
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                  📋
                </div>
              </div>
              <p className="text-sm text-gray-600 font-light">Create a new event with step-by-step guide</p>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-pink-100/50 bg-white/60 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-light text-gray-900">My Profile</h3>
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                  👤
                </div>
              </div>
              <p className="text-sm text-gray-600 font-light">View and edit your profile information</p>
            </Card>
          </Link>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-2xl font-light text-gray-900 mb-6">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="p-6 border-pink-100/50 bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{event.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 font-light">
                      <span>📅 {event.date}</span>
                      <span>📍 {event.location}</span>
                      <span>👥 {event.vendors} vendors</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-light ${
                        event.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status}
                    </span>
                    <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
