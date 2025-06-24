import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserProfile } from "@/components/UserProfile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Trash2 } from "lucide-react"

const ContentHub = () => {
  const [activeTab, setActiveTab] = useState("drafts")
  const [activeMode, setActiveMode] = useState<string>("content-hub")

  const handleModeChange = (mode: string) => {
    // Handle mode changes if needed
    setActiveMode(mode)
  }

  const handleHomeClick = () => {
    // Navigate to home if needed
    window.location.href = "/"
  }

  const drafts = [
    { id: 1, content: "Exciting product launch coming soon! 🚀", platform: "LinkedIn", date: "2024-01-15" },
    { id: 2, content: "Behind the scenes of our latest project ✨", platform: "Instagram", date: "2024-01-14" },
    { id: 3, content: "Tips for better productivity in 2024", platform: "X", date: "2024-01-13" },
  ]

  const scheduled = [
    { id: 1, content: "Monday motivation: Start your week strong! 💪", platform: "LinkedIn", date: "2024-01-22", time: "09:00" },
    { id: 2, content: "New blog post is live! Check it out 📖", platform: "X", date: "2024-01-23", time: "14:30" },
  ]

  const templates = [
    { id: 1, name: "Product Launch", description: "Template for announcing new products", category: "Marketing" },
    { id: 2, name: "Behind the Scenes", description: "Show your team and process", category: "Engagement" },
    { id: 3, name: "Tips & Tricks", description: "Educational content template", category: "Educational" },
  ]

  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar 
              activeMode={activeMode}
              onModeChange={handleModeChange}
              onHomeClick={handleHomeClick}
            />
            
            <main className="flex-1 flex flex-col">
              <header className="glass-card border-b backdrop-blur-xl bg-white/25 dark:bg-slate-900/30 sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="glass-card hover:bg-white/30 dark:hover:bg-slate-800/30" />
                    <h1 className="text-2xl font-bold text-foreground">Content Hub</h1>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserProfile />
                  </div>
                </div>
              </header>

              <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="glass-card">
                      <TabsTrigger value="drafts">Drafts</TabsTrigger>
                      <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                      <TabsTrigger value="templates">Templates</TabsTrigger>
                    </TabsList>

                    <TabsContent value="drafts" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {drafts.map((draft) => (
                          <Card key={draft.id} className="glass-card animate-fade-in">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">{draft.platform}</Badge>
                                <span className="text-sm text-muted-foreground">{draft.date}</span>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm mb-4">{draft.content}</p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="glass border-0">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" className="glass border-0">
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="scheduled" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {scheduled.map((post) => (
                          <Card key={post.id} className="glass-card animate-fade-in">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">{post.platform}</Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {post.date} at {post.time}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm mb-4">{post.content}</p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="glass border-0">
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" className="glass border-0">
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Cancel
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="templates" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {templates.map((template) => (
                          <Card key={template.id} className="glass-card animate-fade-in">
                            <CardHeader>
                              <CardTitle className="text-lg">{template.name}</CardTitle>
                              <Badge variant="secondary">{template.category}</Badge>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                              <Button size="sm" className="w-full">
                                Use Template
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default ContentHub
