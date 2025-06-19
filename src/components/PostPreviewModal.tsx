
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Instagram, Linkedin, Twitter, MoreHorizontal, Heart, MessageCircle, Share, Send, Check, X } from "lucide-react"

interface PostPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  platform: string
  content: string
  image?: string | null
}

const platformConfig = {
  instagram: {
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    username: "@yourhandle",
    name: "Your Brand"
  },
  linkedin: {
    icon: Linkedin,
    color: "bg-blue-600",
    username: "Your Name",
    name: "Professional Title"
  },
  twitter: {
    icon: Twitter,
    color: "bg-sky-500",
    username: "@yourhandle",
    name: "Your Name"
  }
}

export function PostPreviewModal({ isOpen, onClose, platform, content, image }: PostPreviewModalProps) {
  const config = platformConfig[platform as keyof typeof platformConfig]
  if (!config) return null

  const Icon = config.icon

  const handlePostNow = () => {
    console.log(`Posting to ${platform}:`, content)
    onClose()
  }

  const renderInstagramPreview = () => (
    <div className="bg-white max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center p-3 border-b">
        <Avatar className="h-8 w-8 mr-3">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className={config.color}>YB</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold text-sm">{config.username}</div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-600" />
      </div>
      
      {/* Image */}
      {image && (
        <div className="aspect-square max-h-64">
          <img 
            src={`https://images.unsplash.com/${image}?w=320&h=320&fit=crop`}
            alt="Post content" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Heart className="h-6 w-6" />
            <MessageCircle className="h-6 w-6" />
            <Send className="h-6 w-6" />
          </div>
        </div>
        
        {/* Caption */}
        <div className="text-sm max-h-24 overflow-y-auto">
          <span className="font-semibold mr-2">{config.username}</span>
          <span className="whitespace-pre-wrap text-sm leading-tight">{content.length > 150 ? content.substring(0, 150) + '...' : content}</span>
        </div>
      </div>
    </div>
  )

  const renderLinkedInPreview = () => (
    <div className="bg-white max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg border">
      {/* Header */}
      <div className="flex items-start p-4">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className={config.color}>YN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold text-sm">{config.username}</div>
          <div className="text-xs text-gray-500">{config.name}</div>
          <div className="text-xs text-gray-500">2h • 🌍</div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-gray-600" />
      </div>
      
      {/* Content */}
      <div className="px-4 pb-3">
        <div className="text-sm whitespace-pre-wrap mb-3 max-h-32 overflow-y-auto leading-tight">
          {content.length > 300 ? content.substring(0, 300) + '...' : content}
        </div>
        
        {/* Image */}
        {image && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={`https://images.unsplash.com/${image}?w=420&h=240&fit=crop`}
              alt="Post content" 
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="border-t px-4 py-2">
        <div className="flex items-center justify-around text-gray-600">
          <button className="flex items-center space-x-2 text-sm hover:bg-gray-50 px-2 py-1 rounded text-xs">
            <span>👍</span>
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-sm hover:bg-gray-50 px-2 py-1 rounded text-xs">
            <span>💬</span>
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-sm hover:bg-gray-50 px-2 py-1 rounded text-xs">
            <span>🔄</span>
            <span>Repost</span>
          </button>
          <button className="flex items-center space-x-2 text-sm hover:bg-gray-50 px-2 py-1 rounded text-xs">
            <span>📤</span>
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderTwitterPreview = () => (
    <div className="bg-white max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg border">
      {/* Header */}
      <div className="flex items-start p-4">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className={config.color}>YN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">{config.name}</span>
            <span className="text-gray-500 text-sm">{config.username}</span>
            <span className="text-gray-500 text-sm">• 2h</span>
          </div>
          
          {/* Content */}
          <div className="text-sm mt-2 whitespace-pre-wrap max-h-24 overflow-y-auto leading-tight">
            {content.length > 280 ? content.substring(0, 280) + '...' : content}
          </div>
          
          {/* Image */}
          {image && (
            <div className="rounded-2xl overflow-hidden mt-3">
              <img 
                src={`https://images.unsplash.com/${image}?w=420&h=240&fit=crop`}
                alt="Post content" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center justify-between mt-3 max-w-md text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">24</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500">
              <span className="text-sm">🔄 12</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-red-500">
              <Heart className="h-4 w-4" />
              <span className="text-sm">156</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <Share className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPreview = () => {
    switch (platform) {
      case "instagram":
        return renderInstagramPreview()
      case "linkedin":
        return renderLinkedInPreview()
      case "twitter":
        return renderTwitterPreview()
      default:
        return renderLinkedInPreview()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] max-h-[90vh] p-4 overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Icon className="h-5 w-5" />
            {platform.charAt(0).toUpperCase() + platform.slice(1)} Preview
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          {renderPreview()}
        </div>
        
        <div className="flex justify-center gap-3 pt-3 border-t mt-4">
          <Button onClick={handlePostNow} className="bg-green-600 hover:bg-green-700 text-white">
            <Check className="h-4 w-4 mr-2" />
            Post Now
          </Button>
          <Button onClick={onClose} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
