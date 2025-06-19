
import { useState } from "react"
import { Upload, Palette, Type, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BrandManagementMode() {
  const [brandLogo, setBrandLogo] = useState<string | null>(null)
  const [primaryColor, setPrimaryColor] = useState("#3B82F6")
  const [secondaryColor, setSecondaryColor] = useState("#10B981")
  const [accentColor, setAccentColor] = useState("#F59E0B")

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setBrandLogo(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Manage Your Brand Elements</h1>
        <p className="text-muted-foreground">Define your brand identity with logo, colors, fonts, and tone</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Upload */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Brand Logo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
              {brandLogo ? (
                <div className="space-y-4">
                  <img 
                    src={brandLogo} 
                    alt="Brand Logo" 
                    className="max-h-24 mx-auto rounded"
                  />
                  <Button variant="outline" size="sm" onClick={() => setBrandLogo(null)}>
                    Remove Logo
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Upload your brand logo
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <Button variant="outline" asChild>
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Color</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-16 h-10 p-1 rounded"
                  />
                  <Input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-16 h-10 p-1 rounded"
                  />
                  <Input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Accent Color</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-16 h-10 p-1 rounded"
                  />
                  <Input
                    type="text"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Font Style */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Type className="h-5 w-5" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Font</label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font family" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="lato">Lato</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Heading Font</label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select heading font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="playfair">Playfair Display</SelectItem>
                    <SelectItem value="merriweather">Merriweather</SelectItem>
                    <SelectItem value="sourcesans">Source Sans Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Brand Tone */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Brand Tone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">Communication Style</label>
                <Select defaultValue="professional">
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="playful">Playful</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          Save Brand Settings
        </Button>
      </div>
    </div>
  )
}
