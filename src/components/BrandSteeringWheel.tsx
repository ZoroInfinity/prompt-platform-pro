import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Compass, Target, Eye, Lightbulb, Users, MessageSquare, Edit2, Save, X } from "lucide-react"

interface WheelSegment {
  id: string
  label: string
  content: string
  icon: any
  color: string
}

export function BrandSteeringWheel() {
  const [editingSegment, setEditingSegment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")

  const [segments, setSegments] = useState<WheelSegment[]>([
    {
      id: "mission",
      label: "Mission",
      content: "What is your company's fundamental purpose and reason for existence?",
      icon: Target,
      color: "bg-blue-100 border-blue-300"
    },
    {
      id: "vision", 
      label: "Vision",
      content: "What does your company aspire to become or achieve in the future?",
      icon: Eye,
      color: "bg-purple-100 border-purple-300"
    },
    {
      id: "values",
      label: "Core Values", 
      content: "What are the fundamental beliefs and principles that guide your company?",
      icon: Lightbulb,
      color: "bg-green-100 border-green-300"
    },
    {
      id: "audience",
      label: "Target Audience",
      content: "Who is your primary target audience and what are their key characteristics?", 
      icon: Users,
      color: "bg-orange-100 border-orange-300"
    },
    {
      id: "messaging",
      label: "Core Messaging",
      content: "What are your key brand messages and communication pillars?",
      icon: MessageSquare,
      color: "bg-pink-100 border-pink-300"
    },
    {
      id: "differentiators",
      label: "Key Differentiators",
      content: "What sets your company apart from competitors? What unique value do you provide?",
      icon: Compass,
      color: "bg-yellow-100 border-yellow-300"
    }
  ])

  const handleEdit = (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId)
    if (segment) {
      setEditingSegment(segmentId)
      setEditContent(segment.content)
    }
  }

  const handleSave = () => {
    if (editingSegment) {
      setSegments(segments.map(s => 
        s.id === editingSegment ? { ...s, content: editContent } : s
      ))
      setEditingSegment(null)
      setEditContent("")
    }
  }

  const handleCancel = () => {
    setEditingSegment(null)
    setEditContent("")
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Brand Steering Wheel</h1>
        <p className="text-muted-foreground">Define your core brand pillars and strategic direction</p>
      </div>

      {/* Circular Wheel Layout */}
      <div className="flex justify-center mb-8">
        <div className="relative w-96 h-96">
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full border-4 border-primary shadow-lg flex items-center justify-center">
            <Compass className="h-8 w-8 text-primary" />
          </div>

          {/* Wheel Segments */}
          {segments.map((segment, index) => {
            const angle = (index * 60) - 90 // 6 segments, 60 degrees each, starting from top
            const radian = (angle * Math.PI) / 180
            const radius = 140
            const x = Math.cos(radian) * radius
            const y = Math.sin(radian) * radius
            const Icon = segment.icon

            return (
              <div
                key={segment.id}
                className={`absolute w-20 h-20 rounded-full border-2 ${segment.color} shadow-md cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center`}
                style={{
                  left: `calc(50% + ${x}px - 40px)`,
                  top: `calc(50% + ${y}px - 40px)`
                }}
                onClick={() => handleEdit(segment.id)}
              >
                <Icon className="h-4 w-4 text-gray-700 mb-1" />
                <span className="text-xs text-gray-700 font-medium text-center leading-tight">{segment.label.split(' ')[0]}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {segments.map((segment) => {
          const Icon = segment.icon
          const isEditing = editingSegment === segment.id

          return (
            <Card key={segment.id} className={`glass-card border-2 ${segment.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {segment.label}
                  </div>
                  {!isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(segment.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="min-h-[100px]"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {segment.content}
                  </p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Do's and Don'ts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card border-2 border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Brand Tone: Do's</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Use professional and approachable language</li>
              <li>• Be authentic and transparent</li>
              <li>• Focus on customer benefits</li>
              <li>• Maintain consistent voice across platforms</li>
              <li>• Show expertise and thought leadership</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-card border-2 border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Brand Tone: Don'ts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Avoid overly technical jargon</li>
              <li>• Don't make unrealistic promises</li>
              <li>• Avoid negative or controversial topics</li>
              <li>• Don't copy competitor messaging</li>
              <li>• Avoid inconsistent brand personality</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
