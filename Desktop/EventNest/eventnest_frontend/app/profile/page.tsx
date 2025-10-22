"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X, Upload, User } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    image_url: "",
  })
  const [editData, setEditData] = useState(profileData)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.status === 401) {
          localStorage.removeItem("accessToken")
          router.push("/login")
          return
        }

        if (!response.ok) throw new Error("Failed to fetch profile data")

        const data = await response.json()
        setProfileData(data)
        setEditData(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  // ✅ Edit logic
  const handleEdit = () => setIsEditing(true)
  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const response = await fetch("http://127.0.0.1:8000/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      })

      if (!response.ok) throw new Error("Failed to update profile")

      const updatedData = await response.json()
      setProfileData({ ...profileData, ...editData })
      setIsEditing(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({ ...prev, [name]: value }))
  }

  // ✅ Handle profile image upload
  const handleImageUpload = async () => {
    if (!selectedImage) return
    setUploading(true)
    const token = localStorage.getItem("accessToken")

    const formData = new FormData()
    formData.append("image", selectedImage)

    try {
      const res = await fetch("http://127.0.0.1:8000/api/upload-profile-picture/", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Upload failed")

      setProfileData((prev) => ({ ...prev, image_url: data.image_url }))
      alert("Profile picture updated successfully!")
    } catch (err: any) {
      alert(err.message)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="p-10 text-center text-gray-600">Loading profile...</div>
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600 font-light">Manage your account and preferences</p>
          </div>
          {!isEditing && (
            <Button
              onClick={handleEdit}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-light flex items-center gap-2"
            >
              <Edit2 size={18} />
              Edit Profile
            </Button>
          )}
        </div>

        <Card className="p-8 border-pink-100/50 bg-white/60 backdrop-blur-sm space-y-6">
          {/* ✅ Profile Picture Section */}
          <div className="flex flex-col items-center gap-3">
            {profileData.image_url ? (
              <img
                src={profileData.image_url}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-sm border border-pink-100"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                <User size={48} />
              </div>
            )}

            {/* Hidden input for file selection */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
              className="hidden"
              id="fileInput"
            />

            {/* Upload button triggers file picker */}
            <Button
              type="button"
              onClick={() => document.getElementById("fileInput")?.click()}
              variant="outline"
              className="mt-2 border-pink-200 text-pink-600 hover:bg-pink-50 rounded-lg font-light flex items-center gap-2"
              disabled={uploading}
            >
              <Upload size={18} />
              {uploading ? "Uploading..." : "Choose Picture"}
            </Button>

            {/* Save button only appears when an image is selected */}
            {selectedImage && (
              <Button
                onClick={handleImageUpload}
                className="bg-pink-500 hover:bg-pink-600 text-white mt-2 rounded-lg"
                disabled={uploading}
              >
                Save Upload
              </Button>
            )}
          </div>

          {/* ✅ Editable or View Section */}
          {isEditing ? (
            <div className="space-y-4">
              <Input
                type="text"
                name="full_name"
                value={editData.full_name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
              <Input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number"
              />
              <Input
                type="text"
                name="location"
                value={editData.location}
                onChange={handleInputChange}
                placeholder="Location"
              />
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleInputChange}
                placeholder="Tell us something about yourself"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all font-light"
              />
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                  <Save size={18} />
                  Save Changes
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-pink-200 text-pink-600 hover:bg-pink-50 rounded-lg font-light flex items-center gap-2 bg-transparent"
                >
                  <X size={18} />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p><strong>Full Name:</strong> {profileData.full_name}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phone || "—"}</p>
              <p><strong>Location:</strong> {profileData.location || "—"}</p>
              <p><strong>Bio:</strong> {profileData.bio || "—"}</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
