
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
  Edit2,
  Save,
  Loader2,
  Upload,
  Check,
  Copy
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
}

export function BrandPersonaGenerator() {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [personaData, setPersonaData] = useState<PersonaData | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Partial<PersonaData>>({})
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number | null>(null)

  // Mock AI-generated logos
  const aiLogos = [
    "https://images.unsplash.com/photo-1618160702438-9b02040d0a901?w=120&h=120&fit=crop",
    "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=120&h=120&fit=crop",
    "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=120&h=120&fit=crop",
    "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=120&h=120&fit=crop"
  ]

  // Sample brand names for placeholder
  const sampleBrands = ["Apple", "Google", "Tesla", "Nike", "Spotify"]

  const handleGeneratePersona = async () => {
    if (!websiteUrl.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
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
        brandColors: ["#2563eb", "#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"]
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
        console.log("Logo uploaded:", file)
      }
    }
    input.click()
  }

  const handleLogoSelect = (index: number) => {
    setSelectedLogoIndex(index)
  }

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
  }

  // Updated persona fields with new order
  const personaFields = [
    { key: "brandName", label: "Brand Name", icon: Building2 },
    { key: "industry", label: "Industry", icon: Globe },
    { key: "targetAudience", label: "Target Audience", icon: Users },
    { key: "coreValues", label: "Core Values", icon: Heart },
    { key: "personalityTraits", label: "Personality Traits", icon: Sparkles },
    { key: "brandVoice", label: "Brand Voice / Tonality", icon: Volume2 },
    { key: "valueProp", label: "Brand Benefit / Value Proposition", icon: Target },
    { key: "keyOfferings", label: "Key Offerings", icon: Package },
    { key: "taglines", label: "Brand Taglines", icon: Quote },
    { key: "reviews", label: "Brand Reviews", icon: Star },
  ]

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Brand Persona Generator</h1>
        <p className="text-muted-foreground">Enter a website URL to automatically generate a comprehensive brand persona</p>
        <div className="mt-4 text-sm text-gray-500">
          <span>Try with brands like: </span>
          {sampleBrands.map((brand, index) => (
            <span key={brand} className="font-medium text-primary">
              {brand}{index < sampleBrands.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
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
        <div className="space-y-8">
          {/* Persona Details Grid - 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {personaFields.map((field) => {
              const Icon = field.icon
              const isEditing = editingField === field.key
              const value = personaData[field.key as keyof PersonaData] as string

              return (
                <Card key={field.key} className="glass-card hover:shadow-lg transition-all duration-200 h-60">
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
                  <CardContent className="flex-1">
                    {isEditing ? (
                      <Textarea
                        value={editValues[field.key as keyof PersonaData] as string || ""}
                        onChange={(e) => setEditValues({ ...editValues, [field.key]: e.target.value })}
                        className="h-full resize-none"
                        rows={6}
                      />
                    ) : (
                      <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap h-full overflow-y-auto text-left">
                        {value}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Logo Section */}
          <Card className="glass-card hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5 text-primary" />
                Company Logo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Row */}
              <div className="flex justify-center gap-6">
                {aiLogos.map((logo, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      selectedLogoIndex === index
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'hover:scale-105'
                    }`}
                    onClick={() => handleLogoSelect(index)}
                  >
                    <div className="w-28 h-28 rounded-xl overflow-hidden shadow-md bg-white">
                      <img
                        src={logo}
                        alt={`AI Generated Logo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedLogoIndex === index && (
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Upload Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleUploadLogo}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your Own Logo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Brand Colors Section */}
          <Card className="glass-card hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                Brand Colours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                {personaData.brandColors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div 
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => copyColorToClipboard(color)}
                    />
                    <div className="text-center">
                      <span className="text-xs text-muted-foreground font-mono block">{color}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs mt-1"
                        onClick={() => copyColorToClipboard(color)}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

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
