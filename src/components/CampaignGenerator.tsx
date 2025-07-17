import { useState } from "react"
import { Send, Paperclip, Image as ImageIcon, Edit2, Calendar, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

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
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "linkedin"])
  const [targetAudience, setTargetAudience] = useState("")
  const [cta, setCta] = useState("")
  const [tone, setTone] = useState("")
  const [language, setLanguage] = useState("english")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCampaigns, setGeneratedCampaigns] = useState<CampaignData[]>([])
  const [currentVersionIndex, setCurrentVersionIndex] = useState<Record<string, number>>({})

  const platforms = [
    { id: "whatsapp", name: "WhatsApp Campaign" },
    { id: "google", name: "Google Ad Copy" },
    { id: "instagram", name: "Instagram Ad Copy" },
    { id: "linkedin", name: "LinkedIn Sponsored Post" },
    { id: "facebook", name: "Facebook Ad Copy" },
    { id: "twitter", name: "Twitter Promoted Post" }
  ]

  const tones = ["Professional", "Casual", "Friendly", "Urgent", "Inspirational", "Humorous"]
  const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese"]

  // Mock campaign variations for each platform
  const campaignVariations: Record<string, string[]> = {
    whatsapp: [
      "🚀 Ready to transform your business? \n\nDiscover how our solution can help you:\n✅ Save 20+ hours per week\n✅ Increase productivity by 300%\n✅ Focus on what matters most\n\nJoin 10,000+ satisfied customers! Tap to learn more ⬇️",
      "💡 Transform your workflow today!\n\nOur customers see amazing results:\n• 40% faster project completion\n• 60% reduction in manual tasks\n• 300% ROI in first month\n\nReady to get started? Message us now!"
    ],
    google: [
      "Transform Your Business | Save 20+ Hours Weekly\nAutomate repetitive tasks and focus on growth. Join 10,000+ successful businesses.\nGet Started Free →",
      "Boost Productivity by 300% | Try Free Today\nStreamline operations with AI-powered automation. See results in 30 days.\nStart Your Free Trial →"
    ],
    instagram: [
      "🚀 Ready to level up your business game?\n\nOur automation solution helps entrepreneurs like you:\n✨ Save 20+ hours per week\n🎯 Boost productivity by 300%\n💡 Focus on strategic growth\n🔥 Join 10,000+ success stories\n\n#BusinessAutomation #Productivity #Entrepreneur #Growth #Success",
      "💼 Transform your business operations!\n\nSee what automation can do:\n🔥 Eliminate repetitive tasks\n🔥 Faster project completion\n🔥 More time for what matters\n🔥 Proven 300% ROI\n\nSwipe to see how ➡️\n\n#Automation #BusinessGrowth #Innovation"
    ],
    linkedin: [
      "Ready to transform your business operations?\n\nOur automation platform delivers measurable results:\n• 20+ hours saved weekly\n• 300% productivity increase\n• Streamlined workflows\n• Proven ROI in 30 days\n\nJoin 10,000+ forward-thinking businesses that have already made the switch to smarter operations.\n\n#BusinessAutomation #Productivity #Innovation #DigitalTransformation",
      "Transform your business efficiency today.\n\nKey benefits our clients experience:\n• 40% faster project completion\n• 60% reduction in manual processes\n• Enhanced team collaboration\n• Measurable ROI within first month\n\nDiscover how automation can accelerate your business growth.\n\n#Automation #BusinessEfficiency #Growth"
    ],
    facebook: [
      "🚀 Ready to transform your business?\n\nDiscover how automation can revolutionize your operations:\n✅ Save 20+ hours per week\n✅ Increase productivity by 300%\n✅ Focus on strategic growth\n✅ Join 10,000+ success stories\n\nSee how it works and get started today!\n\nLearn More ↓",
      "💡 Transform your business operations!\n\nOur automation solution delivers:\n🔥 Faster project completion\n🔥 Streamlined workflows\n🔥 More time for important tasks\n🔥 Proven 300% ROI\n\nJoin thousands of successful businesses!\n\nGet Started Free →"
    ],
    twitter: [
      "🚀 Ready to save 20+ hours per week? \n\nOur automation platform helps businesses:\n✅ Boost productivity 300%\n✅ Streamline operations\n✅ Focus on growth\n\nJoin 10,000+ success stories! 🧵\n\n#Automation #Productivity #BusinessGrowth",
      "💡 Transform your business efficiency!\n\n40% faster completion ⚡\n60% less manual work 📊\n300% ROI guaranteed 💰\n\nSee how automation changes everything 👇\n\n#BusinessAutomation #Innovation"
    ]
  }

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    )
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || selectedPlatforms.length === 0) return

    setIsGenerating(true)
    
    setTimeout(() => {
      const campaigns = selectedPlatforms.map(platform => ({
        platform,
        content: campaignVariations[platform]?.[0] || `Generated campaign content for ${platformNames[platform]}...`,
        icon: platformIcons[platform]
      }))
      
      setGeneratedCampaigns(campaigns)
      
      // Initialize version indices
      const indices: Record<string, number> = {}
      selectedPlatforms.forEach(platform => {
        indices[platform] = 0
      })
      setCurrentVersionIndex(indices)
      
      setIsGenerating(false)
    }, 2000)
  }

  const switchVersion = (platform: string, direction: 'next' | 'prev') => {
    const variations = campaignVariations[platform] || []
    const currentIndex = currentVersionIndex[platform] || 0
    
    let newIndex
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % variations.length
    } else {
      newIndex = (currentIndex - 1 + variations.length) % variations.length
    }
    
    setCurrentVersionIndex(prev => ({
      ...prev,
      [platform]: newIndex
    }))
    
    // Update the campaign content
    setGeneratedCampaigns(prev => 
      prev.map(campaign => 
        campaign.platform === platform 
          ? { ...campaign, content: variations[newIndex] }
          : campaign
      )
    )
  }

  const isLandingState = generatedCampaigns.length === 0 && !isGenerating

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
                <div>
                  <Label className="text-sm font-medium mb-3 block">Select Platforms</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {platforms.map((platform) => (
                      <div
                        key={platform.id}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/30 cursor-pointer"
                        onClick={() => handlePlatformToggle(platform.id)}
                      >
                        <Checkbox
                          id={platform.id}
                          checked={selectedPlatforms.includes(platform.id)}
                        />
                        <label
                          htmlFor={platform.id}
                          className="text-sm font-medium cursor-pointer flex items-center gap-2"
                        >
                          <span>{platformIcons[platform.id]}</span>
                          {platform.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Parameters */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="audience" className="text-sm font-medium">Target Audience</Label>
                    <Input
                      id="audience"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="e.g., Small business owners"
                      className="mt-1 border-0 bg-muted/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cta" className="text-sm font-medium">Call to Action</Label>
                    <Input
                      id="cta"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                      placeholder="e.g., Get started free"
                      className="mt-1 border-0 bg-muted/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tone" className="text-sm font-medium">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="mt-1 border-0 bg-muted/30">
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
                    <Label htmlFor="language" className="text-sm font-medium">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="mt-1 border-0 bg-muted/30">
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

                <Button 
                  type="submit" 
                  disabled={!input.trim() || selectedPlatforms.length === 0 || isGenerating}
                  className="w-full bg-primary hover:bg-primary/90"
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
      {(generatedCampaigns.length > 0 || isGenerating) && (
        <div className="px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            {isGenerating ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Generating campaigns for {selectedPlatforms.length} platforms...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedCampaigns.map((campaign, index) => {
                  const variations = campaignVariations[campaign.platform] || []
                  const currentIndex = currentVersionIndex[campaign.platform] || 0
                  
                  return (
                    <Card key={index} className="glass-card">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <span className="text-xl">{campaign.icon}</span>
                            {platformNames[campaign.platform]}
                          </CardTitle>
                          <Badge variant="outline" className="glass border-0">
                            v{currentIndex + 1}/{variations.length}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Campaign Content with Navigation */}
                        <div className="relative">
                          {variations.length > 1 && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full z-10"
                                onClick={() => switchVersion(campaign.platform, 'prev')}
                              >
                                <ChevronLeft className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-white/80 hover:bg-white shadow-sm rounded-full z-10"
                                onClick={() => switchVersion(campaign.platform, 'next')}
                              >
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                          
                          <Textarea
                            value={campaign.content}
                            readOnly
                            className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[120px] text-sm leading-relaxed resize-none pr-16 pl-16"
                          />
                        </div>

                        {uploadedImage && (
                          <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden">
                            <img 
                              src={uploadedImage} 
                              alt="Campaign image"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="glass border-0 flex-1">
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="glass border-0 flex-1">
                            <Share2 className="h-4 w-4 mr-1" />
                            Post
                          </Button>
                          <Button size="sm" variant="outline" className="glass border-0 flex-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}