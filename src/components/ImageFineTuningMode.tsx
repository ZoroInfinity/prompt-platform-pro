
import { useState } from "react"
import { Upload, Palette, Settings, X, RotateCcw, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface UploadedImage {
  id: string
  url: string
  name: string
  style: string
  aiEnhancement: boolean
}

export function ImageFineTuningMode() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            url: e.target?.result as string,
            name: file.name,
            style: "minimal",
            aiEnhancement: false
          }
          setUploadedImages(prev => [...prev, newImage])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id))
  }

  const updateImageStyle = (id: string, style: string) => {
    setUploadedImages(prev => 
      prev.map(img => img.id === id ? { ...img, style } : img)
    )
  }

  const toggleAIEnhancement = (id: string) => {
    setUploadedImages(prev => 
      prev.map(img => img.id === id ? { ...img, aiEnhancement: !img.aiEnhancement } : img)
    )
  }

  const applySettingsToAll = () => {
    if (uploadedImages.length > 0) {
      const firstImage = uploadedImages[0]
      setUploadedImages(prev => 
        prev.map(img => ({ 
          ...img, 
          style: firstImage.style, 
          aiEnhancement: firstImage.aiEnhancement 
        }))
      )
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Image Style & Fine-Tuning</h1>
        <p className="text-muted-foreground">Upload and enhance your images with AI-powered styling options</p>
      </div>

      {/* Upload Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Drag and drop images here, or click to select multiple files
              </p>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button variant="outline" asChild>
                <label htmlFor="image-upload" className="cursor-pointer">
                  Choose Images
                </label>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Images Grid */}
      {uploadedImages.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Uploaded Images ({uploadedImages.length})</h2>
            {uploadedImages.length > 1 && (
              <Button variant="outline" onClick={applySettingsToAll}>
                <Settings className="h-4 w-4 mr-2" />
                Apply Settings to All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedImages.map((image) => (
              <Card key={image.id} className="glass-card">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <img 
                      src={image.url} 
                      alt={image.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => removeImage(image.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Image Style</label>
                      <Select 
                        value={image.style} 
                        onValueChange={(value) => updateImageStyle(image.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">Minimal</SelectItem>
                          <SelectItem value="artistic">Artistic</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                          <SelectItem value="vintage">Vintage</SelectItem>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">AI Enhancement</label>
                      <Switch
                        checked={image.aiEnhancement}
                        onCheckedChange={() => toggleAIEnhancement(image.id)}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Replace
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1"
                        disabled={!image.aiEnhancement}
                      >
                        <Wand2 className="h-4 w-4 mr-1" />
                        Enhance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-6">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              <Palette className="h-4 w-4 mr-2" />
              Apply All Enhancements
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
