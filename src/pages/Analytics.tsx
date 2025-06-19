
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserProfile } from "@/components/UserProfile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"

const Analytics = () => {
  const performanceData = [
    { month: "Jan", posts: 45, engagement: 8.2, reach: 12000 },
    { month: "Feb", posts: 52, engagement: 9.1, reach: 15000 },
    { month: "Mar", posts: 48, engagement: 7.8, reach: 14500 },
    { month: "Apr", posts: 61, engagement: 10.3, reach: 18200 },
    { month: "May", posts: 55, engagement: 9.7, reach: 16800 },
    { month: "Jun", posts: 63, engagement: 11.2, reach: 20500 },
  ]

  const platformData = [
    { name: "Instagram", value: 45, color: "#E4405F" },
    { name: "LinkedIn", value: 35, color: "#0077B5" },
    { name: "X (Twitter)", value: 20, color: "#1DA1F2" },
  ]

  const metrics = [
    { title: "Total Posts", value: "324", period: "Last 6 months" },
    { title: "Avg. Engagement", value: "9.4%", period: "Up 2.1% from last month" },
    { title: "Total Reach", value: "97.5K", period: "Across all platforms" },
    { title: "Best Performing", value: "LinkedIn", period: "11.2% engagement rate" },
  ]

  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg">
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            
            <main className="flex-1 flex flex-col">
              <header className="glass-card border-b backdrop-blur-xl bg-white/25 dark:bg-slate-900/30 sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="glass-card hover:bg-white/30 dark:hover:bg-slate-800/30" />
                    <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserProfile />
                  </div>
                </div>
              </header>

              <div className="flex-1 p-6">
                <div className="max-w-7xl mx-auto space-y-8">
                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                      <Card key={index} className="glass-card animate-fade-in">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            {metric.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-foreground mb-1">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.period}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="glass-card animate-fade-in">
                      <CardHeader>
                        <CardTitle>Posts & Engagement Over Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={performanceData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Line 
                              type="monotone" 
                              dataKey="posts" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              name="Posts"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="engagement" 
                              stroke="#10b981" 
                              strokeWidth={2}
                              name="Engagement %"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card className="glass-card animate-fade-in">
                      <CardHeader>
                        <CardTitle>Platform Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={platformData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({name, value}) => `${name}: ${value}%`}
                            >
                              {platformData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Reach Chart */}
                  <Card className="glass-card animate-fade-in">
                    <CardHeader>
                      <CardTitle>Reach Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={performanceData}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Bar dataKey="reach" fill="hsl(var(--primary))" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </div>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  )
}

export default Analytics
