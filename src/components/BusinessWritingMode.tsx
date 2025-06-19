
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { FileText, Mail, Presentation, MessageSquare, Send, Copy, Save, Edit, Link } from "lucide-react"

export function BusinessWritingMode() {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [input, setInput] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [showCitations, setShowCitations] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const templates = [
    { id: "email", name: "Email", icon: Mail, description: "Professional emails and responses" },
    { id: "proposal", name: "Proposal", icon: FileText, description: "Business proposals and pitches" },
    { id: "presentation", name: "Presentation", icon: Presentation, description: "Slide content and scripts" },
    { id: "report", name: "Report", icon: MessageSquare, description: "Business reports and summaries" },
  ]

  const sampleCitations = [
    "Harvard Business Review - Content Marketing Strategies (2024)",
    "McKinsey Global Institute - Digital Transformation Report",
    "Deloitte Business Insights - Leadership in Modern Organizations"
  ]

  const handleGenerate = () => {
    if (!selectedTemplate || !input.trim()) return

    setIsGenerating(true)
    
    setTimeout(() => {
      const sampleContent = `**${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Content**

Based on your request: "${input}"

This is a professionally crafted ${selectedTemplate} that maintains formal tone and structure appropriate for corporate communication. The content has been optimized for clarity, impact, and business effectiveness.

**Key Points:**
• Strategic alignment with business objectives
• Clear and actionable recommendations
• Professional formatting and structure
• Evidence-based insights and analysis

**Conclusion:**
This ${selectedTemplate} provides a comprehensive framework for addressing the specified requirements while maintaining the highest standards of professional communication.

**Implementation Strategy:**
The proposed approach leverages industry best practices and proven methodologies to ensure maximum effectiveness and stakeholder buy-in. Key success factors include clear communication protocols, well-defined timelines, and measurable outcomes that align with organizational objectives.

**Next Steps:**
1. Review and approve the outlined strategy
2. Establish clear timelines and milestones
3. Assign responsible parties and resources
4. Implement monitoring and evaluation processes
5. Schedule regular progress reviews and adjustments`
      
      setGeneratedContent(sampleContent)
      setIsGenerating(false)
      setInput("")
    }, 2000)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent)
      console.log("Content copied to clipboard")
    } catch (err) {
      console.error("Failed to copy content:", err)
    }
  }

  const handleSave = () => {
    console.log("Saving content:", generatedContent)
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-2">
      {/* Input Section */}
      <div className="glass-card p-6 mb-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Business Writing Assistant</h2>
          <p className="text-muted-foreground">Create professional business documents with AI assistance</p>
        </div>
        
        <div className="space-y-6">
          {/* Template Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Select Document Type</label>
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

          {/* Input Section */}
          <div className="flex gap-4">
            <Textarea
              placeholder="Describe the business content you need..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleGenerate()}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50 flex-1 min-h-[80px] max-h-[120px] resize-none"
              rows={3}
            />
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating || !selectedTemplate || !input.trim()}
              className="bg-primary hover:bg-primary/90 self-start px-6 py-3"
            >
              {isGenerating ? (
                "Generating..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between glass-card p-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="glass capitalize">
                {selectedTemplate}
              </Badge>
              <div className="flex items-center space-x-2">
                <Switch
                  id="citations"
                  checked={showCitations}
                  onCheckedChange={setShowCitations}
                />
                <Label htmlFor="citations" className="text-sm">Show Citations</Label>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <Card className="glass-card">
            <CardContent className="p-8">
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[400px] text-sm leading-relaxed font-serif resize-none"
                    placeholder="Your generated content will appear here..."
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setIsEditing(false)} className="bg-primary hover:bg-primary/90">
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="glass border-0">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-6 shadow-sm border border-border/20">
                    <div className="prose prose-sm max-w-none text-foreground leading-relaxed font-serif">
                      <div className="whitespace-pre-wrap text-sm">
                        {generatedContent}
                      </div>
                    </div>
                  </div>

                  {/* Citations */}
                  {showCitations && (
                    <div className="mt-6 pt-4 border-t border-border/20">
                      <h4 className="text-sm font-medium text-foreground mb-3">Citations & References</h4>
                      <div className="space-y-2">
                        {sampleCitations.map((citation, index) => (
                          <div key={index} className="text-xs text-muted-foreground bg-muted/20 rounded px-3 py-2">
                            {index + 1}. {citation}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="border-t border-border/20 pt-4">
                    <div className="flex gap-2 justify-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopy}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSave}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      {showCitations && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                        >
                          <Link className="h-4 w-4 mr-1" />
                          Citation
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
