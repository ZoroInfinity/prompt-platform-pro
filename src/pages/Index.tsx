
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ChatInterface from "@/components/ChatInterface";
import ContextualPanel from "@/components/ContextualPanel";

const Index = () => {
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const [showContextualPanel, setShowContextualPanel] = useState(false);

  const handleContentGenerated = (content: any[]) => {
    setGeneratedContent(content);
    setShowContextualPanel(true);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 flex">
        <ChatInterface 
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
