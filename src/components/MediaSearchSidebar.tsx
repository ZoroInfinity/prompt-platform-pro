
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, Image as ImageIcon, Video } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

interface MediaSearchSidebarProps {
  isOpen: boolean
  onClose: () => void
  onImageSelect: (imageId: string) => void
  onVideoSelect?: (videoId: string) => void
}

const sampleImages = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1461749280684-dccba630e2f6", 
  "photo-1581091226825-a6a2a5aee158",
  "photo-1526374965328-7f61d4dc18c5",
  "photo-1487058792275-0ad4aaf24ca7",
  "photo-1605810230434-7631ac76ec81",
  "photo-1460925895917-afdab827c52f",
  "photo-1498050108023-c5249f4df085"
]

const sampleVideos = [
  { id: "1", thumbnail: "photo-1488590528505-98d2b5aba04b", title: "Tech Animation" },
  { id: "2", thumbnail: "photo-1461749280684-dccba630e2f6", title: "Business Meeting" },
  { id: "3", thumbnail: "photo-1581091226825-a6a2a5aee158", title: "Social Media" },
  { id: "4", thumbnail: "photo-1526374965328-7f61d4dc18c5", title: "Creative Work" },
]

export function MediaSearchSidebar({ isOpen, onClose, onImageSelect, onVideoSelect }: MediaSearchSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [imageResults, setImageResults] = useState(sampleImages)
  const [videoResults, setVideoResults] = useState(sampleVideos)

  const handleSearch = (type: 'image' | 'video') => {
    // Simulate search - in real app would call API
    if (searchQuery.trim()) {
      if (type === 'image') {
        setImageResults(sampleImages)
      } else {
        setVideoResults(sampleVideos)
      }
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="glass-card backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 w-96">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Search Media</SheetTitle>
            <SheetClose asChild>
              <Button variant="outline" size="sm" className="glass border-0">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="space-y-4 mt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Search for media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch('image')}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50"
            />
            <Button onClick={() => handleSearch('image')} size="sm" className="bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="images" className="w-full">
            <TabsList className="glass grid w-full grid-cols-2">
              <TabsTrigger value="images" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Images
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="images" className="mt-4">
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {imageResults.map((imageId, index) => (
                  <div
                    key={imageId}
                    className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
                    onClick={() => {
                      onImageSelect(imageId)
                      onClose()
                    }}
                  >
                    <img
                      src={`https://images.unsplash.com/${imageId}?w=200&h=150&fit=crop`}
                      alt={`Search result ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-4">
              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                {videoResults.map((video) => (
                  <div
                    key={video.id}
                    className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 glass-card p-2"
                    onClick={() => {
                      onVideoSelect?.(video.id)
                      onClose()
                    }}
                  >
                    <div className="relative">
                      <img
                        src={`https://images.unsplash.com/${video.thumbnail}?w=300&h=200&fit=crop`}
                        alt={video.title}
                        className="w-full h-20 object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    <p className="text-sm mt-2 text-muted-foreground">{video.title}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}
