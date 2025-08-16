import { useState } from "react"
import { Send, Paperclip, Image as ImageIcon, Edit2, Calendar, Share2, ChevronDown, Download, Upload, Palette, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface CampaignData {
  platform: string
  content: string
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
  const [targetAudience, setTargetAudience] = useState("")
  const [cta, setCta] = useState("")
  const [tone, setTone] = useState("")
  const [language, setLanguage] = useState("english")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCampaigns, setGeneratedCampaigns] = useState<Record<string, CampaignData>>({})
  const [showPlatformSelector, setShowPlatformSelector] = useState(false)
  const [showOptionalParams, setShowOptionalParams] = useState(false)

  const platforms = [
    { id: "whatsapp", name: "WhatsApp Campaign" },
    { id: "google", name: "Google Ad Copy" },
    { id: "instagram", name: "Instagram Ad Copy" },
    { id: "linkedin", name: "LinkedIn Sponsored Post" },
    { id: "facebook", name: "Facebook Ad Copy" }
  ]

  const tones = ["Professional", "Casual", "Friendly", "Urgent", "Inspirational", "Humorous"]
  const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese"]

  // Mock campaign content for each platform
  const campaignContent: Record<string, string> = {
    whatsapp: "🚀 Ready to transform your business? \n\nDiscover how our solution can help you:\n✅ Save 20+ hours per week\n✅ Increase productivity by 300%\n✅ Focus on what matters most\n\nJoin 10,000+ satisfied customers! Tap to learn more ⬇️",
    google: "Transform Your Business | Save 20+ Hours Weekly\nAutomate repetitive tasks and focus on growth. Join 10,000+ successful businesses.\nGet Started Free →",
    instagram: "🚀 Ready to level up your business game?\n\nOur automation solution helps entrepreneurs like you:\n✨ Save 20+ hours per week\n🎯 Boost productivity by 300%\n💡 Focus on strategic growth\n🔥 Join 10,000+ success stories\n\n#BusinessAutomation #Productivity #Entrepreneur #Growth #Success",
    linkedin: "Ready to transform your business operations?\n\nOur automation platform delivers measurable results:\n• 20+ hours saved weekly\n• 300% productivity increase\n• Streamlined workflows\n• Proven ROI in 30 days\n\nJoin 10,000+ forward-thinking businesses that have already made the switch to smarter operations.\n\n#BusinessAutomation #Productivity #Innovation #DigitalTransformation",
    facebook: "🚀 Ready to transform your business?\n\nDiscover how automation can revolutionize your operations:\n✅ Save 20+ hours per week\n✅ Increase productivity by 300%\n✅ Focus on strategic growth\n✅ Join 10,000+ success stories\n\nSee how it works and get started today!\n\nLearn More ↓"
  }


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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || selectedPlatforms.length === 0) return

    setIsGenerating(true)
    
    setTimeout(() => {
      const campaigns: Record<string, CampaignData> = {}
      selectedPlatforms.forEach(platform => {
        campaigns[platform] = {
          platform,
          content: campaignContent[platform] || `Generated campaign content for ${platformNames[platform]}...`,
          icon: platformIcons[platform]
        }
      })
      
      setGeneratedCampaigns(campaigns)
      setCurrentPlatform(selectedPlatforms[0])
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
                {/* Main Campaign Input */}
                <div className="relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your campaign message or product..."
                    className="resize-none border-0 focus:ring-2 focus:ring-primary/20 pr-12 min-h-[80px]"
                    rows={3}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 h-8 w-8 p-0 hover:bg-primary/10"
                    onClick={handleImageUpload}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
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

                {/* Platform Selection */}
                <Collapsible open={showPlatformSelector} onOpenChange={setShowPlatformSelector}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between border-0 bg-muted/30 h-12"
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
                  <CollapsibleContent className="mt-2">
                    <div className="grid grid-cols-1 gap-2 p-4 bg-muted/20 rounded-lg">
                      {platforms.map((platform) => (
                        <label 
                          key={platform.id} 
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedPlatforms.includes(platform.id)}
                            onChange={() => handlePlatformToggle(platform.id)}
                            className="w-4 h-4 text-primary bg-background border-2 border-muted-foreground/30 rounded focus:ring-primary focus:ring-2"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{platformIcons[platform.id]}</span>
                            <span className="text-sm font-medium">{platform.name}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Optional Parameters */}
                <Collapsible open={showOptionalParams} onOpenChange={setShowOptionalParams}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between text-sm text-muted-foreground hover:text-foreground"
                    >
                      Optional Parameters
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-lg">
                      <div>
                        <Label htmlFor="audience" className="text-sm font-medium">🎯 Target Audience</Label>
                        <Input
                          id="audience"
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                          placeholder="e.g., Small business owners"
                          className="mt-1 border-0 bg-background/50"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cta" className="text-sm font-medium">🎯 Call to Action</Label>
                        <Input
                          id="cta"
                          value={cta}
                          onChange={(e) => setCta(e.target.value)}
                          placeholder="e.g., Get started free"
                          className="mt-1 border-0 bg-background/50"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="tone" className="text-sm font-medium">🎯 Tone</Label>
                        <Select value={tone} onValueChange={setTone}>
                          <SelectTrigger className="mt-1 border-0 bg-background/50">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            {tones.map((t) => (
                              <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="language" className="text-sm font-medium">🎯 Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="mt-1 border-0 bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {languages.map((lang) => (
                              <SelectItem key={lang} value={lang.toLowerCase()}>{lang}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

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

                     {/* Tab Content - 2 Column Layout */}
                    {selectedPlatforms.map((platformId) => (
                      <TabsContent key={platformId} value={platformId} className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Content Card (Left) */}
                          <Card className="glass-card shadow-lg h-fit">
                            <CardContent className="p-8 space-y-6">
                              {/* Platform Tabs (Logo Only) */}
                              <div className="flex items-center justify-center mb-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-lg">
                                  <span className="text-2xl">{generatedCampaigns[platformId]?.icon}</span>
                                  <span className="font-medium">{platformNames[platformId]}</span>
                                </div>
                              </div>

                              {/* Generated Content */}
                              <div className="space-y-4">
                                <Textarea
                                  value={generatedCampaigns[platformId]?.content || ""}
                                  readOnly
                                  className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[300px] text-base leading-relaxed resize-none p-6"
                                />
                                <p className="text-xs text-muted-foreground text-center">Version 1</p>
                              </div>

                              {/* Action Buttons - Left Aligned */}
                              <div className="flex gap-3 justify-start">
                                <Button size="default" variant="outline" className="glass border-0 h-12">
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Edit Text
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
                          <Card className="glass-card shadow-lg h-fit">
                            <CardContent className="p-8 space-y-6">
                              {/* Image Carousel */}
                              <div className="space-y-4">
                                <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
                                  {uploadedImage ? (
                                    <img 
                                      src={uploadedImage} 
                                      alt="Campaign image" 
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <ImageIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-2" />
                                      <p className="text-sm text-muted-foreground">No image selected</p>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Image Action Buttons - Right Aligned */}
                              <div className="flex gap-3 justify-end">
                                <Button size="default" variant="outline" className="glass border-0 h-12">
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Edit with AI
                                </Button>
                                <Button size="default" variant="outline" className="glass border-0 h-12">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Image
                                </Button>
                                <Button size="default" variant="outline" className="glass border-0 h-12">
                                  <Palette className="h-4 w-4 mr-2" />
                                  Apply Logo
                                </Button>
                                {uploadedImage && (
                                  <Button size="default" variant="outline" className="glass border-0 h-12 w-12 p-0">
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