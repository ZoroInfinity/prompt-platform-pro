
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import ContextualPanel from "@/components/ContextualPanel";

export type ChatMode = "general" | "quick-post" | "business-writing" | "content-writing";

const Index = () => {
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [showContextualPanel, setShowContextualPanel] = useState(false);
  const [currentMode, setCurrentMode] = useState<ChatMode>("general");

  const handleContentGenerated = (content: any[]) => {
    setGeneratedContent(content);
    setShowContextualPanel(true);
  };

  const handleModeChange = (mode: ChatMode) => {
    setCurrentMode(mode);
    // Clear previous content when switching modes
    setGeneratedContent([]);
    setShowContextualPanel(false);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar currentMode={currentMode} onModeChange={handleModeChange} />
      
      <div className="flex-1 flex">
        <ChatInterface 
          currentMode={currentMode}
          onModeChange={handleModeChange}
          onContentGenerated={handleContentGenerated}
          generatedContent={generatedContent}
          setGeneratedContent={setGeneratedContent}
        />
        
        {showContextualPanel && (
          <ContextualPanel onClose={() => setShowContextualPanel(false)} />
        )}
      </div>
    </div>
  );
};

export default Index;
