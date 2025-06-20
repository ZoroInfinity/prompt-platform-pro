
import { useState } from "react"
import { 
  Home, 
  FolderOpen, 
  Activity, 
  User,
  MessageSquarePlus,
  FileText,
  Edit,
  ChevronDown,
  ChevronRight,
  Settings,
  Palette,
  Briefcase,
  Compass,
  Volume2,
  Archive,
  BarChart3,
  Plug
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface AppSidebarProps {
  activeMode?: string | null
  onModeChange?: (mode: string) => void
  onHomeClick?: () => void
}

const contentCreationItems = [
  { id: "quick-post", title: "Quick Post", icon: MessageSquarePlus },
  { id: "business-writing", title: "Business Writing", icon: FileText },
  { id: "content-creation", title: "Content Creation", icon: Edit },
]

const brandManagementToolsItems = [
  { id: "brand-persona", title: "Brand Persona", icon: User },
  { id: "brand-steering-wheel", title: "Steering Wheel", icon: Compass },
  { id: "brand-voice", title: "Brand Voice", icon: Volume2 },
  { id: "asset-manager", title: "Asset Manager", icon: Archive },
  { id: "brand-monitor", title: "Brand Monitor", icon: BarChart3 },
  { id: "brand-integrations", title: "Integrations", icon: Plug },
  { id: "image-finetuning", title: "Image Fine-Tuning", icon: Palette },
]

export function AppSidebar({ activeMode, onModeChange, onHomeClick }: AppSidebarProps) {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const [contentHubOpen, setContentHubOpen] = useState(true)
  const [brandManagementToolsOpen, setBrandManagementToolsOpen] = useState(true)
  const location = useLocation()

  const getHomeButtonCls = () =>
    `flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 ${
      activeMode === null && location.pathname === "/"
        ? "bg-primary/10 text-primary font-medium shadow-sm" 
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }`

  const getModeButtonCls = (modeId: string) =>
    `w-full justify-start text-sm font-normal transition-all duration-200 ${
      activeMode === modeId
        ? "bg-primary/10 text-primary font-medium"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    }`

  const isAnyContentModeActive = contentCreationItems.some(item => activeMode === item.id)
  const isAnyBrandToolActive = brandManagementToolsItems.some(item => activeMode === item.id)

  return (
    <Sidebar
      className={`glass-card border-r ${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible="icon"
    >
      <div className="p-4">
        {!collapsed && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">AutoText AI</h2>
            <p className="text-sm text-muted-foreground">AI Content Studio</p>
          </div>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/"
                    onClick={onHomeClick}
                    className={getHomeButtonCls()}
                  >
                    <Home className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                    {!collapsed && <span>Home</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/analytics"
                    className="flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <Activity className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                    {!collapsed && <span>Analytics</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/account"
                    className="flex items-center w-full px-3 py-2 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <User className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                    {!collapsed && <span>Account</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            {collapsed ? (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      onClick={() => setContentHubOpen(!contentHubOpen)}
                      className={`w-full justify-center p-3 ${
                        isAnyContentModeActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      title="Content Creation Hub"
                    >
                      <FolderOpen className="h-5 w-5" />
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ) : (
              <Collapsible open={contentHubOpen} onOpenChange={setContentHubOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-3 py-2 h-auto font-medium text-sm"
                  >
                    <div className="flex items-center">
                      <FolderOpen className="h-5 w-5 mr-3" />
                      Content Creation Hub
                    </div>
                    {contentHubOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-2">
                  {contentCreationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => onModeChange?.(item.id)}
                        className={getModeButtonCls(item.id)}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.title}
                      </Button>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            {collapsed ? (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button
                      variant="ghost"
                      onClick={() => setBrandManagementToolsOpen(!brandManagementToolsOpen)}
                      className={`w-full justify-center p-3 ${
                        isAnyBrandToolActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                      title="Brand Management Tools"
                    >
                      <Briefcase className="h-5 w-5" />
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ) : (
              <Collapsible open={brandManagementToolsOpen} onOpenChange={setBrandManagementToolsOpen}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-3 py-2 h-auto font-medium text-sm"
                  >
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 mr-3" />
                      Brand Management Tools
                    </div>
                    {brandManagementToolsOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mt-2">
                  {brandManagementToolsItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => onModeChange?.(item.id)}
                        className={getModeButtonCls(item.id)}
                      >
                        <Icon className="h-4 w-4 mr-3" />
                        {item.title}
                      </Button>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
