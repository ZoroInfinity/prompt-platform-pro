
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md mx-4 bg-white shadow-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-lg">Post Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Instagram Mock Post */}
          <div className="bg-white">
            {/* Post Header */}
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white text-xs">
                    YB
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">your_brand</p>
                  <p className="text-xs text-gray-500">Sponsored</p>
                </div>
              </div>
              <MoreHorizontal className="h-5 w-5 text-gray-600" />
            </div>

            {/* Image Placeholder */}
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-y">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto mb-2 bg-white/60 rounded-lg flex items-center justify-center">
                  📸
                </div>
                <p className="text-sm">Your generated image</p>
              </div>
            </div>

            {/* Post Actions */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <Heart className="h-6 w-6" />
                  <MessageCircle className="h-6 w-6" />
                  <Send className="h-6 w-6" />
                </div>
                <Bookmark className="h-6 w-6" />
              </div>

              <p className="font-semibold text-sm mb-2">1,234 likes</p>

              {/* Caption */}
              <div className="text-sm">
                <span className="font-semibold">your_brand</span>{" "}
                <span className="whitespace-pre-wrap">{content.substring(0, 150)}...</span>
                <button className="text-gray-500 ml-1">more</button>
              </div>

              <p className="text-xs text-gray-500 mt-2">2 HOURS AGO</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 p-4 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isPosting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPost}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isPosting}
            >
              {isPosting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
