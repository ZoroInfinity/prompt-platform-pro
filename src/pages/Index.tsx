import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ChatInterface } from "@/components/ChatInterface"
import { ContentCreationMode } from "@/components/ContentCreationMode"
import { BrandPersonaMode } from "@/components/BrandPersonaMode"
import { BrandPersonaGenerator } from "@/components/BrandPersonaGenerator"
import { ImageFineTuningMode } from "@/components/ImageFineTuningMode"
import { BrandSteeringWheel } from "@/components/BrandSteeringWheel"
import { BrandVoice } from "@/components/BrandVoice"
import { AssetManager } from "@/components/AssetManager"
import { BrandMonitor } from "@/components/BrandMonitor"
import { BrandIntegrations } from "@/components/BrandIntegrations"

const Index = () => {
  const [activeMode, setActiveMode] = useState<string>("quick-post")

  const renderActiveMode = () => {
    switch (activeMode) {
      case "quick-post":
      case "business-writing":
        return <ChatInterface onModeActivation={setActiveMode} activeMode={activeMode} />
      case "content-creation":
        return <ContentCreationMode />
      case "brand-persona-generator":
        return <BrandPersonaGenerator />
      case "brand-steering-wheel":
        return <BrandSteeringWheel />
      case "brand-monitor":
        return <BrandMonitor />
      case "asset-manager":
        return <AssetManager />
      case "brand-integrations":
        return <BrandIntegrations />
      case "image-finetuning":
        return <ImageFineTuningMode />
      default:
        return <ChatInterface onModeActivation={setActiveMode} activeMode={activeMode} />
    }
  }

  const handleHomeClick = () => {
    setActiveMode("quick-post")
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg overflow-hidden">
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full">
            <AppSidebar 
              activeMode={activeMode} 
              onModeChange={setActiveMode}
              onHomeClick={handleHomeClick}
            />
            
            <main className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
                {renderActiveMode()}
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default Index
