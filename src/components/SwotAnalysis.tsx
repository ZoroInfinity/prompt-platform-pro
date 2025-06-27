
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export function SwotAnalysis() {
  const [swotData, setSwotData] = useState({
    strengths: "• Strong brand recognition\n• High-quality products\n• Excellent customer service\n• Innovative technology\n• Loyal customer base",
    weaknesses: "• Limited market presence\n• Higher pricing than competitors\n• Dependency on key suppliers\n• Limited product diversity\n• Resource constraints",
    opportunities: "• Emerging market expansion\n• Digital transformation trends\n• Strategic partnerships\n• New product categories\n• Sustainability initiatives",
    threats: "• Intense competition\n• Economic uncertainties\n• Regulatory changes\n• Technology disruption\n• Supply chain risks"
  })

  const handleChange = (quadrant: keyof typeof swotData, value: string) => {
    setSwotData(prev => ({
      ...prev,
      [quadrant]: value
    }))
  }

  const quadrants = [
    { key: 'strengths', title: 'Strengths', color: 'border-green-200 bg-green-50', textColor: 'text-green-800' },
    { key: 'weaknesses', title: 'Weaknesses', color: 'border-red-200 bg-red-50', textColor: 'text-red-800' },
    { key: 'opportunities', title: 'Opportunities', color: 'border-blue-200 bg-blue-50', textColor: 'text-blue-800' },
    { key: 'threats', title: 'Threats', color: 'border-orange-200 bg-orange-50', textColor: 'text-orange-800' },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">SWOT Analysis</h1>
        <p className="text-muted-foreground">Analyze your brand's strengths, weaknesses, opportunities, and threats</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-center">Brand SWOT Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Central connector circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border-2 border-gray-200 rounded-full shadow-sm z-10 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full opacity-20"></div>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quadrants.map((quadrant) => (
                <Card key={quadrant.key} className={`${quadrant.color} border-2 shadow-sm hover:shadow-md transition-shadow`}>
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-lg ${quadrant.textColor} text-center`}>
                      {quadrant.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={swotData[quadrant.key as keyof typeof swotData]}
                      onChange={(e) => handleChange(quadrant.key as keyof typeof swotData, e.target.value)}
                      className="min-h-[120px] bg-white/70 border-gray-200 resize-none"
                      placeholder={`Enter ${quadrant.title.toLowerCase()}...`}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
