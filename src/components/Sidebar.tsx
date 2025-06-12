
import { useState } from "react";
import { ChevronDown, ChevronRight, PenTool, BarChart3, User, Edit3, Briefcase, FileText } from "lucide-react";
import { ChatMode } from "@/pages/Index";

interface SidebarProps {
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
}

const Sidebar = ({ currentMode, onModeChange }: SidebarProps) => {
  const [isContentHubExpanded, setIsContentHubExpanded] = useState(true);

  const contentCreationItems = [
    { id: "quick-post" as ChatMode, label: "Quick Post", icon: Edit3 },
    { id: "business-writing" as ChatMode, label: "Business Writing", icon: Briefcase },
    { id: "content-writing" as ChatMode, label: "Content Writing", icon: FileText },
  ];

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-semibold text-foreground">GenAI Studio</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {/* Content Creation Hub */}
        <div>
          <button
            onClick={() => setIsContentHubExpanded(!isContentHubExpanded)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors text-foreground"
          >
            <div className="flex items-center space-x-3">
              <PenTool className="w-5 h-5 text-sky-500" />
              <span className="font-medium">Content Creation Hub</span>
            </div>
            {isContentHubExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {isContentHubExpanded && (
            <div className="ml-8 mt-2 space-y-1">
              {contentCreationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onModeChange(item.id)}
                  className={`w-full flex items-center space-x-3 p-2 rounded-md transition-colors ${
                    currentMode === item.id
                      ? "bg-sky-50 text-sky-700 border border-sky-200"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Analytics */}
        <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-foreground">
          <BarChart3 className="w-5 h-5 text-sky-500" />
          <span className="font-medium">Analytics</span>
        </button>

        {/* Account */}
        <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors text-foreground">
          <User className="w-5 h-5 text-sky-500" />
          <span className="font-medium">Account</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Free Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
