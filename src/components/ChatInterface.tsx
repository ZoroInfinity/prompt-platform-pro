
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

interface ChatInterfaceProps {
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

const ChatInterface = ({ onContentGenerated, generatedContent, setGeneratedContent }: ChatInterfaceProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    } else {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    }
  };

  const generateContent = async () => {
    if (!prompt.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);

    // Simulate AI content generation
    const mockContent = selectedPlatforms.map(platformId => {
      const platform = platforms.find(p => p.id === platformId);
      return {
        id: Date.now() + Math.random(),
        platform: platform?.name,
        platformId,
        color: platform?.color,
        content: generateMockContent(prompt, platformId),
        image: `https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop`,
      };
    });

    setTimeout(() => {
      setGeneratedContent(mockContent);
      onContentGenerated(mockContent);
      setIsGenerating(false);
      setPrompt("");
    }, 1500);
  };

  const generateMockContent = (prompt: string, platform: string) => {
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

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-semibold text-foreground mb-2">Create Content</h2>
        <p className="text-muted-foreground">Generate platform-specific content with AI assistance</p>
      </div>

      {/* Quick Action Buttons */}
      <div className="p-6 border-b border-border">
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <span>Quick Post</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4" />
            <span>Business Writing</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Content Writing</span>
          </Button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {generatedContent.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-2">Ready to create amazing content?</h3>
              <p className="text-muted-foreground">Start by typing your prompt below and selecting your target platforms.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-border">
        <div className="flex items-end space-x-3">
          {/* Platform Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="min-w-40">
                <span className="truncate">{selectedPlatformNames}</span>
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

          {/* Text Input */}
          <div className="flex-1">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the content you want to create..."
              className="min-h-12 resize-none"
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
            disabled={!prompt.trim() || selectedPlatforms.length === 0 || isGenerating}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6"
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
  );
};

export default ChatInterface;
