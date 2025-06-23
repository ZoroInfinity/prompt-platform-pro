
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { 
  Globe, 
  Building2, 
  Users, 
  Heart, 
  Sparkles, 
  Volume2, 
  Target, 
  Package, 
  Quote, 
  Star,
  Palette,
  Image,
  Edit2,
  Save,
  Loader2,
  Upload,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface PersonaData {
  brandName: string
  industry: string
  targetAudience: string
  coreValues: string
  personalityTraits: string
  brandVoice: string
  valueProp: string
  keyOfferings: string
  taglines: string
  reviews: string
  brandColors: string[]
  images: string[]
}

export function BrandPersonaGenerator() {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [personaData, setPersonaData] = useState<PersonaData | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<PersonaData>>({})
  const [selectedLogoIndex, setSelectedLogoIndex] = useState(0)
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)

  // Mock AI-generated logos
  const aiLogos = [
    "https://images.unsplash.com/photo-1618160702438-9b02040d0a901?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=150&h=150&fit=crop",
    "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=150&h=150&fit=crop"
  ]

  const handleGeneratePersona = async () => {
    if (!websiteUrl.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call - replace with actual Perplexity API integration
    setTimeout(() => {
      const mockData: PersonaData = {
        brandName: "• TechCorp Solutions\n• Innovative Technology Partner\n• Digital Transformation Leader\n• Enterprise Software Provider\n• Cloud Solutions Specialist",
        industry: "• Software & Technology\n• B2B Enterprise Solutions\n• Cloud Computing Services\n• Digital Transformation\n• IT Consulting & Support",
        targetAudience: "• Small to medium businesses\n• Companies seeking digital transformation\n• Enterprises needing cloud solutions\n• Startups requiring scalable tech\n• Organizations modernizing workflows",
        coreValues: "• Innovation and cutting-edge technology\n• Reliability and consistent performance\n• Customer success and satisfaction\n• Transparency in all operations\n• Continuous improvement mindset",
        personalityTraits: "• Professional and trustworthy\n• Innovative and forward-thinking\n• Approachable and customer-focused\n• Solution-oriented mindset\n• Reliable and dependable partner",
        brandVoice: "• Professional yet friendly tone\n• Knowledgeable and expert guidance\n• Solution-oriented communication\n• Clear and transparent messaging\n• Supportive and encouraging approach",
        valueProp: "• Empowering businesses through technology\n• Driving growth and efficiency\n• Simplifying complex digital processes\n• Delivering measurable business results\n• Providing scalable future-ready solutions",
        keyOfferings: "• Cloud migration and management\n• Custom software development\n• Digital consulting services\n• IT support and maintenance\n• Business process automation",
        taglines: "• \"Innovation Simplified\"\n• \"Your Digital Partner\"\n• \"Technology That Works\"\n• \"Empowering Your Digital Future\"\n• \"Solutions That Scale\"",
        reviews: "• \"Excellent service and support\" - 4.8/5 stars\n• \"Transformed our business operations\"\n• \"Professional and reliable team\"\n• \"Outstanding technical expertise\"\n• \"Highly recommend their services\"",
        brandColors: ["#2563eb", "#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"],
        images: []
      }
      setPersonaData(mockData)
      setIsLoading(false)
    }, 2000)
  }

  const handleEdit = (field: string) => {
    setEditingField(field)
    setEditValues({ ...editValues, [field]: personaData?.[field as keyof PersonaData] || "" })
  }

  const handleSaveEdit = (field: string) => {
    if (personaData) {
      setPersonaData({ ...personaData, [field]: editValues[field as keyof PersonaData] })
    }
    setEditingField(null)
    setEditValues({})
  }

  const handleSavePersona = () => {
    console.log("Saving persona data:", personaData)
    // Implement save functionality
  }

  const handleUploadLogo = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // Handle uploaded logo
        console.log("Logo uploaded:", file)
      }
    }
    input.click()
  }

  const nextLogo = () => {
    setCurrentLogoIndex((prev) => (prev + 1) % aiLogos.length)
  }

  const prevLogo = () => {
    setCurrentLogoIndex((prev) => (prev - 1 + aiLogos.length) % aiLogos.length)
  }

  const personaFields = [
    { key: "brandName", label: "Brand Name", icon: Building2 },
    { key: "industry", label: "Industry", icon: Globe },
    { key: "targetAudience", label: "Target Audience", icon: Users },
    { key: "coreValues", label: "Core Values", icon: Heart },
    { key: "personalityTraits", label: "Personality Traits", icon: Sparkles },
    { key: "brandVoice", label: "Brand Voice / Tonality", icon: Volume2 },
    { key: "valueProp", label: "Value Proposition", icon: Target },
    { key: "keyOfferings", label: "Key Offerings", icon: Package },
    { key: "taglines", label: "Brand Taglines", icon: Quote },
    { key: "reviews", label: "Brand Reviews", icon: Star },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Brand Persona Generator</h1>
        <p className="text-muted-foreground">Enter a website URL to automatically generate a comprehensive brand persona</p>
      </div>

      {/* URL Input Section */}
      <Card className="glass-card max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input
              placeholder="Enter Website URL to Generate Brand Persona"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleGeneratePersona}
              disabled={isLoading || !websiteUrl.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Persona"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Persona */}
      {personaData && (
        <div className="space-y-6">
          {/* Company Logo Section */}
          <Card className="glass-card hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4 text-primary" />
                Company Logo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Logo Carousel */}
                <div className="relative">
                  <div className="flex justify-center">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                      <img
                        src={aiLogos[currentLogoIndex]}
                        alt="AI Generated Logo"
                        className="w-full h-full object-cover"
                      />
                      {selectedLogoIndex === currentLogoIndex && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <Check className="h-8 w-8 text-primary bg-white rounded-full p-1" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-md rounded-full hover:scale-105 transition-all duration-200"
                    onClick={prevLogo}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-white/90 hover:bg-white shadow-md rounded-full hover:scale-105 transition-all duration-200"
                    onClick={nextLogo}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {/* Logo Actions */}
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedLogoIndex(currentLogoIndex)}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <Check className="h-3 w-3 mr-2" />
                    Select This Logo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUploadLogo}
                    className="border-gray-200 hover:bg-gray-50"
                  >
                    <Upload className="h-3 w-3 mr-2" />
                    Upload Your Own Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {personaFields.map((field) => {
              const Icon = field.icon
              const isEditing = editingField === field.key
              const value = personaData[field.key as keyof PersonaData] as string

              return (
                <Card key={field.key} className="glass-card hover:shadow-lg transition-all duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center justify-between text-base">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-primary" />
                        {field.label}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => isEditing ? handleSaveEdit(field.key) : handleEdit(field.key)}
                        className="h-8 w-8 p-0"
                      >
                        {isEditing ? (
                          <Save className="h-3 w-3" />
                        ) : (
                          <Edit2 className="h-3 w-3" />
                        )}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={editValues[field.key as keyof PersonaData] as string || ""}
                        onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                        className="min-h-[120px] resize-none"
                        rows={5}
                      />
                    ) : (
                      <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap min-h-[120px]">
                        {value}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}

            {/* Brand Colors Card */}
            <Card className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Palette className="h-4 w-4 text-primary" />
                  Brand Colors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {personaData.brandColors.map((color, index) => (
                    <div key={index} className="flex flex-col items-center gap-1">
                      <div 
                        className="w-12 h-12 rounded-lg border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-muted-foreground font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Images Gallery Card */}
            <Card className="glass-card hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Image className="h-4 w-4 text-primary" />
                  Images Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Image className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Brand images will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={handleSavePersona}
              className="bg-primary hover:bg-primary/90 px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Persona
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
