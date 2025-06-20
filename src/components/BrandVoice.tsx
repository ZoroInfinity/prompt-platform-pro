
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, MessageCircle, CheckCircle, XCircle } from "lucide-react"

export function BrandVoice() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Brand Voice</h1>
        <p className="text-muted-foreground">Define how your brand communicates and expresses itself</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Tone & Style
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="primary-tone">Primary Tone</Label>
              <Select>
                <SelectTrigger className="glass border-0 bg-white/50 dark:bg-slate-800/50">
                  <SelectValue placeholder="Select primary tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="authoritative">Authoritative</SelectItem>
                  <SelectItem value="playful">Playful</SelectItem>
                  <SelectItem value="empathetic">Empathetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="secondary-tone">Secondary Tone</Label>
              <Select>
                <SelectTrigger className="glass border-0 bg-white/50 dark:bg-slate-800/50">
                  <SelectValue placeholder="Select secondary tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="witty">Witty</SelectItem>
                  <SelectItem value="inspiring">Inspiring</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="confident">Confident</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Voice Characteristics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="voice-description">Voice Description</Label>
              <Textarea
                id="voice-description"
                placeholder="Describe your brand's voice in a few sentences..."
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="personality-traits">Key Personality Traits</Label>
              <Input
                id="personality-traits"
                placeholder="e.g., Innovative, Trustworthy, Bold"
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Do's
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="dos">What We Do Say</Label>
              <Textarea
                id="dos"
                placeholder="List messaging approaches and language that align with your brand..."
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-500" />
              Don'ts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="donts">What We Don't Say</Label>
              <Textarea
                id="donts"
                placeholder="List messaging approaches and language to avoid..."
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Messaging Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="sample-messages">Sample Brand Messages</Label>
              <Textarea
                id="sample-messages"
                placeholder="Provide examples of on-brand messaging for different scenarios..."
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
