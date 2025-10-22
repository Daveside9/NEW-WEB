"use client"

import type React from "react"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

const EVENT_TYPES = [
  { id: 1, name: "Wedding", icon: "💍" },
  { id: 2, name: "Corporate Event", icon: "🏢" },
  { id: 3, name: "Birthday Party", icon: "🎂" },
  { id: 4, name: "Graduation", icon: "🎓" },
  { id: 5, name: "Engagement", icon: "💎" },
  { id: 6, name: "Conference", icon: "🎤" },
]

const SERVICES = [
  { id: 1, name: "DJ", category: "Entertainment" },
  { id: 2, name: "MC", category: "Entertainment" },
  { id: 3, name: "Catering", category: "Food & Beverage" },
  { id: 4, name: "Decoration", category: "Decor" },
  { id: 5, name: "Photography", category: "Media" },
  { id: 6, name: "Videography", category: "Media" },
  { id: 7, name: "Lighting", category: "Technical" },
  { id: 8, name: "Sound System", category: "Technical" },
]

const BUDGET_RANGES = [
  { id: 1, label: "₦100,000 - ₦500,000", value: "100-500" },
  { id: 2, label: "₦500,000 - ₦1,000,000", value: "500-1000" },
  { id: 3, label: "₦1,000,000 - ₦5,000,000", value: "1000-5000" },
  { id: 4, label: "₦5,000,000+", value: "5000+" },
]

export default function EventPlanningPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    eventLocation: "",
    budget: "",
    services: [] as number[],
    guestCount: "",
    eventName: "",
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleEventTypeSelect = (typeId: string) => {
    setFormData((prev) => ({ ...prev, eventType: typeId }))
  }

  const handleServiceToggle = (serviceId: number) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }))
  }

  const handleBudgetSelect = (budgetValue: string) => {
    setFormData((prev) => ({ ...prev, budget: budgetValue }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Event Planning Data:", formData)
    // Handle form submission
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-white">
      <DashboardNav />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2">Plan Your Event</h1>
          <p className="text-gray-600 font-light">Let's create the perfect event together</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-light text-gray-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-light text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-pink-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8 border-pink-100/50 bg-white/60 backdrop-blur-sm mb-8">
          {/* Step 1: Event Type */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">What type of event are you planning?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleEventTypeSelect(type.id.toString())}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 text-center ${
                      formData.eventType === type.id.toString()
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <p className="font-light text-gray-900">{type.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Event Details */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">Tell us about your event</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Name</label>
                  <Input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleInputChange}
                    placeholder="e.g., Sarah & John's Wedding"
                    className="w-full rounded-lg border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
                  <Input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    type="text"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    placeholder="e.g., Lagos"
                    className="w-full rounded-lg border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Guest Count</label>
                  <Input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    placeholder="e.g., 200"
                    className="w-full rounded-lg border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">What's your budget?</h2>
              <div className="space-y-3">
                {BUDGET_RANGES.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => handleBudgetSelect(range.value)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                      formData.budget === range.value
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.budget === range.value ? "border-pink-500 bg-pink-500" : "border-gray-300"
                      }`}
                    >
                      {formData.budget === range.value && <Check size={16} className="text-white" />}
                    </div>
                    <span className="font-light text-gray-900">{range.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Services */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">What services do you need?</h2>
              <div className="space-y-3">
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left flex items-center gap-3 ${
                      formData.services.includes(service.id)
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.services.includes(service.id) ? "border-pink-500 bg-pink-500" : "border-gray-300"
                      }`}
                    >
                      {formData.services.includes(service.id) && <Check size={16} className="text-white" />}
                    </div>
                    <div>
                      <p className="font-light text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-500 font-light">{service.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">Review Your Event Plan</h2>
              <div className="space-y-4">
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <p className="text-sm text-gray-600 font-light mb-1">Event Name</p>
                  <p className="font-medium text-gray-900">{formData.eventName || "Not specified"}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <p className="text-sm text-gray-600 font-light mb-1">Date</p>
                    <p className="font-medium text-gray-900">{formData.eventDate || "Not specified"}</p>
                  </div>
                  <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                    <p className="text-sm text-gray-600 font-light mb-1">Location</p>
                    <p className="font-medium text-gray-900">{formData.eventLocation || "Not specified"}</p>
                  </div>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                  <p className="text-sm text-gray-600 font-light mb-2">Selected Services</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.services.length > 0 ? (
                      SERVICES.filter((s) => formData.services.includes(s.id)).map((service) => (
                        <span
                          key={service.id}
                          className="px-3 py-1 bg-pink-200 text-pink-700 rounded-full text-sm font-light"
                        >
                          {service.name}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-600 font-light">No services selected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            onClick={handlePrev}
            disabled={currentStep === 1}
            variant="outline"
            className="rounded-lg font-light border-pink-200 text-pink-600 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
          >
            Previous
          </Button>

          {currentStep === totalSteps ? (
            <Button onClick={handleSubmit} className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-light">
              Create Event Plan
            </Button>
          ) : (
            <Button onClick={handleNext} className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-light">
              Next
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
