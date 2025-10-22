"use client"

import { DashboardNav } from "@/components/dashboard-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Lock, Eye, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const handleNotificationToggle = (setting: string) => {
    console.log("Toggle:", setting)
  }

  const handleChangePassword = () => {
    console.log("Change password")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Delete account")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600 font-light">Manage your account preferences and security</p>
        </div>

        {/* Notification Settings */}
        <Card className="p-8 border-pink-100/50 bg-white/60 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-pink-600" />
            <h2 className="text-2xl font-light text-gray-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { id: 1, label: "Email notifications for new vendor messages", enabled: true },
              { id: 2, label: "Event reminders", enabled: true },
              { id: 3, label: "Booking confirmations", enabled: true },
              { id: 4, label: "Marketing emails", enabled: false },
            ].map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-pink-100/50"
              >
                <label className="text-gray-700 font-light cursor-pointer">{setting.label}</label>
                <button
                  onClick={() => handleNotificationToggle(setting.id.toString())}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    setting.enabled ? "bg-pink-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-8 border-pink-100/50 bg-white/60 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye size={24} className="text-pink-600" />
            <h2 className="text-2xl font-light text-gray-900">Privacy</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/50 rounded-lg border border-pink-100/50">
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700 font-light">Profile Visibility</label>
                <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all font-light">
                  <option>Public</option>
                  <option>Private</option>
                  <option>Friends Only</option>
                </select>
              </div>
              <p className="text-sm text-gray-600 font-light">Control who can see your profile and event history</p>
            </div>

            <div className="p-4 bg-white/50 rounded-lg border border-pink-100/50">
              <div className="flex items-center justify-between">
                <label className="text-gray-700 font-light">Allow vendors to contact me</label>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-pink-500 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-8 border-pink-100/50 bg-white/60 backdrop-blur-sm mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={24} className="text-pink-600" />
            <h2 className="text-2xl font-light text-gray-900">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/50 rounded-lg border border-pink-100/50 flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-light mb-1">Password</p>
                <p className="text-sm text-gray-600 font-light">Last changed 3 months ago</p>
              </div>
              <Button
                onClick={handleChangePassword}
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-light"
              >
                Change Password
              </Button>
            </div>

            <div className="p-4 bg-white/50 rounded-lg border border-pink-100/50 flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-light mb-1">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 font-light">Add an extra layer of security</p>
              </div>
              <Button
                variant="outline"
                className="border-pink-200 text-pink-600 hover:bg-pink-50 rounded-lg font-light bg-transparent"
              >
                Enable
              </Button>
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-8 border-red-200 bg-red-50/30 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 size={24} className="text-red-600" />
            <h2 className="text-2xl font-light text-gray-900">Danger Zone</h2>
          </div>

          <div className="p-4 bg-white/50 rounded-lg border border-red-200 flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-light mb-1">Delete Account</p>
              <p className="text-sm text-gray-600 font-light">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-light"
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </main>
    </div>
  )
}
