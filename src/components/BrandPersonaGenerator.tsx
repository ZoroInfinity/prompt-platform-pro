
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
  Loader2
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

  const handleGeneratePersona = async () => {
    if (!websiteUrl.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call - replace with actual Perplexity API integration
    setTimeout(() => {
      const mockData: PersonaData = {
        brandName: "TechCorp Solutions",
        industry: "Software & Technology",
        targetAudience: "Small to medium businesses looking for digital transformation solutions",
        coreValues: "Innovation, Reliability, Customer Success, Transparency",
        personalityTraits: "Professional, Innovative, Trustworthy, Approachable",
        brandVoice: "Professional yet friendly, knowledgeable, solution-oriented",
        valueProp: "Empowering businesses through cutting-edge technology solutions that drive growth and efficiency",
        keyOfferings: "Cloud Solutions, Software Development, Digital Consulting, IT Support",
        taglines: "\"Innovation Simplified\" • \"Your Digital Partner\" • \"Technology That Works\"",
        reviews: "\"Excellent service and support\" - 4.8/5 stars • \"Transformed our business operations\" - 5/5 stars",
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

      {/* Generated Persona Grid */}
      {personaData && (
        <div className="space-y-6">
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
                        className="min-h-[100px] resize-none"
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {value}
                      </p>
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
