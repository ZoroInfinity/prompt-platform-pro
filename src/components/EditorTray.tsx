
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, X, Upload, Save } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"

interface EditorTrayProps {
  isOpen: boolean
  onClose: () => void
  content: string
  onContentChange: (content: string) => void
  platform: string
}

export function EditorTray({ 
  isOpen, 
  onClose, 
  content, 
  onContentChange, 
  platform 
}: EditorTrayProps) {
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  const handleSave = () => {
    // Save logic here
    onClose()
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="glass-card backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle>Edit {platform.charAt(0).toUpperCase() + platform.slice(1)} Post</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="outline" size="sm" className="glass border-0">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-24"
              placeholder="Write your post content..."
            />
          </div>

          <div className="space-y-2">
            <Label>Change Image</Label>
            <div className="flex gap-2">
              <Button variant="outline" className="glass border-0 flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
              <Button variant="outline" className="glass border-0 flex-1">
                Search Images
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Schedule Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Schedule Time</Label>
              <div className="relative">
                <Input
                  id="time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose} className="glass border-0 flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
