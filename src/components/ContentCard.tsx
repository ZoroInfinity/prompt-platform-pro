
import { useState } from "react";
import { Edit, Image, MoreHorizontal, Copy, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ContentCardProps {
  content: {
    id: number;
    platform: string;
    platformId: string;
    color: string;
    content: string;
    image: string;
  };
  onEdit: (id: number, newText: string) => void;
}

const ContentCard = ({ content, onEdit }: ContentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content.content);

  const handleSave = () => {
    onEdit(content.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(content.content);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center space-x-3">
          <div className={`w-4 h-4 rounded-full ${content.color}`} />
          <span className="font-medium text-foreground text-sm">{content.platform}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="rounded-full">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Text
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Image className="w-4 h-4 mr-2" />
              Change Image
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Image */}
      <div className="aspect-video bg-muted relative overflow-hidden">
        <img
          src={content.image}
          alt="Content visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-4">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="min-h-24 resize-none border-border"
            />
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm" className="bg-sky-500 hover:bg-sky-600 rounded-lg">
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="rounded-lg">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{content.content}</p>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1 rounded-lg hover:bg-sky-50 hover:border-sky-200"
              >
                <Edit className="w-3 h-3" />
                <span>Edit Text</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-1 rounded-lg hover:bg-sky-50 hover:border-sky-200"
              >
                <Image className="w-3 h-3" />
                <span>Change Image</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
