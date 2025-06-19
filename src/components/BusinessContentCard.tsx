
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Edit, Copy, Save, Link } from "lucide-react"

interface BusinessContentCardProps {
  content: string
  documentType: string
  versionLabel?: string
  onContentChange: (content: string) => void
  showCitations?: boolean
}

export function BusinessContentCard({ 
  content, 
  documentType,
  versionLabel = "Version 1",
  onContentChange,
  showCitations = false
}: BusinessContentCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localShowCitations, setLocalShowCitations] = useState(showCitations)

  const sampleCitations = [
    "Harvard Business Review - Content Marketing Strategies (2024)",
    "McKinsey Global Institute - Digital Transformation Report", 
    "Deloitte Business Insights - Leadership in Modern Organizations"
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      console.log("Content copied to clipboard")
    } catch (err) {
      console.error("Failed to copy content:", err)
    }
  }

  const handleSave = () => {
    console.log("Saving content:", content)
  }

  const renderContentWithCitations = (text: string) => {
    if (!localShowCitations) return text

    // Add inline citations to the content
    let citedText = text
    
    // Insert citation markers at strategic points
    citedText = citedText.replace(/business objectives/g, 'business objectives [1]')
    citedText = citedText.replace(/industry best practices/g, 'industry best practices [2]')
    citedText = citedText.replace(/strategic opportunity/g, 'strategic opportunity [3]')
    
    return citedText
  }

  return (
    <Card className="glass-card animate-fade-in shadow-sm w-full max-w-6xl mx-auto">
      <CardHeader className="pb-3 pt-4 px-8">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">
            {versionLabel} • {documentType.charAt(0).toUpperCase() + documentType.slice(1)}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="citations"
              checked={localShowCitations}
              onCheckedChange={setLocalShowCitations}
            />
            <Label htmlFor="citations" className="text-xs">Citations</Label>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50 resize-none min-h-[500px] text-sm leading-relaxed font-serif"
              placeholder="Edit your business content..."
            />
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => setIsEditing(false)}
                className="bg-primary hover:bg-primary/90"
              >
                Save
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsEditing(false)}
                className="glass border-0"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Content Display */}
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-8 shadow-sm border border-border/20 min-h-[500px]">
              <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                <div className="whitespace-pre-wrap text-sm font-serif tracking-wide leading-8 text-gray-800 dark:text-gray-200">
                  {renderContentWithCitations(content)}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="border-t border-border/20 pt-6">
              <div className="flex gap-3 justify-center max-w-2xl mx-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Edit className="h-3 w-3 mr-2" />
                        Edit
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopy}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Copy className="h-3 w-3 mr-2" />
                        Copy
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSave}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Save className="h-3 w-3 mr-2" />
                        Save
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save document</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Link className="h-3 w-3 mr-2" />
                        Citation
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Manage citations</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
