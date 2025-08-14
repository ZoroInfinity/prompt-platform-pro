import { useState, useRef } from "react"
import { Send, MessageSquarePlus, FileText, Palette, Wand2, Sparkles, Calendar, ChevronLeft, ChevronRight, Edit2, Upload, Layers, Instagram, Linkedin, Twitter, Trash2, Check, Paperclip, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
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
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const [currentPlatform, setCurrentPlatform] = useState("instagram")
  const [showPlatformSelector, setShowPlatformSelector] = useState(false)
  
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
    setEditableContent(getCurrentContent(platform))
  }

  const handleSaveEdit = () => {
    // Update content for current platform
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
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground flex-1">Image attached</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setUploadedImage(null)}
                    >
                      ×
                    </Button>
                  </div>
                )}
                
                {/* Platform Selection for Quick Post */}
                {selectedFeature === "quick-post" && (
                  <Collapsible open={showPlatformSelector} onOpenChange={setShowPlatformSelector}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between border-0 bg-muted/30 h-12 mb-4"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Select Platforms</span>
                          {selectedPlatforms.length > 0 && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {selectedPlatforms.length} selected
                            </span>
                          )}
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mb-4">
                      <div className="grid grid-cols-1 gap-2 p-4 bg-muted/20 rounded-lg">
                        {["instagram", "linkedin", "twitter"].map((platformId) => (
                          <label 
                            key={platformId} 
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPlatforms.includes(platformId)}
                              onChange={() => {
                                if (selectedPlatforms.includes(platformId)) {
                                  setSelectedPlatforms(prev => prev.filter(p => p !== platformId))
                                } else {
                                  setSelectedPlatforms(prev => [...prev, platformId])
                                }
                              }}
                              className="w-4 h-4 text-primary bg-background border-2 border-muted-foreground/30 rounded focus:ring-primary focus:ring-2"
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {platformId === "instagram" && "📷"}
                                {platformId === "linkedin" && "💼"}
                                {platformId === "twitter" && "🐦"}
                              </span>
                              <span className="text-sm font-medium">
                                {platformId === "instagram" && "Instagram"}
                                {platformId === "linkedin" && "LinkedIn"}
                                {platformId === "twitter" && "Twitter"}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
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
                      disabled={!input.trim() || isGenerating || (selectedFeature === "quick-post" && selectedPlatforms.length === 0)}
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
              // Quick Post Content - Unified Output Box with Tabs
              <div className="flex justify-center">
                <div className={`w-full ${isLandingState ? "max-w-2xl" : "max-w-7xl"}`}>
                  <Tabs value={currentPlatform} onValueChange={setCurrentPlatform} className="w-full">
                    {/* Platform Tabs */}
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/30">
                      {selectedPlatforms.map((platformId) => (
                        <TabsTrigger 
                          key={platformId} 
                          value={platformId}
                          className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
                        >
                          <span className="text-sm">
                            {platformId === "instagram" && "📷"}
                            {platformId === "linkedin" && "💼"}
                            {platformId === "twitter" && "🐦"}
                          </span>
                          <span className="hidden sm:inline text-xs">
                            {platformId === "instagram" && "Instagram"}
                            {platformId === "linkedin" && "LinkedIn"}
                            {platformId === "twitter" && "Twitter"}
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {/* Tab Content */}
                    {selectedPlatforms.map((platformId) => (
                      <TabsContent key={platformId} value={platformId} className="mt-0">
                        <Card className="glass-card shadow-lg">
                          <CardContent className="p-8 space-y-6">
                            {/* Content Display Area */}
                            <div className="space-y-4">
                              <Textarea
                                value={getCurrentContent(platformId)}
                                readOnly
                                className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[250px] text-base leading-relaxed resize-none p-8"
                              />
                            </div>

                            {uploadedImage && (
                              <div className="relative">
                                <img 
                                  src={uploadedImage} 
                                  alt="Content image" 
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                              <Button size="default" variant="outline" className="flex-1 glass border-0 h-12">
                                <Edit2 className="h-4 w-4 mr-2" />
                                Edit Text
                              </Button>
                              <Button size="default" className="flex-1 bg-primary hover:bg-primary/90 h-12">
                                <Send className="h-4 w-4 mr-2" />
                                Post Now
                              </Button>
                              <Button size="default" variant="outline" className="flex-1 glass border-0 h-12">
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    ))}
                  </Tabs>
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
