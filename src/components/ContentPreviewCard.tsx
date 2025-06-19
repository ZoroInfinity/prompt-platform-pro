
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Edit, Send, Settings, X } from "lucide-react"

interface ContentPreviewCardProps {
  platform: string
  content: string
  image: string | null
  onEdit: () => void
  onContentChange: (content: string) => void
  onImageChange?: (imageId: string) => void
  onRemoveImage?: () => void
  onPostNow: () => void
  versionLabel?: string
  isCompact?: boolean
}

export function ContentPreviewCard({ 
  platform, 
  content, 
  image, 
  onEdit, 
  onContentChange,
  onImageChange,
  onRemoveImage,
  onPostNow,
  versionLabel = "Version 1",
  isCompact = false
}: ContentPreviewCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleAdvanced = () => {
    console.log(`Advanced options for ${platform}:`, content)
    // Advanced options logic here
  }

  return (
    <Card className="glass-card animate-fade-in shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-muted-foreground">
            {versionLabel}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 px-4 pb-4 flex flex-col flex-1">
        {isEditing ? (
          <div className="space-y-3 flex-1 flex flex-col">
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50 resize-none flex-1"
              placeholder="Edit your post content..."
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
          <div className="flex flex-col flex-1">
            <div className="flex-1 flex flex-col mb-4">
              <div className="flex-1 overflow-y-auto">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {content}
                </p>
              </div>
            </div>
            
            {/* Action Bar - Always at bottom */}
            <div className="border-t border-border/20 pt-3 mt-auto">
              <div className="flex gap-2 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit Text
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit post content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        onClick={onPostNow}
                        className="bg-primary hover:bg-primary/90 flex-1"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Post Now
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Preview and post</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleAdvanced}
                        className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 flex-1"
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Advanced
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Advanced options</p>
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
