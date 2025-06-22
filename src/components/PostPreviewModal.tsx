
import { useState } from "react"
import { X, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PostPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  content: string
  platform: string
}

export function PostPreviewModal({ isOpen, onClose, content, platform }: PostPreviewModalProps) {
  const [isPosting, setIsPosting] = useState(false)

  if (!isOpen) return null

  const handleConfirmPost = () => {
    setIsPosting(true)
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false)
      onClose()
      // Show success toast or notification
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-sm mx-4 bg-white shadow-2xl max-h-[90vh] flex flex-col">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b shrink-0">
            <h3 className="font-semibold text-base">Post Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          {/* Instagram Mock Post - Scrollable content */}
          <div className="bg-white flex-1 overflow-y-auto">
            {/* Post Header */}
            <div className="flex items-center justify-between p-3 shrink-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary text-white text-xs">
                    YB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-xs">your_brand</p>
                  <p className="text-xs text-gray-500">Sponsored</p>
                </div>
              </div>
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </div>

            {/* Image Placeholder */}
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-y shrink-0">
              <div className="text-center text-gray-500">
                <div className="w-12 h-12 mx-auto mb-1 bg-white/60 rounded-lg flex items-center justify-center">
                  📸
                </div>
                <p className="text-xs">Generated image</p>
              </div>
            </div>

            {/* Post Actions */}
            <div className="p-3 space-y-2 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5" />
                  <MessageCircle className="h-5 w-5" />
                  <Send className="h-5 w-5" />
                </div>
                <Bookmark className="h-5 w-5" />
              </div>

              <p className="font-semibold text-xs">1,234 likes</p>

              {/* Caption - This section can scroll if content is long */}
              <div className="text-xs leading-relaxed max-h-32 overflow-y-auto">
                <span className="font-semibold">your_brand</span>{" "}
                <span className="whitespace-pre-wrap">{content.length > 120 ? `${content.substring(0, 120)}...` : content}</span>
                {content.length > 120 && <button className="text-gray-500 ml-1">more</button>}
              </div>

              <p className="text-xs text-gray-500">2 HOURS AGO</p>
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="flex gap-2 p-3 border-t bg-gray-50 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="flex-1"
              disabled={isPosting}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleConfirmPost}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isPosting}
            >
              {isPosting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  Posting...
                </div>
              ) : (
                "Confirm Post"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
