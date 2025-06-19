
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, Copy, Send, Hash, FileText, Megaphone, Image } from "lucide-react"

export function ContentCreationMode() {
  const [selectedType, setSelectedType] = useState("")
  const [prompt, setPrompt] = useState("")
  const [generatedContents, setGeneratedContents] = useState<Array<{
    type: string
    title: string
    content: string
    hasImage?: boolean
  }>>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const contentTypes = [
    { id: "tagline", name: "Taglines", icon: Hash, description: "Catchy brand taglines" },
    { id: "blog", name: "Blog Posts", icon: FileText, description: "Blog content and articles" },
    { id: "campaign", name: "Campaign Copy", icon: Megaphone, description: "Marketing campaigns" },
    { id: "captions", name: "Image Captions", icon: Image, description: "Social media captions" },
  ]

  const handleGenerate = () => {
    if (!selectedType || !prompt.trim()) return

    setIsGenerating(true)
    
    setTimeout(() => {
      const sampleContents = {
        tagline: [
          { type: "tagline", title: "Primary Tagline", content: "Innovation meets simplicity.", hasImage: false },
          { type: "tagline", title: "Alternative 1", content: "Where ideas come to life.", hasImage: false },
          { type: "tagline", title: "Alternative 2", content: "Creating tomorrow, today.", hasImage: false },
        ],
        blog: [
          { 
            type: "blog", 
            title: "Blog Post Draft", 
            content: `# ${prompt}\n\n## Introduction\n\nThis comprehensive guide explores the key aspects of ${prompt.toLowerCase()}, providing valuable insights and actionable strategies.\n\n## Key Points\n\n• Strategic approach to implementation\n• Best practices and industry standards\n• Measurable outcomes and success metrics\n\n## Conclusion\n\nBy following these guidelines, you can achieve significant results in your ${prompt.toLowerCase()} initiatives.`,
            hasImage: true 
          },
        ],
        campaign: [
          { 
            type: "campaign", 
            title: "Campaign Concept", 
            content: `**Campaign Theme:** ${prompt}\n\n**Key Message:** Transform your experience with innovative solutions.\n\n**Call to Action:** Join thousands who have already discovered the difference.\n\n**Target Audience:** Progressive professionals seeking excellence.`,
            hasImage: true 
          },
        ],
        captions: [
          { type: "captions", title: "Instagram Caption", content: `✨ ${prompt} ✨\n\nCapturing moments that matter. Every detail tells a story.\n\n#Innovation #Quality #Excellence #Lifestyle`, hasImage: true },
          { type: "captions", title: "LinkedIn Caption", content: `Professional insight on ${prompt}:\n\nKey takeaways for industry leaders looking to drive meaningful change and sustainable growth.\n\n#Leadership #Business #Growth`, hasImage: true },
        ],
      }
      
      setGeneratedContents(sampleContents[selectedType as keyof typeof sampleContents] || [])
      setIsGenerating(false)
    }, 2000)
  }

  const handleEdit = (index: number, newContent: string) => {
    setGeneratedContents(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, content: newContent } : item
      )
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="glass-card p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Content Creation Studio</h2>
          <p className="text-muted-foreground">Generate taglines, blogs, campaigns, and more</p>
        </div>
        
        <div className="space-y-6">
          {/* Content Type Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Select Content Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {contentTypes.map((type) => {
                const Icon = type.icon
                return (
                  <Card 
                    key={type.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedType === type.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-medium text-sm">{type.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{type.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Input Section */}
          <div className="flex gap-4">
            <Input
              placeholder="Describe the content you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50 flex-1"
            />
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !selectedType || !prompt.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {isGenerating ? (
                "Creating..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Create
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Generated Content Cards */}
      {generatedContents.length > 0 && (
        <div className="grid gap-4">
          {generatedContents.map((content, index) => (
            <Card key={index} className="glass-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{content.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="glass">
                      {content.type}
                    </Badge>
                    {content.hasImage && (
                      <Badge variant="outline" className="glass border-0">
                        <Image className="h-3 w-3 mr-1" />
                        Image
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={content.content}
                  onChange={(e) => handleEdit(index, e.target.value)}
                  className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[120px] text-sm leading-relaxed"
                />
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="glass border-0">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-0">
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" className="glass border-0">
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
