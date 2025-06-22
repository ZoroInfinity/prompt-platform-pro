
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Edit2, Copy, Download, RotateCw } from "lucide-react"

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
  const [editableContent, setEditableContent] = useState(content)
  const [localShowCitations, setLocalShowCitations] = useState(showCitations)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      console.log("Content copied to clipboard")
    } catch (err) {
      console.error("Failed to copy content:", err)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${documentType}-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleRegenerate = () => {
    console.log("Regenerating content...")
  }

  const handleSaveEdit = () => {
    onContentChange(editableContent)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditableContent(content)
    setIsEditing(false)
  }

  const renderContentWithCitations = (text: string) => {
    if (!localShowCitations) {
      return text.replace(/\[(\d+)\]/g, '')
    }
    return text
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="glass-card shadow-lg h-[600px] flex flex-col">
        <CardHeader className="pb-3 pt-4 px-6">
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
        
        <CardContent className="px-6 flex-1 flex flex-col">
          {isEditing ? (
            <div className="flex flex-col flex-1">
              <Textarea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="flex-1 resize-none border border-gray-200 rounded-lg p-4 bg-white/70 text-sm leading-relaxed font-serif"
                placeholder="Edit your business content..."
              />
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  onClick={handleSaveEdit}
                  className="bg-primary hover:bg-primary/90"
                >
                  Save
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleCancelEdit}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white/70 rounded-lg p-6 border border-gray-100 flex-1 overflow-y-auto">
              <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                <div className="whitespace-pre-wrap text-sm font-serif tracking-wide leading-7 text-gray-800 dark:text-gray-200">
                  {renderContentWithCitations(content)}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Action Bar - Fixed at bottom */}
        <div className="flex gap-2 px-6 pb-6 pt-0 mt-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                  disabled={isEditing}
                >
                  <Edit2 className="h-3 w-3 mr-2" />
                  Edit Text
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
                  className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
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
                  onClick={handleDownload}
                  className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                >
                  <Download className="h-3 w-3 mr-2" />
                  Download
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download as .txt</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleRegenerate}
                  className="flex-1 border-gray-200 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                >
                  <RotateCw className="h-3 w-3 mr-2" />
                  Regenerate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate new version</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  )
}
