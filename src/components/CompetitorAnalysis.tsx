
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, ExternalLink, Edit3, Globe, Target, MessageSquare, Package } from "lucide-react"

interface Competitor {
  id: string
  name: string
  industry: string
  website: string
  description: string
  brandTone: string
  keyOfferings: string[]
  logoUrl?: string
}

export function CompetitorAnalysis() {
  const [competitors, setCompetitors] = useState<Competitor[]>([
    {
      id: "1",
      name: "Nike",
      industry: "Athletic Apparel",
      website: "nike.com",
      description: "Just Do It - Empowering athletes worldwide with innovative sportswear",
      brandTone: "Inspirational, Bold, Performance-focused",
      keyOfferings: ["Athletic Footwear", "Sportswear", "Equipment", "Digital Fitness"]
    },
    {
      id: "2", 
      name: "Adidas",
      industry: "Athletic Apparel",
      website: "adidas.com",
      description: "Impossible is Nothing - Creating through sport to change lives",
      brandTone: "Creative, Inclusive, Performance-driven",
      keyOfferings: ["Sports Shoes", "Apparel", "Accessories", "Lifestyle Products"]
    }
  ])

  const [newCompetitor, setNewCompetitor] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAddCompetitor = () => {
    if (newCompetitor.trim()) {
      const competitor: Competitor = {
        id: Date.now().toString(),
        name: newCompetitor.trim(),
        industry: "TBD",
        website: "",
        description: "Analysis pending...",
        brandTone: "To be analyzed",
        keyOfferings: ["Research in progress"]
      }
      setCompetitors([...competitors, competitor])
      setNewCompetitor("")
      setIsAdding(false)
    }
  }

  const autoSuggestCompetitors = () => {
    const suggestions = [
      {
        id: "3",
        name: "Under Armour", 
        industry: "Athletic Apparel",
        website: "underarmour.com",
        description: "I Will - Performance apparel engineered to make you better",
        brandTone: "Determined, Technical, Athlete-focused",
        keyOfferings: ["Performance Gear", "Footwear", "Connected Fitness", "Team Sports"]
      },
      {
        id: "4",
        name: "Puma",
        industry: "Athletic Apparel", 
        website: "puma.com",
        description: "Forever Faster - Sports brand that successfully fuses influences from sport, lifestyle and fashion",
        brandTone: "Fast, Stylish, Confident",
        keyOfferings: ["Footwear", "Apparel", "Accessories", "Motorsport Gear"]
      }
    ]
    
    setCompetitors([...competitors, ...suggestions])
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Competitor Analysis</h1>
        <p className="text-muted-foreground">Analyze and compare competitor brands to identify opportunities and market positioning</p>
      </div>

      {/* Action Bar */}
      <div className="flex gap-3 mb-6">
        {!isAdding ? (
          <>
            <Button 
              onClick={() => setIsAdding(true)}
              className="bg-sky-600 hover:bg-sky-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Competitor
            </Button>
            <Button 
              variant="outline" 
              onClick={autoSuggestCompetitors}
              className="border-sky-200 text-sky-600 hover:bg-sky-50"
            >
              <Target className="w-4 h-4 mr-2" />
              Auto-suggest
            </Button>
          </>
        ) : (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Enter competitor name or URL..."
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCompetitor()}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              autoFocus
            />
            <Button onClick={handleAddCompetitor} size="sm" className="bg-sky-600 hover:bg-sky-700">
              Add
            </Button>
            <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Competitors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {competitors.map((competitor) => (
          <Card key={competitor.id} className="glass-card hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                    {competitor.name}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-sky-100 text-sky-700 text-xs">
                    {competitor.industry}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Website */}
              {competitor.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <a 
                    href={`https://${competitor.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    {competitor.website}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Brand Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{competitor.description}</p>
              </div>

              {/* Brand Tone */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Brand Tone
                </h4>
                <p className="text-sm text-gray-600">{competitor.brandTone}</p>
              </div>

              {/* Key Offerings */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Key Offerings
                </h4>
                <div className="flex flex-wrap gap-1">
                  {competitor.keyOfferings.map((offering, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                    >
                      {offering}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {competitors.length === 0 && (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No competitors added yet</h3>
          <p className="text-gray-600 mb-4">Start analyzing your competition by adding competitor brands</p>
          <Button onClick={() => setIsAdding(true)} className="bg-sky-600 hover:bg-sky-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Competitor
          </Button>
        </div>
      )}
    </div>
  )
}
