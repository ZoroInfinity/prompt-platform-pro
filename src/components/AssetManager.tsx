
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Archive, Upload, Image, FileText, Palette, Download, Trash2, Eye, Folder } from "lucide-react"

interface Asset {
  id: string
  name: string
  type: "image" | "document" | "video"
  category: "Logo" | "Docs" | "Videos" | "Templates"
  url: string
  size: string
  uploadDate: string
}

export function AssetManager() {
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      name: "company-logo.png",
      type: "image",
      category: "Logo",
      url: "https://images.unsplash.com/photo-1618160702438-9b02040d0a901?w=200&h=200&fit=crop",
      size: "2.5 MB",
      uploadDate: "2 days ago"
    },
    {
      id: "2", 
      name: "brand-guidelines.pdf",
      type: "document",
      category: "Docs",
      url: "/placeholder-pdf.png",
      size: "4.1 MB",
      uploadDate: "1 week ago"
    },
    {
      id: "3",
      name: "product-demo.mp4",
      type: "video", 
      category: "Videos",
      url: "/placeholder-video.png",
      size: "15.2 MB",
      uploadDate: "3 days ago"
    }
  ])

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const categories = ["All", "Logo", "Docs", "Videos", "Templates"]

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    files.forEach(file => {
      const newAsset: Asset = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
        category: file.type.startsWith('image/') ? 'Logo' : 'Docs',
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: "Just now"
      }
      setAssets(prev => [...prev, newAsset])
    })
  }

  const handleFileUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = true
    input.accept = 'image/*,video/*,.pdf,.doc,.docx'
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      files.forEach(file => {
        const newAsset: Asset = {
          id: Date.now().toString(),
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document',
          category: file.type.startsWith('image/') ? 'Logo' : 'Docs',
          url: URL.createObjectURL(file),
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: "Just now"
        }
        setAssets(prev => [...prev, newAsset])
      })
    }
    input.click()
  }

  const handleDeleteAsset = (assetId: string) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId))
  }

  const handleDownload = (asset: Asset) => {
    const link = document.createElement('a')
    link.href = asset.url
    link.download = asset.name
    link.click()
  }

  const filteredAssets = selectedCategory && selectedCategory !== "All" 
    ? assets.filter(asset => asset.category === selectedCategory)
    : assets

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image": return <Image className="h-5 w-5" />
      case "video": return <Archive className="h-5 w-5" />
      default: return <FileText className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Logo": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Docs": return "bg-green-100 text-green-800 border-green-200"
      case "Videos": return "bg-purple-100 text-purple-800 border-purple-200"
      case "Templates": return "bg-orange-100 text-orange-800 border-orange-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Asset Manager</h1>
        <p className="text-muted-foreground">Organize and manage your brand assets, logos, templates, and creative resources</p>
      </div>

      {/* Upload Section */}
      <Card className="glass-card mb-8">
        <CardContent className="p-8">
          <div 
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-muted-foreground/20 hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Assets</h3>
            <p className="text-muted-foreground mb-6">
              Drag and drop files here, or click to browse
            </p>
            <Button onClick={handleFileUpload} className="bg-primary hover:bg-primary/90">
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category === "All" ? null : category)}
            className="gap-2"
          >
            <Folder className="h-4 w-4" />
            {category}
          </Button>
        ))}
      </div>

      {/* Assets Grid */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="glass-card hover:shadow-lg transition-all group">
              <CardContent className="p-4">
                {/* Asset Preview */}
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  {asset.type === "image" ? (
                    <img 
                      src={asset.url} 
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      {getFileIcon(asset.type)}
                    </div>
                  )}
                </div>
                
                {/* Asset Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{asset.name}</h4>
                    <Badge className={`text-xs ${getCategoryColor(asset.category)}`}>
                      {asset.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{asset.size}</span>
                    <span>{asset.uploadDate}</span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-1 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs"
                      onClick={() => setPreviewAsset(asset)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-7 text-xs"
                      onClick={() => handleDownload(asset)}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteAsset(asset.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card">
          <CardContent className="text-center py-12">
            <Archive className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">No assets found for this category.</p>
            <Button onClick={handleFileUpload} className="bg-primary hover:bg-primary/90">
              <Upload className="h-4 w-4 mr-2" />
              Upload First Asset
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Preview Modal */}
      <Dialog open={!!previewAsset} onOpenChange={() => setPreviewAsset(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{previewAsset?.name}</DialogTitle>
          </DialogHeader>
          {previewAsset && (
            <div className="flex justify-center">
              {previewAsset.type === "image" ? (
                <img 
                  src={previewAsset.url} 
                  alt={previewAsset.name}
                  className="max-w-full max-h-96 object-contain"
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    {getFileIcon(previewAsset.type)}
                    <p className="mt-2 text-sm text-gray-600">{previewAsset.name}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
