
import { useState } from "react"
import { Send, MessageSquarePlus, FileText, Palette, Wand2, Sparkles, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ContentCard } from "@/components/ContentCard"
import { Badge } from "@/components/ui/badge"

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

  const featureIcons = [
    { icon: MessageSquarePlus, label: "Quick Post" },
    { icon: FileText, label: "Article" },
    { icon: Palette, label: "Visual" },
    { icon: Wand2, label: "Style" },
    { icon: Sparkles, label: "Creative" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isGenerating) return

    setIsGenerating(true)
    
    setTimeout(() => {
      const sampleContent = `🚀 Ready to transform your business? Here's how automation can revolutionize your workflow:

✨ Save 20+ hours per week
📈 Increase productivity by 300%
🎯 Focus on what truly matters
💡 Let AI handle the repetitive tasks

Join thousands of entrepreneurs who've already made the switch! 

#Automation #BusinessGrowth #Productivity #AI #Entrepreneur`
      
      setGeneratedContent(sampleContent)
      setIsGenerating(false)
    }, 2000)
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

          <Card className="glass-card">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="What would you like to create today?"
                  className={`resize-none transition-all duration-300 ${
                    isLandingState ? "min-h-[80px]" : "min-h-[50px]"
                  }`}
                  rows={isLandingState ? 3 : 2}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {featureIcons.map((feature, index) => {
                      const IconComponent = feature.icon
                      return (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="h-8 w-8 p-0 hover:bg-primary/10"
                        >
                          <IconComponent className="h-4 w-4" />
                        </Button>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                        <SelectItem value="claude-3">Claude 3</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      type="submit" 
                      size="sm"
                      disabled={!input.trim() || isGenerating}
                      className="h-8 w-8 p-0"
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
                {/* Content Card */}
                <div className="space-y-4">
                  <ContentCard content={generatedContent} />
                  
                  {/* Content Action Buttons */}
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Text
                    </Button>
                    <Button size="sm" className="flex-1">
                      Post Now
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>

                {/* Image Card */}
                {showImage && (
                  <div className="space-y-4">
                    <Card className="glass-card">
                      <CardContent className="p-6">
                        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center text-muted-foreground">
                            <Palette className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Generated Image</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Image Action Buttons */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={handleEditImage}
                        >
                          Edit Image
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={handleUploadImage}
                        >
                          Upload Image
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
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
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
