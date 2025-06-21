
import { useState, useRef } from "react"
import { Send, MessageSquarePlus, FileText, Palette, Wand2, Sparkles, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentCard } from "@/components/ContentCard"
import { Badge } from "@/components/ui/badge"
import { FeatureTray } from "@/components/FeatureTray"
import { PostPreviewModal } from "@/components/PostPreviewModal"

interface ChatInterfaceProps {
  onModeActivation?: (mode: string) => void
  activeMode?: string
}

export function ChatInterface({ onModeActivation, activeMode }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [showImage, setShowImage] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState("quick-post")
  
  // Feature tray state
  const [featureTrayOpen, setFeatureTrayOpen] = useState(false)
  const [featureTrayPosition, setFeatureTrayPosition] = useState({ x: 0, y: 0 })
  const [featureTrayMode, setFeatureTrayMode] = useState("")
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
  
  // Mock multiple content variations
  const contentVariations = [
    `🚀 Ready to transform your business? Here's how automation can revolutionize your workflow:

✨ Save 20+ hours per week
📈 Increase productivity by 300%
🎯 Focus on what truly matters
💡 Let AI handle the repetitive tasks

Join thousands of entrepreneurs who've already made the switch! 

#Automation #BusinessGrowth #Productivity #AI #Entrepreneur`,
    `🎯 Struggling with repetitive tasks? Let's talk automation!

Here's what you can achieve:
• Streamline your daily operations
• Free up time for strategic thinking
• Scale your business efficiently
• Reduce human error by 95%

Ready to take the leap? 💪

#WorkSmarter #Automation #Business #Efficiency`,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    setIsGenerating(true)
    
    setTimeout(() => {
      setGeneratedContent(contentVariations[0])
      setCurrentContentIndex(0)
      setIsGenerating(false)
    }, 2000)
  }

  const handleFeatureClick = (feature: any, event: React.MouseEvent) => {
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

  const handleRemoveImage = () => {
    setShowImage(false)
  }

  const handleEditImage = () => {
    console.log("Edit image clicked")
  }

  const handleUploadImage = () => {
    console.log("Upload image clicked")
  }

  const handleApplyLogo = () => {
    console.log("Apply logo clicked")
  }

  const handlePostNow = () => {
    setShowPreviewModal(true)
  }

  const nextContent = () => {
    setCurrentContentIndex((prev) => (prev + 1) % contentVariations.length)
    setGeneratedContent(contentVariations[(currentContentIndex + 1) % contentVariations.length])
  }

  const prevContent = () => {
    setCurrentContentIndex((prev) => (prev - 1 + contentVariations.length) % contentVariations.length)
    setGeneratedContent(contentVariations[(currentContentIndex - 1 + contentVariations.length) % contentVariations.length])
  }

  const isLandingState = !generatedContent && !isGenerating

  return (
    <div className="w-full h-full">
      {/* Chat Section */}
      <div className={`w-full transition-all duration-300 ${
        isLandingState 
          ? "flex items-center justify-center min-h-screen px-4" 
          : "sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b py-4 px-6"
      }`}>
        <div className={`w-full transition-all duration-300 ${
          isLandingState ? "max-w-2xl" : "max-w-4xl"
        }`}>
          {isLandingState && (
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
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
                    isLandingState ? "min-h-[80px]" : "min-h-[50px]"
                  }`}
                  rows={isLandingState ? 3 : 2}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {featureIcons.map((feature, index) => {
                      const IconComponent = feature.icon
                      const isSelected = selectedFeature === feature.mode
                      return (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          type="button"
                          className={`h-8 w-8 p-0 transition-all duration-200 ${
                            isSelected 
                              ? 'bg-primary/10 text-primary shadow-sm' 
                              : 'hover:bg-primary/5 hover:text-primary'
                          }`}
                          onClick={(e) => handleFeatureClick(feature, e)}
                        >
                          <IconComponent className="h-4 w-4" />
                        </Button>
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
                      className="h-8 w-8 p-0 bg-primary hover:bg-primary/90 shadow-md"
                    >
                      <Send className="h-4 w-4" />
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
        <div className="px-6 py-6">
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
                  <Card className="glass-card shadow-lg">
                    <CardContent className="p-6">
                      <Tabs defaultValue="instagram" className="space-y-4">
                        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                          <TabsTrigger value="instagram" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-500 to-pink-500"></div>
                              Instagram
                            </div>
                          </TabsTrigger>
                          <TabsTrigger value="linkedin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded bg-blue-600"></div>
                              LinkedIn
                            </div>
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="instagram" className="space-y-4">
                          <div className="relative">
                            <div className="bg-white/70 rounded-lg p-4 border border-gray-100 min-h-[200px]">
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                                {generatedContent}
                              </p>
                            </div>
                            
                            {/* Carousel Navigation */}
                            <div className="absolute top-2 right-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 bg-white/80 hover:bg-white shadow-sm"
                                onClick={prevContent}
                              >
                                <ChevronLeft className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 bg-white/80 hover:bg-white shadow-sm"
                                onClick={nextContent}
                              >
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            <div className="absolute bottom-2 right-2">
                              <Badge variant="secondary" className="text-xs">
                                {currentContentIndex + 1} of {contentVariations.length}
                              </Badge>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="linkedin" className="space-y-4">
                          <div className="bg-white/70 rounded-lg p-4 border border-gray-100 min-h-[200px]">
                            <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                              {generatedContent.replace(/🚀|✨|📈|🎯|💡/g, '•')}
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    
                    <CardFooter className="flex gap-2 pt-0 px-6 pb-6">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 border-gray-200 hover:bg-gray-50"
                      >
                        Edit Text
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 border-gray-200 hover:bg-gray-50"
                      >
                        <Calendar className="mr-1 h-3 w-3" />
                        Schedule
                      </Button>
                      <Button 
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-md"
                        onClick={handlePostNow}
                      >
                        <Send className="mr-1 h-3 w-3" />
                        Post Now
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                {/* Image Card */}
                {showImage && (
                  <div className="space-y-4">
                    <Card className="glass-card shadow-lg">
                      <CardContent className="p-6">
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center mb-4 border border-gray-100">
                          <div className="text-center text-muted-foreground">
                            <Palette className="h-12 w-12 mx-auto mb-2 opacity-40" />
                            <p className="text-sm font-medium">Generated Image</p>
                            <p className="text-xs text-gray-400">AI-created visual content</p>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex flex-col gap-3 pt-0 px-6 pb-6">
                        <div className="flex gap-2 w-full">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-gray-200 hover:bg-gray-50"
                            onClick={handleEditImage}
                          >
                            Edit Image
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-gray-200 hover:bg-gray-50"
                            onClick={handleUploadImage}
                          >
                            Upload Image
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-gray-200 hover:bg-gray-50"
                            onClick={handleApplyLogo}
                          >
                            Apply Logo
                          </Button>
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="w-full"
                          onClick={handleRemoveImage}
                        >
                          Remove Image
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feature Tray */}
      <FeatureTray
        mode={featureTrayMode}
        isOpen={featureTrayOpen}
        onClose={() => setFeatureTrayOpen(false)}
        position={featureTrayPosition}
        onConfigChange={setFeatureConfig}
        currentConfig={featureConfig}
      />

      {/* Post Preview Modal */}
      <PostPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        content={generatedContent}
        platform="instagram"
      />
    </div>
  )
}
