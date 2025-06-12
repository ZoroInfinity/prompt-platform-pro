
import { Search, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContextualPanelProps {
  onClose: () => void;
}

const ContextualPanel = ({ onClose }: ContextualPanelProps) => {
  return (
    <div className="w-80 bg-card border-l border-border h-screen flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Content Tools</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Media Search</h4>
          
          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:bg-accent"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-sky-500/10 rounded-lg">
                <Search className="w-5 h-5 text-sky-500" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Image Search</div>
                <div className="text-sm text-muted-foreground">Find perfect images online for your content</div>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-auto p-4 hover:bg-accent"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-sky-500/10 rounded-lg">
                <Video className="w-5 h-5 text-sky-500" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Video Search</div>
                <div className="text-sm text-muted-foreground">Discover engaging videos for your posts</div>
              </div>
            </div>
          </Button>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 p-4 bg-sky-50 rounded-lg border">
          <h4 className="text-sm font-medium text-foreground mb-2">💡 Pro Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use high-quality images for better engagement</li>
            <li>• Match image style to platform aesthetics</li>
            <li>• Consider video content for higher reach</li>
            <li>• Always check image licensing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContextualPanel;
