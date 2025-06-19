
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserProfile } from "@/components/UserProfile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Account = () => {
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
                    <h1 className="text-2xl font-bold text-foreground">Account</h1>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserProfile />
                  </div>
                </div>
              </header>

              <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Profile Section */}
                  <Card className="glass-card animate-fade-in">
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="/placeholder.svg" alt="Profile" />
                          <AvatarFallback className="text-lg">JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="glass border-0">
                            Change Avatar
                          </Button>
                          <p className="text-sm text-muted-foreground">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" value="John" className="glass border-0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" value="Doe" className="glass border-0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value="john@autotext.ai" className="glass border-0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input id="company" value="AutoText AI" className="glass border-0" />
                        </div>
                      </div>
                      
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  {/* Plan Information */}
                  <Card className="glass-card animate-fade-in">
                    <CardHeader>
                      <CardTitle>Subscription Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">Pro Plan</h3>
                            <Badge>Active</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Unlimited posts, advanced analytics, priority support
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">$29/month</div>
                          <div className="text-sm text-muted-foreground">Next billing: Jan 28, 2024</div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex gap-2">
                        <Button variant="outline" className="glass border-0">
                          Change Plan
                        </Button>
                        <Button variant="outline" className="glass border-0">
                          Billing History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Usage Stats */}
                  <Card className="glass-card animate-fade-in">
                    <CardHeader>
                      <CardTitle>Usage This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary">142</div>
                          <div className="text-sm text-muted-foreground">Posts Generated</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary">24.5K</div>
                          <div className="text-sm text-muted-foreground">Total Reach</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-2xl font-bold text-primary">18</div>
                          <div className="text-sm text-muted-foreground">Scheduled Posts</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="glass-card animate-fade-in border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">Delete Account</h3>
                          <p className="text-sm text-muted-foreground">
                            Permanently delete your account and all associated data
                          </p>
                        </div>
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                      </div>
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

export default Account
