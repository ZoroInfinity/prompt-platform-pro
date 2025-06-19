
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Platform {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const platforms: Platform[] = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-pink-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-600" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-sky-500" },
]

interface PlatformSelectorProps {
  selectedPlatforms: string[]
  onPlatformToggle: (platformId: string) => void
}

export function PlatformSelector({ selectedPlatforms, onPlatformToggle }: PlatformSelectorProps) {
  return (
    <div className="space-y-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="glass border-0 hover:bg-white/30 dark:hover:bg-slate-800/30 w-full justify-between"
          >
            <span>
              {selectedPlatforms.length === 0 
                ? "Select Platforms" 
                : `${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''} selected`
              }
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-card backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 w-full min-w-[200px]">
          {platforms.map((platform) => {
            const isSelected = selectedPlatforms.includes(platform.id)
            const Icon = platform.icon
            
            return (
              <DropdownMenuItem
                key={platform.id}
                onClick={() => onPlatformToggle(platform.id)}
                className={`cursor-pointer ${isSelected ? 'bg-accent' : ''}`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {platform.name}
                {isSelected && <span className="ml-auto text-xs">✓</span>}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedPlatforms.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedPlatforms.map((platformId) => {
            const platform = platforms.find(p => p.id === platformId)
            if (!platform) return null
            
            return (
              <Badge key={platformId} variant="secondary" className="glass">
                {platform.name}
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
