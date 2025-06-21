
import { useState } from "react"
import { X, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ImageEditTrayProps {
  isOpen: boolean
  onClose: () => void
  onImageSelect: (imageUrl: string) => void
}

export function ImageEditTray({ isOpen, onClose, onImageSelect }: ImageEditTrayProps) {
  // Mock previously generated images
  const [previousImages] = useState([
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=300&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop"
  ])

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-gray-200 z-50 overflow-hidden">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b border-gray-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Edit Image</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto h-full pb-20">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Previously Generated</h3>
              <div className="grid grid-cols-2 gap-3">
                {previousImages.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all duration-200"
                    onClick={() => onImageSelect(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Generate New</h3>
              <Button
                variant="outline"
                className="w-full h-20 border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Generate New Image</span>
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
