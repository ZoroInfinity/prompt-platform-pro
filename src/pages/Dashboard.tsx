import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserProfile } from "@/components/UserProfile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Dashboard = () => {
  const [activeMode, setActiveMode] = useState<string>("dashboard")

  const handleModeChange = (mode: string) => {
    // Handle mode changes if needed
    setActiveMode(mode)
  }

  const handleHomeClick = () => {
    // Navigate to home if needed
    window.location.href = "/"
  }

  const summaryData = [
    { title: "Posts Made", value: "142", change: "+12%" },
    { title: "Total Reach", value: "24.5K", change: "+8%" },
    { title: "Engagement Rate", value: "6.8%", change: "+2.1%" },
    { title: "Scheduled Posts", value: "18", change: "+5" },
  ]

  const chartData = [
    { name: "Mon", posts: 4, engagement: 6.2 },
    { name: "Tue", posts: 6, engagement: 7.1 },
    { name: "Wed", posts: 3, engagement: 5.8 },
    { name: "Thu", posts: 8, engagement: 8.2 },
    { name: "Fri", posts: 5, engagement: 6.9 },
    { name: "Sat", posts: 7, engagement: 7.5 },
    { name: "Sun", posts: 4, engagement: 6.4 },
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
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserProfile />
                  </div>
                </div>
              </header>

              <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {summaryData.map((item, index) => (
                      <Card key={index} className="glass-card animate-fade-in">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-foreground">
                              {item.value}
                            </div>
                            <div className="text-sm font-medium text-green-600">
                              {item.change}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="glass-card animate-fade-in">
                      <CardHeader>
                        <CardTitle>Posts This Week</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="posts" fill="hsl(var(--primary))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="glass-card animate-fade-in">
                      <CardHeader>
                        <CardTitle>Engagement Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Line 
                              type="monotone" 
                              dataKey="engagement" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default Dashboard
