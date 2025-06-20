import { useState } from "react"
import { Send, Sparkles, Image as ImageIcon, Brain, FileText, Edit, X, MessageSquare, Square, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentPreviewCard } from "@/components/ContentPreviewCard"
import { EditorTray } from "@/components/EditorTray"
import { MediaSearchSidebar } from "@/components/MediaSearchSidebar"
import { FeatureTray } from "@/components/FeatureTray"
import { PostPreviewModal } from "@/components/PostPreviewModal"
import { BusinessContentCard } from "@/components/BusinessContentCard"
import { Instagram, Linkedin, Twitter } from "lucide-react"

interface GeneratedContent {
  platform: string
  content: string
  image: string | null
  outputId: string
}

interface BusinessContent {
  content: string
  outputId: string
  documentType: string
}

interface ChatInterfaceProps {
  onModeActivation?: (mode: string) => void
  activeMode?: string
}

export function ChatInterface({ onModeActivation, activeMode = "quick-post" }: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>([])
  const [businessContents, setBusinessContents] = useState<BusinessContent[]>([])
  const [hasGenerated, setHasGenerated] = useState(false)
  const [sharedImage, setSharedImage] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState("default")
  const [editorTray, setEditorTray] = useState<{isOpen: boolean, platform: string, content: string, outputId: string}>({
    isOpen: false,
    platform: "",
    content: "",
    outputId: ""
  })
  const [isMediaSearchOpen, setIsMediaSearchOpen] = useState(false)
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean
    platform: string
    content: string
  }>({
    isOpen: false,
    platform: "",
    content: ""
  })
  const [featureTray, setFeatureTray] = useState<{
    isOpen: boolean
    mode: string
    position: { x: number; y: number }
  }>({
    isOpen: false,
    mode: "",
    position: { x: 0, y: 0 }
  })
  const [featureConfigs, setFeatureConfigs] = useState<{
    [key: string]: any
  }>({
    "quick-post": {
      platforms: ["linkedin"],
      autoImage: true
    },
    "business-writing": {
      businessType: "email",
      showCitations: false
    },
    "content-creation": {
      contentFormat: "blog-intro"
    }
  })

  const modes = [
    { id: "quick-post", label: "Quick Post", icon: Brain, tooltip: "Generate quick social media posts" },
    { id: "business-writing", label: "Business Writing", icon: FileText, tooltip: "Create professional business content" },
    { id: "content-creation", label: "Content Creation", icon: Edit, tooltip: "Advanced content creation tools" }
  ]

  const modelOptions = [
    { value: "default", label: "Default" },
    { value: "witty", label: "Witty" },
    { value: "formal", label: "Formal" },
    { value: "experimental", label: "Experimental" }
  ]

  const platformIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    twitter: Twitter
  }

  const sampleImages = [
    "photo-1488590528505-98d2b5aba04b",
    "photo-1461749280684-dccba630e2f6", 
    "photo-1581091226825-a6a2a5aee158",
    "photo-1486312338219-ce68d2c6f44d",
    "photo-1518770660439-4636190af475",
    "photo-1649972904349-6e44c42644a7"
  ]

  const generateBusinessContent = (prompt: string, documentType: string): string => {
    const businessTemplates = {
      email: `**Professional Email**

Subject: Re: ${prompt}

Dear [Recipient],

I hope this email finds you well. I am writing to address the matter regarding ${prompt}.

**Key Points:**
• Strategic alignment with business objectives
• Clear actionable recommendations
• Professional communication standards
• Timely follow-up and accountability

After careful consideration, I recommend we proceed with the following approach:

1. **Immediate Actions:** Implement the proposed framework within the next two weeks
2. **Resource Allocation:** Assign dedicated team members to oversee execution
3. **Timeline Management:** Establish clear milestones and deliverables
4. **Quality Assurance:** Regular review sessions to ensure standards are met

**Next Steps:**
Please let me know your thoughts on this proposal. I am available to discuss this further at your convenience and look forward to your feedback.

Best regards,
[Your Name]`,
      
      proposal: `**Business Proposal**

**Executive Summary**
This proposal outlines our comprehensive approach to ${prompt}, designed to deliver measurable results and strategic value.

**Problem Statement**
Current market conditions require innovative solutions that address core business challenges while maintaining operational efficiency and cost-effectiveness.

**Proposed Solution**
Our recommended approach leverages industry best practices and proven methodologies:

• **Phase 1:** Assessment and Planning (2-3 weeks)
• **Phase 2:** Implementation and Testing (4-6 weeks)  
• **Phase 3:** Full Deployment and Optimization (2-4 weeks)

**Expected Outcomes**
- Improved operational efficiency by 25-30%
- Enhanced customer satisfaction metrics
- Streamlined processes and reduced overhead costs
- Measurable ROI within 6 months

**Investment Required**
The total investment for this initiative is structured to provide maximum value while ensuring sustainable implementation.

**Conclusion**
This proposal represents a strategic opportunity to achieve significant business improvements. We recommend moving forward with the outlined approach to realize these benefits.`,

      report: `**Business Report**

**Executive Summary**
This report analyzes ${prompt} and provides strategic recommendations for organizational improvement and growth.

**Current Situation Analysis**
Our comprehensive review reveals several key factors that require immediate attention and strategic intervention.

**Key Findings:**
1. **Performance Metrics:** Current benchmarks indicate opportunities for optimization
2. **Market Position:** Competitive analysis suggests potential for enhanced positioning
3. **Resource Utilization:** Efficiency improvements can be achieved through strategic reallocation
4. **Risk Assessment:** Identified risks are manageable with proper mitigation strategies

**Strategic Recommendations:**
• Implement data-driven decision-making processes
• Enhance cross-functional collaboration mechanisms
• Invest in technology infrastructure improvements
• Develop comprehensive training and development programs

**Implementation Roadmap:**
- **Quarter 1:** Foundation building and team alignment
- **Quarter 2:** Process optimization and system integration
- **Quarter 3:** Performance monitoring and adjustment
- **Quarter 4:** Full-scale deployment and evaluation

**Conclusion:**
The analysis indicates significant opportunities for improvement. Implementing these recommendations will position the organization for sustained growth and competitive advantage.`
    }

    return businessTemplates[documentType as keyof typeof businessTemplates] || businessTemplates.email
  }

  const generatePlatformContent = (platform: string, prompt: string, variation: number = 1): string => {
    const platformStyles = {
      linkedin: [
        `${prompt}

Professional insights for career growth and business success. Building meaningful connections in the professional space.

Key takeaways:
→ Strategic approach to content
→ Professional network expansion  
→ Industry thought leadership
→ Business value creation

#LinkedIn #Professional #Business #Leadership #CareerGrowth`,
        `${prompt}

Sharing valuable insights from my professional journey. What I've learned about building successful strategies and fostering growth.

Three key principles:
• Focus on authentic value creation
• Build genuine professional relationships
• Continuously invest in learning and development

What's your experience with professional growth? Share your thoughts below!

#ProfessionalDevelopment #Leadership #CareerGrowth #Business`
      ],
      
      instagram: [
        `${prompt}

Inspiring content that connects and engages! ✨

Creating authentic moments that matter. Building a community of like-minded individuals who value creativity and growth.

#Instagram #Creative #Inspiration #Community #Growth #Authentic`,
        `${prompt}

Life is about the moments that take your breath away 💫

Every day is a new opportunity to create, inspire, and connect with amazing people. What inspires you today?

Drop a ❤️ if this resonates with you!

#Inspiration #Life #Community #Creative #Authentic #Growth`
      ],
      
      twitter: [
        `${prompt}

Quick insights and thoughts that spark meaningful conversations. 

Building connections through authentic dialogue.

#Twitter #Insights #Community #Growth`,
        `${prompt}

Sometimes the best ideas come from the simplest conversations.

What's one insight that changed your perspective recently? 🤔

#Thoughts #Community #Learning`
      ]
    }

    const styles = platformStyles[platform as keyof typeof platformStyles] || platformStyles.linkedin
    return styles[variation] || styles[0]
  }

  const handleGenerate = async () => {
    if (!input.trim()) return

    setIsGenerating(true)
    setHasGenerated(true)
    
    if (activeMode === "business-writing") {
      const documentType = featureConfigs["business-writing"].businessType || "email"
      
      setTimeout(() => {
        const newBusinessContents: BusinessContent[] = []
        
        for (let i = 0; i < 2; i++) {
          newBusinessContents.push({
            content: generateBusinessContent(input, documentType),
            outputId: `business-${Date.now()}-${i + 1}`,
            documentType
          })
        }
        
        setBusinessContents(newBusinessContents)
        setInput("")
        setIsGenerating(false)
      }, 800)
    } else {
      const platformsToUse = activeMode === "quick-post" 
        ? featureConfigs["quick-post"].platforms || ["linkedin"]
        : ["linkedin"]
      
      if (activeMode === "quick-post" && featureConfigs["quick-post"].autoImage) {
        const imageId = sampleImages[Math.floor(Math.random() * sampleImages.length)]
        setSharedImage(imageId)
      }
      
      setTimeout(() => {
        const newContents: GeneratedContent[] = []
        
        platformsToUse.forEach(platform => {
          for (let i = 0; i < 2; i++) {
            newContents.push({
              platform,
              content: generatePlatformContent(platform, input, i),
              image: null,
              outputId: `${platform}-${i + 1}`
            })
          }
        })
        
        setGeneratedContents(newContents)
        setInput("")
        setIsGenerating(false)
      }, 800)
    }
  }

  const handleStopGeneration = () => {
    setIsGenerating(false)
  }

  const handleModeChange = (modeId: string) => {
    if (modeId !== activeMode) {
      setGeneratedContents([])
      setBusinessContents([])
      setHasGenerated(false)
      setSharedImage(null)
    }
    
    if (onModeActivation) {
      onModeActivation(modeId)
    }
  }

  const handleFeatureIconHover = (mode: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setFeatureTray({
      isOpen: true,
      mode,
      position: {
        x: rect.left,
        y: rect.bottom + 8
      }
    })
  }

  const handleFeatureIconRightClick = (mode: string, event: React.MouseEvent) => {
    event.preventDefault()
    const rect = event.currentTarget.getBoundingClientRect()
    setFeatureTray({
      isOpen: true,
      mode,
      position: {
        x: event.clientX,
        y: event.clientY
      }
    })
  }

  const handleFeatureConfigChange = (mode: string, config: any) => {
    setFeatureConfigs(prev => ({
      ...prev,
      [mode]: config
    }))
  }

  const getFeatureBadge = (mode: string) => {
    const config = featureConfigs[mode]
    if (!config) return null

    switch (mode) {
      case "quick-post":
        const platformCount = config.platforms?.length || 0
        if (platformCount > 1 || config.autoImage) {
          return (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
          )
        }
        break
      case "business-writing":
        if (config.businessType !== "email" || config.showCitations) {
          return (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
          )
        }
        break
      case "content-creation":
        if (config.contentFormat !== "blog-intro") {
          return (
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
          )
        }
        break
    }
    return null
  }

  const handlePreview = (platform: string, content: string) => {
    setPreviewModal({
      isOpen: true,
      platform,
      content
    })
  }

  const handlePostNow = (platform: string, content: string) => {
    console.log(`Posting to ${platform} immediately:`, content)
    handlePreview(platform, content)
  }

  const handleRemoveSharedImage = () => {
    setSharedImage(null)
  }

  const handleChangeSharedImage = (imageId: string) => {
    setSharedImage(imageId)
  }

  const selectedPlatforms = activeMode === "quick-post" 
    ? featureConfigs["quick-post"].platforms || ["linkedin"]
    : ["linkedin"]

  const getContentForPlatform = (platform: string) => {
    return generatedContents.filter(content => content.platform === platform)
  }

  const handleBusinessContentChange = (outputId: string, newContent: string) => {
    setBusinessContents(prev => 
      prev.map(content => 
        content.outputId === outputId
          ? { ...content, content: newContent }
          : content
      )
    )
  }

  return (
    <div className="w-full max-w-none mx-auto px-2">
      {/* Chat Interface - Always at top */}
      <div className="glass-card p-6 mb-6">
        <div className="space-y-4">
          <div className="flex gap-3">
            <Textarea
              placeholder={activeMode === "business-writing" 
                ? "Describe the business document you need..." 
                : "What would you like to create today?"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleGenerate()
                }
              }}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50 placeholder:text-muted-foreground/70 text-base py-3 resize-none flex-1"
              rows={hasGenerated ? 1 : 2}
            />
            <div className="flex items-end gap-2">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="glass border-0 w-32 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  {modelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={isGenerating ? handleStopGeneration : handleGenerate}
                disabled={!isGenerating && !input.trim()}
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 h-10 w-10"
              >
                {isGenerating ? (
                  <Square className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mode Selection Icons */}
          <div className="flex gap-2">
            <TooltipProvider>
              {modes.map((mode) => {
                const Icon = mode.icon
                const isActive = activeMode === mode.id
                return (
                  <Tooltip key={mode.id}>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleModeChange(mode.id)}
                          onMouseEnter={(e) => handleFeatureIconHover(mode.id, e)}
                          onContextMenu={(e) => handleFeatureIconRightClick(mode.id, e)}
                          className={`glass border-0 p-3 rounded-full hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-200 ${
                            isActive 
                              ? "bg-primary/20 ring-2 ring-primary/50 shadow-lg" 
                              : ""
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        </Button>
                        {getFeatureBadge(mode.id)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{mode.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Business Writing Content */}
      {activeMode === "business-writing" && businessContents.length > 0 && (
        <div className="space-y-8 mb-8">
          {businessContents.map((content, index) => (
            <BusinessContentCard
              key={content.outputId}
              content={content.content}
              documentType={content.documentType}
              versionLabel={`Version ${index + 1}`}
              onContentChange={(newContent) => handleBusinessContentChange(content.outputId, newContent)}
              showCitations={featureConfigs["business-writing"].showCitations}
            />
          ))}
        </div>
      )}

      {/* Quick Post Content Layout */}
      {activeMode === "quick-post" && generatedContents.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          {/* Content Area - 3/5 width */}
          <div className="lg:col-span-3">
            <div className="glass-card p-6">
              <Tabs defaultValue={selectedPlatforms[0]} className="w-full">
                <TabsList className="grid w-full mb-6" style={{gridTemplateColumns: `repeat(${selectedPlatforms.length}, 1fr)`}}>
                  {selectedPlatforms.map(platform => {
                    const IconComponent = platformIcons[platform as keyof typeof platformIcons]
                    return (
                      <TabsTrigger key={platform} value={platform} className="capitalize flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        {platform}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
                
                {selectedPlatforms.map(platform => {
                  const platformContents = getContentForPlatform(platform)
                  if (platformContents.length === 0) return null
                  
                  return (
                    <TabsContent key={platform} value={platform}>
                      <div className="relative">
                        <Carousel 
                          className="w-full" 
                          opts={{
                            align: "start",
                            loop: false,
                          }}
                        >
                          <CarouselContent className="-ml-2 md:-ml-4">
                            {platformContents.map((content, index) => (
                              <CarouselItem key={content.outputId} className="pl-2 md:pl-4 basis-full">
                                <div className="h-[500px]">
                                  <ContentPreviewCard
                                    platform={content.platform}
                                    content={content.content}
                                    image={null}
                                    onEdit={() => handleEditContent(content.platform, content.outputId)}
                                    onContentChange={(newContent) => handleContentChange(content.platform, content.outputId, newContent)}
                                    onPostNow={() => handlePostNow(content.platform, content.content)}
                                    versionLabel={`Version ${index + 1}`}
                                    isCompact={false}
                                  />
                                </div>
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          <CarouselPrevious className="glass border-0" />
                          <CarouselNext className="glass border-0" />
                        </Carousel>
                      </div>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </div>
          </div>

          {/* Enhanced Image Section - 2/5 width, matching content height */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-[500px] flex flex-col">
              <h3 className="text-xl font-semibold mb-6">Shared Image</h3>
              {sharedImage ? (
                <div className="flex flex-col flex-1">
                  <div className="relative rounded-xl overflow-hidden bg-muted/20 shadow-lg aspect-square flex-1 max-h-[340px]">
                    <img 
                      src={`https://images.unsplash.com/${sharedImage}?w=600&h=600&fit=crop`}
                      alt="Shared content image" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    <Button
                      variant="outline"
                      className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30"
                      onClick={() => setIsMediaSearchOpen(true)}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Edit Image
                    </Button>
                    <Button
                      variant="outline"
                      className="glass border-0 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700"
                      onClick={handleRemoveSharedImage}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 border-2 border-dashed border-muted-foreground/20 rounded-xl aspect-square max-h-[340px]">
                  <ImageIcon className="h-12 w-12 text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground mb-4">No image selected</p>
                  <Button
                    variant="outline"
                    onClick={() => setIsMediaSearchOpen(true)}
                    className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feature Tray */}
      <FeatureTray
        mode={featureTray.mode}
        isOpen={featureTray.isOpen}
        onClose={() => setFeatureTray(prev => ({ ...prev, isOpen: false }))}
        position={featureTray.position}
        onConfigChange={(config) => handleFeatureConfigChange(featureTray.mode, config)}
        currentConfig={featureConfigs[featureTray.mode] || {}}
      />

      {/* Editor Tray */}
      <EditorTray
        isOpen={editorTray.isOpen}
        onClose={() => setEditorTray({ isOpen: false, platform: "", content: "", outputId: "" })}
        content={editorTray.content}
        onContentChange={(newContent) => {
          setEditorTray(prev => ({ ...prev, content: newContent }))
          handleContentChange(editorTray.platform, editorTray.outputId, newContent)
        }}
        platform={editorTray.platform}
      />

      {/* Media Search Sidebar */}
      <MediaSearchSidebar
        isOpen={isMediaSearchOpen}
        onClose={() => setIsMediaSearchOpen(false)}
        onImageSelect={(imageId) => handleChangeSharedImage(imageId)}
        onVideoSelect={handleVideoSelect}
      />

      {/* Post Preview Modal */}
      <PostPreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false, platform: "", content: "" })}
        platform={previewModal.platform}
        content={previewModal.content}
        image={sharedImage}
      />
    </div>
  )

  // Helper functions
  function handleEditContent(platform: string, outputId: string) {
    const content = generatedContents.find(c => c.platform === platform && c.outputId === outputId)?.content || ""
    setEditorTray({ isOpen: true, platform, content, outputId })
  }

  function handleContentChange(platform: string, outputId: string, newContent: string) {
    setGeneratedContents(prev => 
      prev.map(content => 
        content.platform === platform && content.outputId === outputId
          ? { ...content, content: newContent }
          : content
      )
    )
  }

  function handleVideoSelect(videoId: string) {
    console.log("Video selected:", videoId)
  }
}
