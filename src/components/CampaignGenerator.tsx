import { useState } from "react"
import { Send, Paperclip, Image as ImageIcon, Edit2, Calendar, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  const [selectedPlatform, setSelectedPlatform] = useState("instagram")
  const [targetAudience, setTargetAudience] = useState("")
  const [cta, setCta] = useState("")
  const [tone, setTone] = useState("")
  const [language, setLanguage] = useState("english")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCampaigns, setGeneratedCampaigns] = useState<CampaignData[]>([])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !selectedPlatform) return

    setIsGenerating(true)
    
    setTimeout(() => {
      const campaign = {
        platform: selectedPlatform,
        content: campaignContent[selectedPlatform] || `Generated campaign content for ${platformNames[selectedPlatform]}...`,
        icon: platformIcons[selectedPlatform]
      }
      
      setGeneratedCampaigns([campaign])
      setIsGenerating(false)
    }, 2000)
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
                  <Label className="text-sm font-medium mb-3 block">Select Platform</Label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger className="border-0 bg-muted/30">
                      <SelectValue placeholder="Choose a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform.id} value={platform.id}>
                          <div className="flex items-center gap-2">
                            <span>{platformIcons[platform.id]}</span>
                            {platform.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  disabled={!input.trim() || !selectedPlatform || isGenerating}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {isGenerating ? (
                    "Generating campaign..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Generate Campaign
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
                  <p className="text-muted-foreground">Generating campaign content...</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-full max-w-2xl">
                  {generatedCampaigns.map((campaign, index) => (
                    <Card key={index} className="glass-card shadow-lg">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl flex items-center gap-3">
                          <span className="text-2xl">{campaign.icon}</span>
                          {platformNames[campaign.platform]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Campaign Content */}
                        <div className="space-y-4">
                          <Textarea
                            value={campaign.content}
                            readOnly
                            className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[200px] text-base leading-relaxed resize-none p-6"
                          />
                        </div>

                        {uploadedImage && (
                          <div className="relative">
                            <img 
                              src={uploadedImage} 
                              alt="Campaign image" 
                              className="w-full h-64 object-cover rounded-lg"
                            />
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                          <Button size="default" variant="outline" className="flex-1 glass border-0 h-12">
                            <Edit2 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="default" className="flex-1 bg-primary hover:bg-primary/90 h-12">
                            <Share2 className="h-4 w-4 mr-2" />
                            Post
                          </Button>
                          <Button size="default" variant="outline" className="flex-1 glass border-0 h-12">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}