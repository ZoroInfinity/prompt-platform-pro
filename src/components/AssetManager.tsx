
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Archive, Upload, Image, FileText, Palette, Download } from "lucide-react"

export function AssetManager() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Asset Manager</h1>
        <p className="text-muted-foreground">Organize and manage your brand assets, logos, templates, and creative resources</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Logos & Images
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">No logos uploaded yet</p>
              <Button variant="outline" className="glass border-0">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
              <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">No templates uploaded yet</p>
              <Button variant="outline" className="glass border-0">
                <Upload className="h-4 w-4 mr-2" />
                Upload Templates
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Brand Colors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                <span className="text-sm">#3B82F6 - Primary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-600"></div>
                <span className="text-sm">#475569 - Secondary</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <span className="text-sm">#10B981 - Accent</span>
              </div>
            </div>
            <Button variant="outline" className="glass border-0 w-full">
              <Palette className="h-4 w-4 mr-2" />
              Manage Colors
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Archive className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">No assets uploaded yet. Start by uploading your brand assets.</p>
              <div className="flex justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Assets
                </Button>
                <Button variant="outline" className="glass border-0">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
