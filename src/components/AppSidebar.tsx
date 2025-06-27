import { useState, useEffect } from "react"
import { Calendar, Home, Inbox, Search, Settings, ChevronUp, User2, Building2, PenTool, Image, BarChart3, Archive, TrendingUp, Compass, Target, Eye, Lightbulb, Users, MessageSquare, Grid3X3 } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AppSidebarProps {
  activeMode: string
  onModeChange: (mode: string) => void
  onHomeClick: () => void
}

export function AppSidebar({ activeMode, onModeChange, onHomeClick }: AppSidebarProps) {
  const { isMobile } = useSidebar()
  const [isHovered, setIsHovered] = useState(false)

  // AI Content Creation items
  const contentItems = [
    {
      title: "Quick Post",
      icon: PenTool,
      mode: "quick-post"
    },
    {
      title: "Business Writing",
      icon: Building2,
      mode: "business-writing"
    },
    {
      title: "Content Creation",
      icon: Image,
      mode: "content-creation"
    },
    {
      title: "Image Fine-tuning",
      icon: Image,
      mode: "image-finetuning"
    }
  ]

  // Brand Management Tools - updated to include SWOT Analysis
  const brandItems = [
    {
      title: "Brand Persona",
      icon: User2,
      mode: "brand-persona-generator"
    },
    {
      title: "Brand Steering Wheel",
      icon: Compass,
      mode: "brand-steering-wheel"
    },
    {
      title: "SWOT Analysis",
      icon: Grid3X3,
      mode: "swot-analysis"
    },
    {
      title: "Brand Monitor",
      icon: BarChart3,
      mode: "brand-monitor"
    },
    {
      title: "Asset Manager",
      icon: Archive,
      mode: "asset-manager"
    },
    {
      title: "Competitor Analysis",
      icon: TrendingUp,
      mode: "competitor-analysis"
    }
  ]

  const handleItemClick = (mode: string) => {
    if (mode === "home") {
      onHomeClick()
    } else {
      onModeChange(mode)
    }
  }

  return (
    <div 
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-250 ease-in-out z-40 shadow-sm ${
        isHovered ? 'w-64' : 'w-16'
      } ${isMobile ? 'hidden' : 'block'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-2">
          <div 
            onClick={() => handleItemClick("home")}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
              activeMode === "quick-post" ? "bg-sky-50 text-sky-600" : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
              <Home className="w-5 h-5 transition-colors duration-200 ease-in-out" />
            </div>
            <div className={`transition-all duration-250 ease-in-out ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
              <div className="font-semibold text-sm whitespace-nowrap">Home</div>
              <div className="text-xs text-gray-500 whitespace-nowrap">Quick Post</div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* AI Content Creation */}
          <div className="p-2">
            <div className={`px-2 py-1 text-xs font-medium text-gray-500 transition-all duration-250 ease-in-out ${
              isHovered ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
            }`}>
              AI Content Creation
            </div>
            <div className="space-y-1 mt-1">
              {contentItems.map((item) => (
                <div 
                  key={item.mode}
                  onClick={() => handleItemClick(item.mode)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
                    activeMode === item.mode ? "bg-sky-50 text-sky-600" : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 transition-colors duration-200 ease-in-out" />
                  <span className={`text-sm transition-all duration-250 ease-in-out whitespace-nowrap ${
                    isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                  }`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Brand Management Tools */}
          <div className="p-2 mt-4">
            <div className={`px-2 py-1 text-xs font-medium text-gray-500 transition-all duration-250 ease-in-out ${
              isHovered ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden'
            }`}>
              Brand Management Tools
            </div>
            <div className="space-y-1 mt-1">
              {brandItems.map((item) => (
                <div 
                  key={item.mode}
                  onClick={() => handleItemClick(item.mode)}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
                    activeMode === item.mode ? "bg-sky-50 text-sky-600" : "text-gray-600 hover:text-sky-600 hover:bg-sky-50"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0 transition-colors duration-200 ease-in-out" />
                  <span className={`text-sm transition-all duration-250 ease-in-out whitespace-nowrap ${
                    isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                  }`}>
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out text-gray-600 hover:text-sky-600 hover:bg-sky-50`}>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <User2 className="w-4 h-4" />
                </div>
                <div className={`transition-all duration-250 ease-in-out ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                  <div className="font-semibold text-sm whitespace-nowrap">User</div>
                  <div className="text-xs text-gray-500 whitespace-nowrap">user@example.com</div>
                </div>
                <ChevronUp className={`w-4 h-4 ml-auto transition-all duration-250 ease-in-out ${
                  isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'
                }`} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
