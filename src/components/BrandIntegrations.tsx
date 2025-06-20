
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Plug, Check, X } from "lucide-react"

export function BrandIntegrations() {
  const integrations = [
    {
      name: "Google Drive",
      description: "Sync assets and templates from your Google Drive",
      connected: true,
      icon: "🔗"
    },
    {
      name: "Dropbox",
      description: "Access files and folders from your Dropbox account",
      connected: false,
      icon: "📦"
    },
    {
      name: "Meta Business",
      description: "Connect your Facebook and Instagram business accounts",
      connected: true,
      icon: "📱"
    },
    {
      name: "Slack",
      description: "Get notifications and updates in your Slack workspace",
      connected: false,
      icon: "💬"
    },
    {
      name: "Canva",
      description: "Import designs and templates from Canva",
      connected: false,
      icon: "🎨"
    },
    {
      name: "HubSpot",
      description: "Sync with your CRM and marketing automation",
      connected: true,
      icon: "🚀"
    }
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Integrations</h1>
        <p className="text-muted-foreground">Connect your favorite tools and platforms to streamline your workflow</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {integrations.map((integration, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{integration.icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {integration.connected ? (
                    <div className="flex items-center gap-2 text-green-500">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">Connected</span>
                    </div>
                  ) : (
                    <Button variant="outline" className="glass border-0">
                      <Plug className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                  <Switch checked={integration.connected} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card mt-8">
        <CardHeader>
          <CardTitle>Custom Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Plug className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">Need a custom integration? Contact our support team to discuss your requirements.</p>
            <Button className="bg-primary hover:bg-primary/90">
              Request Integration
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
