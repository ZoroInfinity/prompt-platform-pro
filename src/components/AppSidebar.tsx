
import { useState, useEffect } from "react"
import { Calendar, Home, Inbox, Search, Settings, ChevronUp, User2, Building2, PenTool, Image, BarChart3, Archive, Plug, Compass, Target, Eye, Lightbulb, Users, MessageSquare } from "lucide-react"

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

  // Brand Management Tools - exactly 5 tools
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
      title: "Integrations",
      icon: Plug,
      mode: "brand-integrations"
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
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              onClick={() => handleItemClick("home")}
              className={activeMode === "quick-post" ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Home className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Home</span>
                <span className="truncate text-xs">Quick Post</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Content Creation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentItems.map((item) => (
                <SidebarMenuItem key={item.mode}>
                  <SidebarMenuButton 
                    onClick={() => handleItemClick(item.mode)}
                    className={activeMode === item.mode ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Brand Management Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {brandItems.map((item) => (
                <SidebarMenuItem key={item.mode}>
                  <SidebarMenuButton 
                    onClick={() => handleItemClick(item.mode)}
                    className={activeMode === item.mode ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">User</span>
                    <span className="truncate text-xs">user@example.com</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
