
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"

interface ImageSearchSidebarProps {
  isOpen: boolean
  onClose: () => void
  onImageSelect: (imageId: string) => void
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

export function ImageSearchSidebar({ isOpen, onClose, onImageSelect }: ImageSearchSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(sampleImages)

  const handleSearch = () => {
    // Simulate search - in real app would call API
    if (searchQuery.trim()) {
      // Filter or fetch based on query
      setSearchResults(sampleImages)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="glass-card backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 w-80">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Search Images</SheetTitle>
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
              placeholder="Search for images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50"
            />
            <Button onClick={handleSearch} size="sm" className="bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {searchResults.map((imageId, index) => (
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
