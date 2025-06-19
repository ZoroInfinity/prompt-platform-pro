
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, Zap, Target, TrendingUp } from "lucide-react"

export function ContentGenerationSection() {
  const [activeType, setActiveType] = useState("ideas")
  const [topic, setTopic] = useState("")
  const [generatedResults, setGeneratedResults] = useState<any[]>([])

  const contentTypes = [
    { id: "ideas", name: "Content Ideas", icon: Lightbulb, description: "Generate creative content ideas" },
    { id: "headlines", name: "Headlines", icon: Zap, description: "Create compelling headlines" },
    { id: "hooks", name: "Hooks", icon: Target, description: "Write engaging opening hooks" },
    { id: "trends", name: "Trend Analysis", icon: TrendingUp, description: "Analyze trending topics" },
  ]

  const handleGenerate = () => {
    // Simulate content generation based on type
    const mockResults = {
      ideas: [
        "5 Ways to Boost Your Productivity in 2024",
        "Behind the Scenes: Our Company Culture",
        "Industry Trends You Can't Ignore",
        "Customer Success Stories That Inspire",
        "Quick Tips for Better Work-Life Balance"
      ],
      headlines: [
        "Transform Your Business in 30 Days",
        "The Secret to Unstoppable Growth",
        "Why Everyone is Talking About This",
        "The Game-Changing Strategy You Need",
        "From Zero to Hero: A Complete Guide"
      ],
      hooks: [
        "Did you know that 90% of people...",
        "Here's what nobody tells you about...",
        "The biggest mistake I see people make is...",
        "What if I told you there's a way to...",
        "Stop doing this immediately if you want to..."
      ],
      trends: [
        "AI-powered content is trending up 340%",
        "Video content engagement increased 65%",
        "Micro-influencer partnerships growing",
        "Sustainable business practices in demand",
        "Remote work culture evolution continues"
      ]
    }

    setGeneratedResults(mockResults[activeType as keyof typeof mockResults] || [])
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Content Generation Tools</h2>
        <p className="text-muted-foreground mb-6">Generate various types of content using AI-powered tools.</p>
        
        <Tabs value={activeType} onValueChange={setActiveType} className="space-y-4">
          <TabsList className="glass-card grid w-full grid-cols-4">
            {contentTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-1">
                <type.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{type.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {contentTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">{type.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Topic or Keywords</label>
                  <Input
                    placeholder={`Enter topic for ${type.name.toLowerCase()}...`}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!topic.trim()}
                  className="w-full"
                >
                  Generate {type.name}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {generatedResults.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Generated Results
              <Badge variant="secondary">{contentTypes.find(t => t.id === activeType)?.name}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedResults.map((result, index) => (
                <div key={index} className="p-3 bg-accent/20 rounded-lg flex items-center justify-between">
                  <span className="text-sm">{result}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">Copy</Button>
                    <Button size="sm" variant="ghost">Use</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm">Generate More</Button>
              <Button size="sm" variant="outline">Save All</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
