
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Compass, Target, Eye, Lightbulb, Users } from "lucide-react"

export function BrandSteeringWheel() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Brand Steering Wheel</h1>
        <p className="text-muted-foreground">Define your core brand pillars and strategic direction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="mission">Our Purpose</Label>
              <Textarea
                id="mission"
                placeholder="What is your company's fundamental purpose and reason for existence?"
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Vision
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vision">Future Aspiration</Label>
              <Textarea
                id="vision"
                placeholder="What does your company aspire to become or achieve in the future?"
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Core Values
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="values">Guiding Principles</Label>
              <Textarea
                id="values"
                placeholder="What are the fundamental beliefs and principles that guide your company?"
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Target Audience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="audience">Who We Serve</Label>
              <Textarea
                id="audience"
                placeholder="Who is your primary target audience and what are their key characteristics?"
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="h-5 w-5" />
              Key Differentiators
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="differentiators">What Makes Us Unique</Label>
              <Textarea
                id="differentiators"
                placeholder="What sets your company apart from competitors? What unique value do you provide?"
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
