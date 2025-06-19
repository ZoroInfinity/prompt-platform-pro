
import { useState, useRef, useEffect } from "react"
import { Check, X, Image as ImageIcon, Mail, FileText, Edit, Instagram, Linkedin, Twitter, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

interface FeatureTrayProps {
  mode: string
  isOpen: boolean
  onClose: () => void
  position: { x: number; y: number }
  onConfigChange: (config: any) => void
  currentConfig: any
}

const platforms = [
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
  { id: "instagram", label: "Instagram", icon: Instagram },
  { id: "twitter", label: "Twitter", icon: Twitter },
  { id: "facebook", label: "Facebook", icon: Facebook }
]

const businessTypes = [
  { id: "email", label: "Email", icon: Mail },
  { id: "memo", label: "Memo", icon: FileText },
  { id: "proposal", label: "Proposal", icon: Edit },
  { id: "report", label: "Report", icon: FileText }
]

const contentFormats = [
  { id: "blog-intro", label: "Blog Intro", icon: Edit },
  { id: "newsletter", label: "Newsletter", icon: Mail },
  { id: "ad-copy", label: "Ad Copy", icon: FileText },
  { id: "social-caption", label: "Social Caption", icon: Instagram }
]

export function FeatureTray({ mode, isOpen, onClose, position, onConfigChange, currentConfig }: FeatureTrayProps) {
  const trayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (trayRef.current && !trayRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePlatformToggle = (platformId: string) => {
    const newPlatforms = currentConfig.platforms?.includes(platformId)
      ? currentConfig.platforms.filter((p: string) => p !== platformId)
      : [...(currentConfig.platforms || []), platformId]
    
    onConfigChange({ ...currentConfig, platforms: newPlatforms })
  }

  const renderQuickPostTray = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2 text-foreground">Platform Selection</h4>
        <div className="space-y-2">
          {platforms.map((platform) => {
            const Icon = platform.icon
            return (
              <div key={platform.id} className="flex items-center space-x-2">
                <Checkbox
                  id={platform.id}
                  checked={currentConfig.platforms?.includes(platform.id)}
                  onCheckedChange={() => handlePlatformToggle(platform.id)}
                />
                <Icon className="h-4 w-4 text-muted-foreground" />
                <label htmlFor={platform.id} className="text-sm cursor-pointer">
                  {platform.label}
                </label>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Auto-generate image</span>
        </div>
        <Switch
          checked={currentConfig.autoImage || false}
          onCheckedChange={(checked) => onConfigChange({ ...currentConfig, autoImage: checked })}
        />
      </div>
    </div>
  )

  const renderBusinessWritingTray = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2 text-foreground">Content Type</h4>
        <RadioGroup
          value={currentConfig.businessType || "email"}
          onValueChange={(value) => onConfigChange({ ...currentConfig, businessType: value })}
        >
          {businessTypes.map((type) => {
            const Icon = type.icon
            return (
              <div key={type.id} className="flex items-center space-x-2">
                <RadioGroupItem value={type.id} id={type.id} />
                <Icon className="h-4 w-4 text-muted-foreground" />
                <label htmlFor={type.id} className="text-sm cursor-pointer">
                  {type.label}
                </label>
              </div>
            )
          })}
        </RadioGroup>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Show citations</span>
        </div>
        <Switch
          checked={currentConfig.showCitations || false}
          onCheckedChange={(checked) => onConfigChange({ ...currentConfig, showCitations: checked })}
        />
      </div>
    </div>
  )

  const renderContentCreationTray = () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2 text-foreground">Content Format</h4>
        <RadioGroup
          value={currentConfig.contentFormat || "blog-intro"}
          onValueChange={(value) => onConfigChange({ ...currentConfig, contentFormat: value })}
        >
          {contentFormats.map((format) => {
            const Icon = format.icon
            return (
              <div key={format.id} className="flex items-center space-x-2">
                <RadioGroupItem value={format.id} id={format.id} />
                <Icon className="h-4 w-4 text-muted-foreground" />
                <label htmlFor={format.id} className="text-sm cursor-pointer">
                  {format.label}
                </label>
              </div>
            )
          })}
        </RadioGroup>
      </div>
    </div>
  )

  const renderTrayContent = () => {
    switch (mode) {
      case "quick-post":
        return renderQuickPostTray()
      case "business-writing":
        return renderBusinessWritingTray()
      case "content-creation":
        return renderContentCreationTray()
      default:
        return null
    }
  }

  return (
    <div
      ref={trayRef}
      className="fixed z-50 glass-card border backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 rounded-lg p-4 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
      style={{
        left: position.x,
        top: position.y,
        minWidth: '250px',
        maxWidth: '300px'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground capitalize">
          {mode.replace('-', ' ')} Options
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-6 w-6 p-0 hover:bg-muted"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      {renderTrayContent()}
    </div>
  )
}
