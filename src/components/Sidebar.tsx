
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  BarChart3, 
  User, 
  PenTool,
  ChevronDown,
  ChevronRight
} from "lucide-react"

interface SidebarProps {
  activeMode: string
  onModeChange: (mode: string) => void
  onHomeClick: () => void
}

export function Sidebar({ activeMode, onModeChange, onHomeClick }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["content"])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const mainSections = [
    {
      id: "content",
      label: "Content Creation Hub",
      icon: PenTool,
      children: [
        { id: "quick-post", label: "Quick Post" },
        { id: "business-writing", label: "Business Writing" },
        { id: "content-writing", label: "Content Writing" }
      ]
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      children: []
    },
    {
      id: "account",
      label: "Account",
      icon: User,
      children: []
    }
  ]

  return (
    <div className="w-64 h-full glass-card border-r flex flex-col">
      <div className="p-6">
        <Button
          onClick={onHomeClick}
          variant="ghost"
          className="w-full justify-start text-lg font-semibold hover:bg-white/20"
        >
          AutoText AI
        </Button>
      </div>

      <Separator className="mx-4" />

      <nav className="flex-1 p-4 space-y-2">
        {mainSections.map((section) => {
          const Icon = section.icon
          const isExpanded = expandedSections.includes(section.id)
          const hasChildren = section.children.length > 0

          return (
            <div key={section.id} className="space-y-1">
              <Button
                variant="ghost"
                onClick={() => {
                  if (hasChildren) {
                    toggleSection(section.id)
                  } else {
                    onModeChange(section.id)
                  }
                }}
                className={cn(
                  "w-full justify-start gap-3 hover:bg-white/20",
                  activeMode === section.id && "bg-white/20"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{section.label}</span>
                {hasChildren && (
                  isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {hasChildren && isExpanded && (
                <div className="ml-6 space-y-1">
                  {section.children.map((child) => (
                    <Button
                      key={child.id}
                      variant="ghost"
                      onClick={() => onModeChange(child.id)}
                      className={cn(
                        "w-full justify-start text-sm hover:bg-white/20",
                        activeMode === child.id && "bg-white/20 text-primary"
                      )}
                    >
                      {child.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
