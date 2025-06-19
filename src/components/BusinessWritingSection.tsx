
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FileText, Mail, Presentation, MessageSquare } from "lucide-react"

export function BusinessWritingSection() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [prompt, setPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")

  const templates = [
    { id: "email", name: "Email", icon: Mail, description: "Professional emails and responses" },
    { id: "proposal", name: "Proposal", icon: FileText, description: "Business proposals and pitches" },
    { id: "presentation", name: "Presentation", icon: Presentation, description: "Slide content and scripts" },
    { id: "report", name: "Report", icon: MessageSquare, description: "Business reports and summaries" },
  ]

  const handleGenerate = () => {
    // Simulate content generation
    const sampleContent = `Generated ${selectedTemplate} content based on: "${prompt}"\n\nThis is a professional business document that maintains formal tone and structure appropriate for corporate communication.`
    setGeneratedContent(sampleContent)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Business Writing Assistant</h2>
        <p className="text-muted-foreground mb-6">Create professional business documents with AI assistance.</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Select Document Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {templates.map((template) => {
                const Icon = template.icon
                return (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedTemplate === template.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <h3 className="font-medium text-sm">{template.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Describe what you need</label>
            <Textarea
              placeholder="Describe the content you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50"
              rows={3}
            />
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={!selectedTemplate || !prompt.trim()}
            className="w-full"
          >
            Generate Business Content
          </Button>
        </div>
      </div>

      {generatedContent && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Generated Content
              <Badge variant="secondary">{selectedTemplate}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={generatedContent}
              onChange={(e) => setGeneratedContent(e.target.value)}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[200px]"
            />
            <div className="flex gap-2 mt-4">
              <Button size="sm">Save as Draft</Button>
              <Button size="sm" variant="outline">Export</Button>
              <Button size="sm" variant="outline">Copy</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
