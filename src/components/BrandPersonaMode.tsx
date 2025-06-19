
import { useState } from "react"
import { Target, Heart, Users, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"

export function BrandPersonaMode() {
  const [mission, setMission] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [formalityLevel, setFormalityLevel] = useState([50])
  const [energyLevel, setEnergyLevel] = useState([50])
  const [innovationLevel, setInnovationLevel] = useState([50])

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Define Brand Persona</h1>
        <p className="text-muted-foreground">Create a comprehensive brand personality that resonates with your audience</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Mission */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Brand Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium">What is your brand's core mission?</label>
              <Input
                placeholder="e.g., To empower businesses through innovative AI solutions"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="glass border-0 bg-white/50 dark:bg-slate-800/50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Target Audience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium">Describe your ideal customer</label>
              <Textarea
                placeholder="e.g., Tech-savvy entrepreneurs and small business owners aged 25-45 who value efficiency and innovation. They are early adopters looking for tools to streamline their operations and scale their businesses."
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="glass border-0 bg-white/50 dark:bg-slate-800/50 min-h-[100px] resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Brand Personality Traits */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Brand Personality Traits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Communication Style</label>
                <span className="text-xs text-muted-foreground">
                  {formalityLevel[0] < 30 ? "Casual" : formalityLevel[0] > 70 ? "Formal" : "Balanced"}
                </span>
              </div>
              <div className="px-2">
                <Slider
                  value={formalityLevel}
                  onValueChange={setFormalityLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Casual</span>
                  <span>Formal</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Energy Level</label>
                <span className="text-xs text-muted-foreground">
                  {energyLevel[0] < 30 ? "Calm" : energyLevel[0] > 70 ? "High Energy" : "Moderate"}
                </span>
              </div>
              <div className="px-2">
                <Slider
                  value={energyLevel}
                  onValueChange={setEnergyLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Calm</span>
                  <span>Energetic</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Innovation vs Tradition</label>
                <span className="text-xs text-muted-foreground">
                  {innovationLevel[0] < 30 ? "Traditional" : innovationLevel[0] > 70 ? "Innovative" : "Balanced"}
                </span>
              </div>
              <div className="px-2">
                <Slider
                  value={innovationLevel}
                  onValueChange={setInnovationLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Traditional</span>
                  <span>Innovative</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-6">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
          <Save className="h-4 w-4 mr-2" />
          Save Brand Persona
        </Button>
      </div>
    </div>
  )
}
