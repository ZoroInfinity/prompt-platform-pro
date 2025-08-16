import { useState } from "react"
import { Send, Paperclip, Image as ImageIcon, Edit2, Calendar, Share2, ChevronDown, Download, Upload, Palette, X, ChevronLeft, ChevronRight, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"

interface CampaignData {
  platform: string
  content: string[]
  icon: string
}

const platformIcons: Record<string, string> = {
  whatsapp: "🟢",
  google: "🔍",
  instagram: "📷",
  linkedin: "💼",
  facebook: "👥",
  twitter: "🐦"
}

const platformNames: Record<string, string> = {
  whatsapp: "WhatsApp",
  google: "Google Ads",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  twitter: "Twitter"
}

export function CampaignGenerator() {
  const [input, setInput] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const [currentPlatform, setCurrentPlatform] = useState("instagram")
  const [currentVersion, setCurrentVersion] = useState(0)
  const [targetAudience, setTargetAudience] = useState("")
  const [cta, setCta] = useState("")
  const [tone, setTone] = useState("")
  const [language, setLanguage] = useState("english")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCampaigns, setGeneratedCampaigns] = useState<Record<string, CampaignData>>({})
  const [showPlatformSelector, setShowPlatformSelector] = useState(false)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")

  const platforms = [
    { id: "whatsapp", name: "WhatsApp Campaign" },
    { id: "google", name: "Google Ad Copy" },
    { id: "instagram", name: "Instagram Ad Copy" },
    { id: "linkedin", name: "LinkedIn Sponsored Post" },
    { id: "facebook", name: "Facebook Ad Copy" }
  ]

  const tones = ["Professional", "Casual", "Friendly", "Urgent", "Inspirational", "Humorous"]
  const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese"]

  // Mock campaign content with multiple versions
  const campaignContent: Record<string, string[]> = {
    whatsapp: [
      "🚀 Ready to transform your business? \n\nDiscover how our solution can help you:\n✅ Save 20+ hours per week\n✅ Increase productivity by 300%\n✅ Focus on what matters most\n\nJoin 10,000+ satisfied customers! Tap to learn more ⬇️",
      "💡 Struggling with time management? \n\nOur automation platform delivers:\n🎯 20+ hours saved weekly\n🎯 300% productivity boost\n🎯 Streamlined workflows\n\nReady to transform your business? Get started today! 🚀"
    ],
    google: [
      "Transform Your Business | Save 20+ Hours Weekly\nAutomate repetitive tasks and focus on growth. Join 10,000+ successful businesses.\nGet Started Free →",
      "Business Automation Made Simple | Boost Productivity 300%\nStreamline operations and save time instantly. Trusted by thousands.\nStart Your Free Trial →"
    ],
    instagram: [
      "🚀 Ready to level up your business game?\n\nOur automation solution helps entrepreneurs like you:\n✨ Save 20+ hours per week\n🎯 Boost productivity by 300%\n💡 Focus on strategic growth\n🔥 Join 10,000+ success stories\n\n#BusinessAutomation #Productivity #Entrepreneur #Growth #Success",
      "✨ Entrepreneurs, this is your moment! \n\nTransform your business with automation:\n🚀 Save 20+ hours weekly\n💪 300% productivity increase\n🎯 Focus on what truly matters\n\nJoin the revolution! 🔥\n\n#Automation #BusinessGrowth #Productivity #Success #Entrepreneur"
    ],
    linkedin: [
      "Ready to transform your business operations?\n\nOur automation platform delivers measurable results:\n• 20+ hours saved weekly\n• 300% productivity increase\n• Streamlined workflows\n• Proven ROI in 30 days\n\nJoin 10,000+ forward-thinking businesses that have already made the switch to smarter operations.\n\n#BusinessAutomation #Productivity #Innovation #DigitalTransformation",
      "The future of business is automated.\n\nWhy leading companies choose our platform:\n✓ Eliminate repetitive tasks\n✓ Boost team productivity by 300%\n✓ Save 20+ hours per week\n✓ Achieve ROI in 30 days\n\nTransform your operations today.\n\n#Automation #BusinessEfficiency #DigitalTransformation #Leadership"
    ],
    facebook: [
      "🚀 Ready to transform your business?\n\nDiscover how automation can revolutionize your operations:\n✅ Save 20+ hours per week\n✅ Increase productivity by 300%\n✅ Focus on strategic growth\n✅ Join 10,000+ success stories\n\nSee how it works and get started today!\n\nLearn More ↓",
      "💼 Business owners, listen up!\n\nStop wasting time on repetitive tasks:\n🎯 Save 20+ hours weekly\n🎯 Boost productivity by 300%\n🎯 Focus on growth strategies\n🎯 Join thousands of success stories\n\nReady to automate? Start your journey! 🚀"
    ]
  }

  // Mock AI-generated and search images
  const mockImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop"
  ]


  const handleImageUpload = () => {
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

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(p => p !== platformId)
      } else {
        return [...prev, platformId]
      }
    })
  }

  const getCurrentContent = () => {
    const campaign = generatedCampaigns[currentPlatform]
    return campaign?.content[currentVersion] || ""
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save edit
      const campaign = generatedCampaigns[currentPlatform]
      if (campaign) {
        campaign.content[currentVersion] = editContent
        setGeneratedCampaigns({...generatedCampaigns})
      }
    } else {
      // Start editing
      setEditContent(getCurrentContent())
    }
    setIsEditing(!isEditing)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || selectedPlatforms.length === 0) return

    setIsGenerating(true)
    
    setTimeout(() => {
      const campaigns: Record<string, CampaignData> = {}
      selectedPlatforms.forEach(platform => {
        const hasAdvancedOptions = targetAudience || cta || tone || language !== "english"
        const versions = hasAdvancedOptions ? 
          campaignContent[platform] || [`Generated campaign content for ${platformNames[platform]}...`, `Alternative version for ${platformNames[platform]}...`] :
          [campaignContent[platform]?.[0] || `Generated campaign content for ${platformNames[platform]}...`]
        
        campaigns[platform] = {
          platform,
          content: versions,
          icon: platformIcons[platform]
        }
      })
      
      setGeneratedCampaigns(campaigns)
      setCurrentPlatform(selectedPlatforms[0])
      setCurrentVersion(0)
      setIsGenerating(false)
    }, 2000)
  }


  const isLandingState = Object.keys(generatedCampaigns).length === 0 && !isGenerating

  return (
    <div className="w-full h-full">
      {/* Campaign Input Section */}
      <div className={`w-full transition-all duration-300 ${
        isLandingState 
          ? "flex items-center justify-center min-h-screen px-4" 
          : "flex justify-center py-6 px-6"
      }`}>
        <div className={`transition-all duration-300 ${
          isLandingState ? "max-w-2xl w-full" : "max-w-5xl w-full"
        }`}>
          {isLandingState && (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Campaign Generator
              </h1>
              <p className="text-muted-foreground">
                Create ad copy for multiple platforms in seconds
              </p>
            </div>
          )}

          <Card className="glass-card shadow-lg">
            <CardContent className="p-6 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Top Controls Row */}
                <div className="flex gap-4 items-center">
                  {/* Image Upload */}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 glass border-0 bg-muted/30"
                    onClick={handleImageUpload}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    Attach Image
                  </Button>

                  {/* Platform Selector */}
                  <Collapsible open={showPlatformSelector} onOpenChange={setShowPlatformSelector}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 justify-between glass border-0 bg-muted/30 min-w-[150px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Platforms</span>
                          {selectedPlatforms.length > 0 && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {selectedPlatforms.length}
                            </span>
                          )}
                        </div>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="absolute z-50 mt-2 w-64 bg-background border border-muted rounded-lg shadow-lg">
                      <div className="p-4 space-y-3">
                        {platforms.map((platform) => (
                          <div key={platform.id} className="flex items-center space-x-3">
                            <Checkbox
                              id={platform.id}
                              checked={selectedPlatforms.includes(platform.id)}
                              onCheckedChange={() => handlePlatformToggle(platform.id)}
                            />
                            <label htmlFor={platform.id} className="flex items-center gap-2 cursor-pointer">
                              <span className="text-lg">{platformIcons[platform.id]}</span>
                              <span className="text-sm font-medium">{platform.name}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Advanced Options */}
                  <Collapsible open={showAdvancedOptions} onOpenChange={setShowAdvancedOptions}>
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="h-10 glass border-0 bg-muted/30"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Advanced
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="absolute z-50 mt-2 w-80 bg-background border border-muted rounded-lg shadow-lg">
                      <div className="p-4 grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="audience" className="text-sm font-medium">Target Audience</Label>
                          <Input
                            id="audience"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                            placeholder="e.g., Small business owners"
                            className="mt-1 border-0 bg-background/50"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cta" className="text-sm font-medium">Call to Action</Label>
                          <Input
                            id="cta"
                            value={cta}
                            onChange={(e) => setCta(e.target.value)}
                            placeholder="e.g., Get started free"
                            className="mt-1 border-0 bg-background/50"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="tone" className="text-sm font-medium">Tone</Label>
                          <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger className="mt-1 border-0 bg-background/50">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-muted">
                              {tones.map((t) => (
                                <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="language" className="text-sm font-medium">Language</Label>
                          <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger className="mt-1 border-0 bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background border border-muted">
                              {languages.map((lang) => (
                                <SelectItem key={lang} value={lang.toLowerCase()}>{lang}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                {/* Main Campaign Input */}
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your campaign message or product..."
                    className="resize-none border-0 focus:ring-2 focus:ring-primary/20 min-h-[80px]"
                    rows={3}
                  />
                </div>

                {/* Image Preview */}
                {uploadedImage && (
                  <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
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

                <Button 
                  type="submit" 
                  disabled={!input.trim() || selectedPlatforms.length === 0 || isGenerating}
                  className="w-full bg-primary hover:bg-primary/90 h-12"
                >
                  {isGenerating ? (
                    "Generating campaigns..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Generate Campaigns
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Generated Campaigns */}
      {(Object.keys(generatedCampaigns).length > 0 || isGenerating) && (
        <div className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Generating campaign content...</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className={`w-full ${isLandingState ? "max-w-2xl" : "max-w-7xl"}`}>
                  <Tabs value={currentPlatform} onValueChange={setCurrentPlatform} className="w-full">
                    {/* Platform Tabs */}
                    <TabsList className="grid w-full grid-cols-5 mb-6 bg-muted/30">
                      {selectedPlatforms.map((platformId) => (
                        <TabsTrigger 
                          key={platformId} 
                          value={platformId}
                          className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
                        >
                          <span className="text-sm">{platformIcons[platformId]}</span>
                          <span className="hidden sm:inline text-xs">{platformNames[platformId]}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {/* 2-Column Layout matching Quick Post */}
                    {selectedPlatforms.map((platformId) => (
                      <TabsContent key={platformId} value={platformId} className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Content Card (Left) */}
                          <Card className="glass-card shadow-lg">
                            <CardContent className="p-8 space-y-6">
                              {/* Platform Tabs (Logo Only) */}
                              <TabsList className="grid grid-cols-3 w-full bg-muted/30">
                                {selectedPlatforms.slice(0, 3).map((pid) => (
                                  <TabsTrigger 
                                    key={pid} 
                                    value={pid}
                                    className="data-[state=active]:bg-background"
                                    onClick={() => setCurrentPlatform(pid)}
                                  >
                                    <span className="text-lg">{platformIcons[pid]}</span>
                                  </TabsTrigger>
                                ))}
                              </TabsList>

                              {/* Version Carousel */}
                              <div className="relative">
                                {generatedCampaigns[platformId]?.content.length > 1 && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0"
                                      onClick={() => setCurrentVersion(Math.max(0, currentVersion - 1))}
                                      disabled={currentVersion === 0}
                                    >
                                      <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0"
                                      onClick={() => setCurrentVersion(Math.min((generatedCampaigns[platformId]?.content.length || 1) - 1, currentVersion + 1))}
                                      disabled={currentVersion >= (generatedCampaigns[platformId]?.content.length || 1) - 1}
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                                
                                {isEditing ? (
                                  <Textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[300px] text-base leading-relaxed resize-none p-6"
                                  />
                                ) : (
                                  <Textarea
                                    value={getCurrentContent()}
                                    readOnly
                                    className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[300px] text-base leading-relaxed resize-none p-6"
                                  />
                                )}
                              </div>

                              {/* Version Label */}
                              {generatedCampaigns[platformId]?.content.length > 1 && (
                                <p className="text-xs text-muted-foreground text-center">
                                  Version {currentVersion + 1} of {generatedCampaigns[platformId]?.content.length}
                                </p>
                              )}

                              {/* Action Buttons - Left Aligned */}
                              <div className="flex gap-3 justify-start">
                                <Button size="default" variant="outline" className="glass border-0 h-12" onClick={handleEditToggle}>
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  {isEditing ? "Save" : "Edit Text"}
                                </Button>
                                <Button size="default" className="bg-primary hover:bg-primary/90 h-12">
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Post Now
                                </Button>
                                <Button size="default" variant="outline" className="glass border-0 h-12">
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Image Card (Right) */}
                          <Card className="glass-card shadow-lg">
                            <CardContent className="p-8 space-y-6">
                              {/* Image Carousel */}
                              <div className="space-y-4">
                                <div className="relative aspect-square bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/30 overflow-hidden">
                                  {selectedImages.length > 0 || uploadedImage ? (
                                    <img 
                                      src={uploadedImage || selectedImages[0] || mockImages[0]} 
                                      alt="Campaign image" 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex items-center justify-center h-full">
                                      <div className="text-center">
                                        <ImageIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Select an image</p>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Image Selection Grid */}
                                <div className="grid grid-cols-3 gap-2">
                                  {mockImages.map((img, idx) => (
                                    <div key={idx} className="relative">
                                      <img 
                                        src={img} 
                                        alt={`Option ${idx + 1}`}
                                        className="w-full aspect-square object-cover rounded cursor-pointer border-2 border-transparent hover:border-primary"
                                        onClick={() => setSelectedImages([img])}
                                      />
                                      <Checkbox 
                                        className="absolute top-1 right-1"
                                        checked={selectedImages.includes(img)}
                                        onCheckedChange={(checked) => {
                                          if (checked) {
                                            setSelectedImages([img])
                                          } else {
                                            setSelectedImages([])
                                          }
                                        }}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Image Action Buttons - Right Aligned */}
                              <div className="flex gap-3 justify-end">
                                <Button size="default" variant="outline" className="glass border-0 h-12">
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Edit with AI
                                </Button>
                                <Button size="default" variant="outline" className="glass border-0 h-12" onClick={handleImageUpload}>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload
                                </Button>
                                <Button size="default" variant="outline" className="glass border-0 h-12">
                                  <Palette className="h-4 w-4 mr-2" />
                                  Apply Logo
                                </Button>
                                {(selectedImages.length > 0 || uploadedImage) && (
                                  <Button 
                                    size="default" 
                                    variant="outline" 
                                    className="glass border-0 h-12 w-12 p-0"
                                    onClick={() => {
                                      setSelectedImages([])
                                      setUploadedImage(null)
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}