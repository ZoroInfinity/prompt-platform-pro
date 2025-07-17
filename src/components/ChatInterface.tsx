import { useState, useRef } from "react"
import { Send, MessageSquarePlus, FileText, Palette, Wand2, Sparkles, Calendar, ChevronLeft, ChevronRight, Edit2, Upload, Layers, Instagram, Linkedin, Twitter, Trash2, Check, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FeatureTray } from "@/components/FeatureTray"
import { PostPreviewModal } from "@/components/PostPreviewModal"
import { ImageEditTray } from "@/components/ImageEditTray"
import { BusinessContentCard } from "@/components/BusinessContentCard"

interface ChatInterfaceProps {
  onModeActivation?: (mode: string) => void
  activeMode?: string
}

export function ChatInterface({ onModeActivation, activeMode }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [selectedFeature, setSelectedFeature] = useState("quick-post")
  const [editingContent, setEditingContent] = useState({ platform: "", isEditing: false })
  const [editableContent, setEditableContent] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  
  // Multiple images for carousel
  const [currentImages, setCurrentImages] = useState([
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
  ])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  
  // Feature tray state with improved hover behavior
  const [featureTrayOpen, setFeatureTrayOpen] = useState(false)
  const [featureTrayPosition, setFeatureTrayPosition] = useState({ x: 0, y: 0 })
  const [featureTrayMode, setFeatureTrayMode] = useState("")
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [featureConfig, setFeatureConfig] = useState({
    platforms: ["instagram", "linkedin"],
    autoImage: true,
    businessType: "email",
    showCitations: false,
    contentFormat: "blog-intro"
  })
  
  // Carousel state for content variations - separate for each platform
  const [currentContentIndex, setCurrentContentIndex] = useState({
    instagram: 0,
    linkedin: 0,
    twitter: 0
  })
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showImageEditTray, setShowImageEditTray] = useState(false)
  
  // Mock multiple content variations (limited to 2 per platform)
  const contentVariations = {
    instagram: [
      `🚀 Ready to transform your business? Here's how automation can revolutionize your workflow:

✨ Save 20+ hours per week
📈 Increase productivity by 300%
🎯 Focus on what truly matters
💡 Let AI handle the repetitive tasks

Join thousands of entrepreneurs who've already made the switch! 

#Automation #BusinessGrowth #Productivity #AI #Entrepreneur`,
      `💼 Transform your business operations today!

Automation isn't just a buzzword—it's your competitive advantage:

🔥 Eliminate manual processes
🔥 Boost team productivity
🔥 Focus on growth, not grunt work
🔥 See results in just 30 days

Don't get left behind. Start automating now! 

#BusinessAutomation #Productivity #Growth #Innovation`
    ],
    linkedin: [
      `Ready to transform your business? Here's how automation can revolutionize your workflow:

• Save 20+ hours per week
• Increase productivity by 300%
• Focus on what truly matters
• Let AI handle the repetitive tasks

Join thousands of entrepreneurs who've already made the switch! 

#Automation #BusinessGrowth #Productivity #AI #Entrepreneur`,
      `Transform your business operations today!

Automation isn't just a buzzword—it's your competitive advantage:

• Eliminate manual processes
• Boost team productivity
• Focus on growth, not grunt work
• See results in just 30 days

Don't get left behind. Start automating now! 

#BusinessAutomation #Productivity #Growth #Innovation`
    ],
    twitter: [
      `🚀 Ready to transform your business? Automation can save you 20+ hours per week and increase productivity by 300%. Join thousands who've made the switch! #Automation #BusinessGrowth`,
      `💼 Transform your business today! Automation = your competitive advantage. Eliminate manual processes, boost productivity, see results in 30 days. #BusinessAutomation`
    ]
  }

  const businessContentSample = `**MEMORANDUM**

TO: All Department Heads
FROM: Executive Management
DATE: ${new Date().toLocaleDateString()}
RE: Implementation of New Digital Workflow System

**PURPOSE**
This memorandum outlines the strategic implementation of our new digital workflow management system, designed to enhance operational efficiency and streamline interdepartmental communication processes.

**BACKGROUND**
Following extensive market research and internal analysis, our organization has identified significant opportunities to optimize current workflow procedures through digital transformation initiatives [1]. The proposed system addresses key operational challenges while maintaining compliance with industry standards [2].

**IMPLEMENTATION STRATEGY**
The rollout will occur in three phases:

1. **Phase One (Weeks 1-2)**: Department heads receive comprehensive training on system functionality and best practices
2. **Phase Two (Weeks 3-4)**: Pilot implementation with select teams to identify potential optimization areas
3. **Phase Three (Weeks 5-6)**: Full organizational deployment with ongoing support and monitoring

**EXPECTED OUTCOMES**
- Reduction in processing time by approximately 40%
- Enhanced data accuracy and reporting capabilities
- Improved cross-departmental collaboration and communication
- Streamlined approval processes and documentation management

**NEXT STEPS**
Department heads are requested to:
- Attend mandatory training sessions scheduled for next week
- Identify team members for pilot program participation
- Provide feedback during the implementation process
- Support their teams through the transition period

Please direct any questions or concerns to the Executive Management team. We appreciate your cooperation in ensuring a smooth transition to this enhanced operational framework [3].

**REFERENCES**
[1] McKinsey Digital Transformation Report 2024
[2] Industry Compliance Standards Documentation
[3] Internal Process Optimization Study`

  const featureIcons = [
    { 
      icon: MessageSquarePlus, 
      label: "Quick Post", 
      mode: "quick-post",
      description: "Create engaging social media posts"
    },
    { 
      icon: FileText, 
      label: "Business Writing", 
      mode: "business-writing",
      description: "Professional documents and emails"
    },
    { 
      icon: Palette, 
      label: "Content Creation", 
      mode: "content-creation",
      description: "Blog posts and articles"
    },
  ]

  const platformIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    setIsGenerating(true)
    
    setTimeout(() => {
      if (selectedFeature === "business-writing") {
        setGeneratedContent(businessContentSample)
      } else {
        setGeneratedContent(contentVariations.instagram[0])
        setCurrentImages([
          "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
        ])
      }
      setCurrentContentIndex({
        instagram: 0,
        linkedin: 0,
        twitter: 0
      })
      setCurrentImageIndex(0)
      setSelectedImageIndex(0)
      setIsGenerating(false)
    }, 2000)
  }

  const handleFeatureHover = (feature: any, event: React.MouseEvent) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }

    setSelectedFeature(feature.mode)
    
    if (feature.mode === "quick-post" || feature.mode === "business-writing") {
      const rect = event.currentTarget.getBoundingClientRect()
      setFeatureTrayPosition({
        x: rect.left,
        y: rect.bottom + 8
      })
      setFeatureTrayMode(feature.mode)
      setFeatureTrayOpen(true)
    }
  }

  const handleFeatureLeave = () => {
    const timeout = setTimeout(() => {
      setFeatureTrayOpen(false)
    }, 300) // Delay to allow moving to dropdown
    setHoverTimeout(timeout)
  }

  const handleTrayHover = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }

  const handleTrayLeave = () => {
    setFeatureTrayOpen(false)
  }

  // Image carousel functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }

  const handleSelectImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleEditImage = () => {
    setShowImageEditTray(true)
  }

  const handleImageSelect = (imageUrl: string) => {
    const newImages = [...currentImages]
    newImages[currentImageIndex] = imageUrl
    setCurrentImages(newImages)
    setShowImageEditTray(false)
  }

  const handleUploadImage = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        const newImages = [...currentImages]
        newImages[currentImageIndex] = url
        setCurrentImages(newImages)
      }
    }
    input.click()
  }

  const handleChatImageUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const url = URL.createObjectURL(file)
        setUploadedImage(url)
      }
    }
    input.click()
  }

  const handleApplyLogo = () => {
    console.log("Apply logo clicked")
  }

  const handleRemoveImage = () => {
    const newImages = [...currentImages]
    newImages[currentImageIndex] = ""
    setCurrentImages(newImages)
  }

  const handlePostNow = () => {
    setShowPreviewModal(true)
  }

  const handleEditText = (platform: string) => {
    setEditingContent({ platform, isEditing: true })
    setEditableContent(generatedContent)
  }

  const handleSaveEdit = () => {
    setGeneratedContent(editableContent)
    setEditingContent({ platform: "", isEditing: false })
  }

  const handleCancelEdit = () => {
    setEditingContent({ platform: "", isEditing: false })
  }

  const handleSchedule = () => {
    console.log("Schedule post clicked")
    // Add basic scheduling functionality
  }

  const nextContent = (platform: string) => {
    const nextIndex = (currentContentIndex[platform as keyof typeof currentContentIndex] + 1) % 2
    setCurrentContentIndex(prev => ({
      ...prev,
      [platform]: nextIndex
    }))
  }

  const prevContent = (platform: string) => {
    const prevIndex = (currentContentIndex[platform as keyof typeof currentContentIndex] - 1 + 2) % 2
    setCurrentContentIndex(prev => ({
      ...prev,
      [platform]: prevIndex
    }))
  }

  const getCurrentContent = (platform: string) => {
    const variations = contentVariations[platform as keyof typeof contentVariations]
    const index = currentContentIndex[platform as keyof typeof currentContentIndex]
    return variations[index]
  }

  const isLandingState = !generatedContent && !isGenerating

  return (
    <div className="w-full h-full">
      {/* Chat Section - Full width input */}
      <div className={`w-full transition-all duration-300 ${
        isLandingState 
          ? "flex items-center justify-center min-h-screen px-4" 
          : "flex justify-center py-6 px-6"
      }`}>
        <div className={`transition-all duration-300 ${
          isLandingState ? "max-w-2xl w-full" : "max-w-7xl w-full"
        }`}>
          {isLandingState && (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Let's create something amazing!
              </h1>
            </div>
          )}

          <Card className="glass-card shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={selectedFeature === "business-writing" 
                      ? "Describe the business document you need..." 
                      : "What would you like to create today?"}
                    className={`resize-none transition-all duration-300 border-0 focus:ring-2 focus:ring-primary/20 pr-12 ${
                      isLandingState ? "min-h-[80px]" : "min-h-[40px]"
                    }`}
                    rows={isLandingState ? 3 : 1}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-primary/10"
                    onClick={handleChatImageUpload}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>

                {/* Image Preview */}
                {uploadedImage && (
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">Image attached</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-auto"
                      onClick={() => setUploadedImage(null)}
                    >
                      ×
                    </Button>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {featureIcons.map((feature, index) => {
                      const IconComponent = feature.icon
                      const isSelected = selectedFeature === feature.mode
                      return (
                        <div
                          key={index}
                          onMouseEnter={(e) => handleFeatureHover(feature, e)}
                          onMouseLeave={handleFeatureLeave}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            type="button"
                            className={`h-8 w-8 p-0 transition-all duration-200 hover:scale-105 ${
                              isSelected 
                                ? 'bg-primary/10 text-primary shadow-sm ring-2 ring-primary/20' 
                                : 'hover:bg-primary/5 hover:text-primary'
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="w-32 h-8 text-xs border-0 bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="glass-card">
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      type="submit" 
                      size="sm"
                      disabled={!input.trim() || isGenerating}
                      className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 shadow-md hover:scale-105 transition-all duration-200"
                    >
                      <Wand2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generated Content Section */}
      {(generatedContent || isGenerating) && (
        <div className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Generating content...</p>
                </div>
              </div>
            ) : selectedFeature === "business-writing" ? (
              // Business Writing Content
              <BusinessContentCard
                content={generatedContent}
                documentType={featureConfig.businessType}
                versionLabel="Version 1"
                onContentChange={setGeneratedContent}
                showCitations={featureConfig.showCitations}
              />
            ) : (
              // Quick Post Content - Fixed Layout with Swipe Button Updates
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Content Container with Navigation */}
                <div className="relative">
                  {/* External Navigation Arrows for Content - Updated sizing */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/95 hover:bg-white shadow-lg rounded-full hover:scale-110 transition-all duration-200 z-20 border border-gray-100"
                    onClick={() => {
                      const currentTab = document.querySelector('[data-state="active"]')?.getAttribute('value') || 'instagram'
                      prevContent(currentTab)
                    }}
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/95 hover:bg-white shadow-lg rounded-full hover:scale-110 transition-all duration-200 z-20 border border-gray-100"
                    onClick={() => {
                      const currentTab = document.querySelector('[data-state="active"]')?.getAttribute('value') || 'instagram'
                      nextContent(currentTab)
                    }}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                  </Button>

                  <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100/50 rounded-2xl h-[600px] flex flex-col">
                    {/* Header */}
                    <div className="p-6 pb-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-800 mb-0">Platform Content</h3>
                    </div>

                    <CardContent className="p-6 pt-4 flex-1 flex flex-col">
                      <Tabs defaultValue="instagram" className="space-y-4 flex-1 flex flex-col">
                        <TabsList className="grid w-full grid-cols-3 bg-gray-50/80 rounded-xl p-1">
                          <TabsTrigger value="instagram" className="data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors rounded-lg">
                            <div className="flex items-center gap-2">
                              <Instagram className="w-4 h-4 text-pink-500" />
                              <span className="text-sm font-medium">Instagram</span>
                            </div>
                          </TabsTrigger>
                          <TabsTrigger value="linkedin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors rounded-lg">
                            <div className="flex items-center gap-2">
                              <Linkedin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium">LinkedIn</span>
                            </div>
                          </TabsTrigger>
                          <TabsTrigger value="twitter" className="data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors rounded-lg">
                            <div className="flex items-center gap-2">
                              <Twitter className="w-4 h-4 text-blue-400" />
                              <span className="text-sm font-medium">Twitter</span>
                            </div>
                          </TabsTrigger>
                        </TabsList>
                        
                        {/* Platform Content Tabs */}
                        {["instagram", "linkedin", "twitter"].map((platform) => (
                          <TabsContent key={platform} value={platform} className="flex-1 flex flex-col mt-4">
                            {/* Version Label */}
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700 border border-blue-200">
                                Version {currentContentIndex[platform as keyof typeof currentContentIndex] + 1}
                                {currentContentIndex[platform as keyof typeof currentContentIndex] === 0 && " (Recommended)"}
                              </Badge>
                            </div>
                            
                            {/* Content Display Area - Fixed Height */}
                            <div className="flex-1 min-h-[280px] max-h-[280px]">
                              {editingContent.isEditing && editingContent.platform === platform ? (
                                <div className="flex flex-col h-full">
                                  <Textarea
                                    value={editableContent}
                                    onChange={(e) => setEditableContent(e.target.value)}
                                    className="flex-1 resize-none border border-gray-200 rounded-xl p-4 text-sm leading-relaxed h-[240px] bg-white"
                                  />
                                  <div className="flex gap-2 mt-3">
                                    <Button size="sm" onClick={handleSaveEdit} className="bg-primary hover:bg-primary/90">
                                      <Check className="mr-1 h-3 w-3" />
                                      Save
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100 h-full overflow-y-auto">
                                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap text-left">
                                    {getCurrentContent(platform)}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Action Buttons - Now Inside Content Container */}
                            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200 rounded-lg"
                                onClick={() => handleEditText(platform)}
                              >
                                <Edit2 className="mr-1 h-3 w-3" />
                                Edit Text
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200 rounded-lg"
                                onClick={handleSchedule}
                              >
                                <Calendar className="mr-1 h-3 w-3" />
                                Schedule
                              </Button>
                              <Button 
                                size="sm"
                                className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-md hover:scale-105 transition-all duration-200 rounded-lg"
                                onClick={handlePostNow}
                              >
                                <Send className="mr-1 h-3 w-3" />
                                Post Now
                              </Button>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>

                {/* Image Container */}
                <div className="relative">
                  {/* External Navigation Arrows for Images - Updated sizing */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/95 hover:bg-white shadow-lg rounded-full hover:scale-110 transition-all duration-200 z-20 border border-gray-100"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/95 hover:bg-white shadow-lg rounded-full hover:scale-110 transition-all duration-200 z-20 border border-gray-100"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
                  </Button>

                  <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100/50 rounded-2xl h-[600px] flex flex-col">
                    {/* Header */}
                    <div className="p-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800">Recommended Image</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                        onClick={handleRemoveImage}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-6 pt-4 flex-1 flex flex-col">
                      {/* Image Display Area - Fixed Height */}
                      <div className="flex-1 min-h-[400px] max-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-100 overflow-hidden relative">
                        {currentImages[currentImageIndex] ? (
                          <div className="relative w-full h-full">
                            <img 
                              src={currentImages[currentImageIndex]} 
                              alt="Generated content" 
                              className="w-full h-full object-cover"
                            />
                            {selectedImageIndex === currentImageIndex && (
                              <div className="absolute top-3 right-3">
                                <div className="bg-primary text-white rounded-full p-1.5 shadow-lg">
                                  <Check className="h-4 w-4" />
                                </div>
                              </div>
                            )}
                            {/* Recommended Badge */}
                            {currentImageIndex === 0 && (
                              <div className="absolute top-3 left-3">
                                <Badge className="bg-blue-500 text-white text-xs border-0 shadow-lg">
                                  Recommended
                                </Badge>
                              </div>
                            )}
                            {/* Selection Button */}
                            <Button
                              size="sm"
                              className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-gray-800 shadow-lg border border-gray-200 rounded-lg"
                              onClick={() => handleSelectImage(currentImageIndex)}
                            >
                              {selectedImageIndex === currentImageIndex ? "Selected" : "Select"}
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-center text-gray-400">
                            <div>
                              <Palette className="h-12 w-12 mx-auto mb-3 opacity-40" />
                              <p className="text-sm font-medium">Generated Image</p>
                              <p className="text-xs">AI-created visual content</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Image Indicator Dots */}
                      <div className="flex justify-center gap-2 mt-4">
                        {currentImages.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                              index === currentImageIndex 
                                ? "bg-primary shadow-sm" 
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex gap-3 pt-0 px-6 pb-6 border-t border-gray-100 mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200 rounded-lg"
                        onClick={handleEditImage}
                      >
                        <Edit2 className="mr-1 h-3 w-3" />
                        Edit Image
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200 rounded-lg"
                        onClick={handleUploadImage}
                      >
                        <Upload className="mr-1 h-3 w-3" />
                        Upload Image
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200 rounded-lg"
                        onClick={handleApplyLogo}
                      >
                        <Layers className="mr-1 h-3 w-3" />
                        Apply Logo
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feature Tray with improved hover behavior */}
      <div
        onMouseEnter={handleTrayHover}
        onMouseLeave={handleTrayLeave}
      >
        <FeatureTray
          mode={featureTrayMode}
          isOpen={featureTrayOpen}
          onClose={() => setFeatureTrayOpen(false)}
          position={featureTrayPosition}
          onConfigChange={setFeatureConfig}
          currentConfig={featureConfig}
        />
      </div>

      {/* Post Preview Modal */}
      <PostPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        content={generatedContent}
        platform="instagram"
      />

      {/* Image Edit Tray */}
      <ImageEditTray
        isOpen={showImageEditTray}
        onClose={() => setShowImageEditTray(false)}
        onImageSelect={handleImageSelect}
      />
    </div>
  )
}
