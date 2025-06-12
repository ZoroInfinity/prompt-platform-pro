
import { useState } from "react";
import { Send, ChevronDown, Edit3, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import ContentCard from "@/components/ContentCard";
import { ChatMode } from "@/pages/Index";

interface ChatInterfaceProps {
  currentMode: ChatMode;
  onModeChange: (mode: ChatMode) => void;
  onContentGenerated: (content: any[]) => void;
  generatedContent: any[];
  setGeneratedContent: (content: any[]) => void;
}

const platforms = [
  { id: "instagram", name: "Instagram", color: "bg-pink-500" },
  { id: "linkedin", name: "LinkedIn", color: "bg-blue-600" },
  { id: "twitter", name: "Twitter", color: "bg-blue-400" },
  { id: "facebook", name: "Facebook", color: "bg-blue-700" },
];

const modeConfig = {
  "general": { title: "AI Assistant", subtitle: "How can I help you today?" },
  "quick-post": { title: "Quick Post", subtitle: "Create engaging social media posts instantly" },
  "business-writing": { title: "Business Writing", subtitle: "Professional content for your business needs" },
  "content-writing": { title: "Content Writing", subtitle: "Long-form content and articles" },
};

const ChatInterface = ({ currentMode, onModeChange, onContentGenerated, generatedContent, setGeneratedContent }: ChatInterfaceProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [isGenerating, setIsGenerating] = useState(false);

  const isContentMode = currentMode !== "general";

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    } else {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    }
  };

  const generateContent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);

    if (isContentMode && selectedPlatforms.length > 0) {
      // Generate content for selected platforms
      const mockContent = selectedPlatforms.map(platformId => {
        const platform = platforms.find(p => p.id === platformId);
        return {
          id: Date.now() + Math.random(),
          platform: platform?.name,
          platformId,
          color: platform?.color,
          content: generateMockContent(prompt, platformId, currentMode),
          image: `https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop`,
        };
      });

      setTimeout(() => {
        setGeneratedContent(mockContent);
        onContentGenerated(mockContent);
        setIsGenerating(false);
        setPrompt("");
      }, 1500);
    } else {
      // General chat mode
      setTimeout(() => {
        setIsGenerating(false);
        setPrompt("");
      }, 1000);
    }
  };

  const generateMockContent = (prompt: string, platform: string, mode: ChatMode) => {
    const variations = {
      instagram: `🌟 ${prompt} ✨\n\nPerfect for your Instagram feed! Share your story with beautiful visuals and engaging captions. #inspiration #content #socialmedia`,
      linkedin: `${prompt}\n\nThis professional insight can help drive meaningful connections and showcase your expertise in your industry. Perfect for building your professional network.`,
      twitter: `${prompt} 🚀\n\nQuick, engaging, and shareable content that's perfect for Twitter's fast-paced environment. #trending #thoughts`,
      facebook: `${prompt}\n\nEngage with your Facebook community through this thoughtful post that encourages discussion and connection with friends and followers.`,
    };
    return variations[platform as keyof typeof variations] || prompt;
  };

  const selectedPlatformNames = selectedPlatforms
    .map(id => platforms.find(p => p.id === id)?.name)
    .join(", ");

  const config = modeConfig[currentMode];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6">
        {/* Header */}
        <div className="py-8 text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-2">{config.title}</h1>
          <p className="text-muted-foreground">{config.subtitle}</p>
        </div>

        {/* Mode Selection Pills - Only show in general mode */}
        {currentMode === "general" && (
          <div className="flex justify-center mb-8">
            <div className="flex space-x-3">
              <Button
                onClick={() => onModeChange("quick-post")}
                variant="outline"
                className="rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-sky-50 hover:border-sky-200"
              >
                <Edit3 className="w-4 h-4" />
                <span>Quick Post</span>
              </Button>
              <Button
                onClick={() => onModeChange("business-writing")}
                variant="outline"
                className="rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-sky-50 hover:border-sky-200"
              >
                <Briefcase className="w-4 h-4" />
                <span>Business Writing</span>
              </Button>
              <Button
                onClick={() => onModeChange("content-writing")}
                variant="outline"
                className="rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-sky-50 hover:border-sky-200"
              >
                <FileText className="w-4 h-4" />
                <span>Content Writing</span>
              </Button>
            </div>
          </div>
        )}

        {/* Chat Messages Area */}
        <div className="flex-1 py-8">
          {generatedContent.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit3 className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {isContentMode ? "Ready to create amazing content?" : "What can I help you with?"}
                </h3>
                <p className="text-muted-foreground">
                  {isContentMode 
                    ? "Enter your prompt and select platforms to generate tailored content."
                    : "Ask me anything and I'll do my best to help you."
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedContent.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  onEdit={(id, newText) => {
                    setGeneratedContent(
                      generatedContent.map(c => 
                        c.id === id ? { ...c, content: newText } : c
                      )
                    );
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="pb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-end space-x-3 bg-white border border-border rounded-xl p-4 shadow-sm">
              {/* Platform Selector - Only show in content modes */}
              {isContentMode && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="min-w-32 rounded-lg">
                      <span className="truncate text-sm">{selectedPlatformNames}</span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {platforms.map((platform) => (
                      <DropdownMenuCheckboxItem
                        key={platform.id}
                        checked={selectedPlatforms.includes(platform.id)}
                        onCheckedChange={(checked) => handlePlatformChange(platform.id, checked)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded ${platform.color}`} />
                          <span>{platform.name}</span>
                        </div>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Text Input */}
              <div className="flex-1">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={isContentMode ? "Describe the content you want to create..." : "Message AI Assistant..."}
                  className="border-0 resize-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-8 text-base"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      generateContent();
                    }
                  }}
                />
              </div>

              {/* Send Button */}
              <Button
                onClick={generateContent}
                disabled={!prompt.trim() || (isContentMode && selectedPlatforms.length === 0) || isGenerating}
                className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4"
                size="sm"
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
