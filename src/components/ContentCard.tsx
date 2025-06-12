
import { useState } from "react";
import { Edit, Image, MoreHorizontal } from "lucide-react";
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
    <div className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded ${content.color}`} />
          <span className="font-medium text-foreground">{content.platform}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Text
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Image className="w-4 h-4 mr-2" />
              Change Image
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Image */}
      <div className="aspect-video bg-muted">
        <img
          src={content.image}
          alt="Content visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="min-h-24 resize-none"
            />
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm" className="bg-sky-500 hover:bg-sky-600">
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-foreground whitespace-pre-wrap">{content.content}</p>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Edit className="w-3 h-3" />
                <span>Edit Text</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1">
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
