
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserProfile } from "@/components/UserProfile"
import { ChatInterface } from "@/components/ChatInterface"
import { ContentCreationMode } from "@/components/ContentCreationMode"
import { BrandPersonaMode } from "@/components/BrandPersonaMode"
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
      case "brand-persona":
        return <BrandPersonaMode />
      case "brand-steering-wheel":
        return <BrandSteeringWheel />
      case "brand-voice":
        return <BrandVoice />
      case "asset-manager":
        return <AssetManager />
      case "brand-monitor":
        return <BrandMonitor />
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
      <div className="min-h-screen gradient-bg">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar 
              activeMode={activeMode} 
              onModeChange={setActiveMode}
              onHomeClick={handleHomeClick}
            />
            
            <main className="flex-1 flex flex-col">
              <header className="glass-card border-b backdrop-blur-xl bg-white/25 dark:bg-slate-900/30 sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="glass-card hover:bg-white/30 dark:hover:bg-slate-800/30" />
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserProfile />
                  </div>
                </div>
              </header>

              <div className="flex-1 flex flex-col">
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
