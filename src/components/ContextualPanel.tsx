
import { Search, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContextualPanelProps {
  onClose: () => void;
}

const ContextualPanel = ({ onClose }: ContextualPanelProps) => {
  return (
    <div className="w-80 bg-card border-l border-border h-screen flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Content Tools</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Media Search</h4>
          
          <Button
            variant="outline"
            className="w-full justify-start h-16 p-4 hover:bg-sky-50 hover:border-sky-200 rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-sky-500/10 rounded-lg">
                <Search className="w-5 h-5 text-sky-500" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Image Search</div>
                <div className="text-sm text-muted-foreground">Find perfect images online</div>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start h-16 p-4 hover:bg-sky-50 hover:border-sky-200 rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-sky-500/10 rounded-lg">
                <Video className="w-5 h-5 text-sky-500" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">Video Search</div>
                <div className="text-sm text-muted-foreground">Discover engaging videos</div>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContextualPanel;
