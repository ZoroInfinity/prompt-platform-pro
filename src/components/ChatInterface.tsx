
import { useState, useRef } from "react"
import { Send, MessageSquarePlus, FileText, Palette, Wand2, Sparkles, Calendar, ChevronLeft, ChevronRight, Edit2, Upload, Layers, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FeatureTray } from "@/components/FeatureTray"
import { PostPreviewModal } from "@/components/PostPreviewModal"
import { ImageEditTray } from "@/components/ImageEditTray"

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
  const [currentImageUrl, setCurrentImageUrl] = useState("")
  
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
  
  // Carousel state for content variations
  const [currentContentIndex, setCurrentContentIndex] = useState(0)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showImageEditTray, setShowImageEditTray] = useState(false)
  
  // Mock multiple content variations (limited to 2 per platform)
  const contentVariations = [
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
  ]

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
      setGeneratedContent(contentVariations[0])
      setCurrentContentIndex(0)
      setCurrentImageUrl("https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop")
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

  const handleEditImage = () => {
    setShowImageEditTray(true)
  }

  const handleImageSelect = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl)
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
        setCurrentImageUrl(url)
      }
    }
    input.click()
  }

  const handleApplyLogo = () => {
    console.log("Apply logo clicked")
  }

  const handleRemoveImage = () => {
    setCurrentImageUrl("")
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

  const nextContent = () => {
    const nextIndex = (currentContentIndex + 1) % 2 // Limited to 2 slides
    setCurrentContentIndex(nextIndex)
    setGeneratedContent(contentVariations[nextIndex])
  }

  const prevContent = () => {
    const prevIndex = (currentContentIndex - 1 + 2) % 2 // Limited to 2 slides
    setCurrentContentIndex(prevIndex)
    setGeneratedContent(contentVariations[prevIndex])
  }

  const isLandingState = !generatedContent && !isGenerating

  return (
    <div className="w-full h-full">
      {/* Chat Section */}
      <div className={`w-full transition-all duration-300 ${
        isLandingState 
          ? "flex items-center justify-center min-h-screen px-4" 
          : "flex justify-center py-6 px-4"
      }`}>
        <div className={`transition-all duration-300 ${
          isLandingState ? "max-w-2xl w-full" : "max-w-2xl w-full"
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
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="What would you like to create today?"
                  className={`resize-none transition-all duration-300 border-0 focus:ring-2 focus:ring-primary/20 ${
                    isLandingState ? "min-h-[80px]" : "min-h-[40px]"
                  }`}
                  rows={isLandingState ? 3 : 1}
                />
                
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
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content Card with Platform Tabs */}
                <div className="space-y-4">
                  <Card className="glass-card shadow-lg h-[600px] flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <Tabs defaultValue="instagram" className="space-y-4 flex-1 flex flex-col">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                          <TabsTrigger value="instagram" className="data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors">
                            <div className="flex items-center gap-2">
                              <Instagram className="w-4 h-4 text-pink-500" />
                              <span className="text-sm">Instagram</span>
                            </div>
                          </TabsTrigger>
                          <TabsTrigger value="linkedin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors">
                            <div className="flex items-center gap-2">
                              <Linkedin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm">LinkedIn</span>
                            </div>
                          </TabsTrigger>
                          <TabsTrigger value="twitter" className="data-[state=active]:bg-white data-[state=active]:shadow-sm hover:bg-white/50 transition-colors">
                            <div className="flex items-center gap-2">
                              <Twitter className="w-4 h-4 text-blue-400" />
                              <span className="text-sm">Twitter</span>
                            </div>
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="instagram" className="space-y-4 flex-1 flex flex-col">
                          <div className="relative flex-1 flex items-center">
                            {editingContent.isEditing && editingContent.platform === "instagram" ? (
                              <div className="flex flex-col h-full w-full">
                                <Textarea
                                  value={editableContent}
                                  onChange={(e) => setEditableContent(e.target.value)}
                                  className="flex-1 resize-none border border-gray-200 rounded-lg p-4"
                                />
                                <div className="flex gap-2 mt-3">
                                  <Button size="sm" onClick={handleSaveEdit} className="bg-primary hover:bg-primary/90">
                                    Save
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="bg-white/70 rounded-lg p-6 border border-gray-100 h-full overflow-y-auto flex items-center w-full">
                                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                    {generatedContent}
                                  </p>
                                </div>
                                
                                {/* Carousel Navigation */}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-md rounded-full hover:scale-105 transition-all duration-200"
                                  onClick={prevContent}
                                >
                                  <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-md rounded-full hover:scale-105 transition-all duration-200"
                                  onClick={nextContent}
                                >
                                  <ChevronRight className="h-5 w-5" />
                                </Button>
                                
                                <div className="absolute bottom-4 right-4">
                                  <Badge variant="secondary" className="text-xs bg-white/90">
                                    {currentContentIndex + 1} of 2
                                  </Badge>
                                </div>
                              </>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="linkedin" className="space-y-4 flex-1 flex flex-col">
                          <div className="relative flex-1 flex items-center">
                            <div className="bg-white/70 rounded-lg p-6 border border-gray-100 h-full overflow-y-auto flex items-center w-full">
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                {generatedContent.replace(/🚀|✨|📈|🎯|💡|🔥/g, '•')}
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="twitter" className="space-y-4 flex-1 flex flex-col">
                          <div className="relative flex-1 flex items-center">
                            <div className="bg-white/70 rounded-lg p-6 border border-gray-100 h-full overflow-y-auto flex items-center w-full">
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                {generatedContent.substring(0, 280)}...
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    
                    <CardFooter className="flex gap-2 pt-0 px-6 pb-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                        onClick={() => handleEditText("instagram")}
                      >
                        <Edit2 className="mr-1 h-3 w-3" />
                        Edit Text
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                      >
                        <Calendar className="mr-1 h-3 w-3" />
                        Schedule
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-md hover:scale-105 transition-all duration-200"
                        onClick={handlePostNow}
                      >
                        <Send className="mr-1 h-3 w-3" />
                        Post Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Image Card */}
                <div className="space-y-4">
                  <Card className="glass-card shadow-lg h-[600px] flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border border-gray-100 flex-1 max-h-[400px] overflow-hidden">
                        {currentImageUrl ? (
                          <img 
                            src={currentImageUrl} 
                            alt="Generated content" 
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-center text-muted-foreground">
                            <Palette className="h-12 w-12 mx-auto mb-2 opacity-40" />
                            <p className="text-sm font-medium">Generated Image</p>
                            <p className="text-xs text-gray-400">AI-created visual content</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col gap-3 pt-0 px-6 pb-6">
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                          onClick={handleEditImage}
                        >
                          <Edit2 className="mr-1 h-3 w-3" />
                          Edit Image
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                          onClick={handleUploadImage}
                        >
                          <Upload className="mr-1 h-3 w-3" />
                          Upload Image
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                          onClick={handleApplyLogo}
                        >
                          <Layers className="mr-1 h-3 w-3" />
                          Apply Logo
                        </Button>
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="w-full hover:scale-105 transition-all duration-200"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
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
