
import { useState } from "react"
import { Instagram, Linkedin, X, Edit, Palette, Calendar, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ContentCardProps {
  content: string
  defaultPlatform?: string
}

export function ContentCard({ content, defaultPlatform = "instagram" }: ContentCardProps) {
  const [selectedPlatform, setSelectedPlatform] = useState(defaultPlatform)

  const platformIcons = {
    instagram: Instagram,
    linkedin: Linkedin,
    x: X,
  }

  const platformColors = {
    instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
    linkedin: "bg-blue-600",
    x: "bg-gray-900 dark:bg-gray-100",
  }

  const PlatformIcon = platformIcons[selectedPlatform as keyof typeof platformIcons]

  return (
    <Card className="glass-card animate-fade-in hover:shadow-lg transition-all duration-300 group">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className="w-40 glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="glass-card backdrop-blur-xl bg-white/90 dark:bg-slate-900/90">
              <SelectItem value="instagram">
                <div className="flex items-center">
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </div>
              </SelectItem>
              <SelectItem value="linkedin">
                <div className="flex items-center">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </div>
              </SelectItem>
              <SelectItem value="x">
                <div className="flex items-center">
                  <X className="mr-2 h-4 w-4" />
                  X (Twitter)
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Badge 
            className={`text-white border-0 ${platformColors[selectedPlatform as keyof typeof platformColors]}`}
          >
            <PlatformIcon className="mr-1 h-3 w-3" />
            {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
          </Badge>
        </div>

        <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 border border-white/20 dark:border-slate-700/20">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-200"
        >
          <Edit className="mr-1 h-3 w-3" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-200"
        >
          <Palette className="mr-1 h-3 w-3" />
          Customize
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-200"
        >
          <Calendar className="mr-1 h-3 w-3" />
          Schedule
        </Button>
        <Button 
          size="sm"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 group-hover:animate-glow"
        >
          <Send className="mr-1 h-3 w-3" />
          Post Now
        </Button>
      </CardFooter>
    </Card>
  )
}
