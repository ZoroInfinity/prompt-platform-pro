
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Minus, Star } from "lucide-react"

export function BrandMonitor() {
  const sentimentData = {
    positive: 68,
    neutral: 23,
    negative: 9
  }

  const recentReviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      text: "Excellent service and support. The team went above and beyond to help us implement their solution.",
      platform: "Google Reviews",
      sentiment: "positive"
    },
    {
      id: 2,
      name: "Mike R.",
      rating: 4,
      text: "Good product but the onboarding process could be smoother. Overall satisfied with the results.",
      platform: "Trustpilot",
      sentiment: "neutral"
    },
    {
      id: 3,
      name: "Jessica K.",
      rating: 2,
      text: "Not impressed with the customer service response time. Took 3 days to get a basic question answered.",
      platform: "G2",
      sentiment: "negative"
    },
    {
      id: 4,
      name: "David L.",
      rating: 5,
      text: "Outstanding platform! It has transformed our workflow and increased our productivity by 40%.",
      platform: "Capterra",
      sentiment: "positive"
    },
    {
      id: 5,
      name: "Emma W.",
      rating: 4,
      text: "Great features and intuitive interface. Would recommend to other businesses in our industry.",
      platform: "Google Reviews",
      sentiment: "positive"
    },
    {
      id: 6,
      name: "Tom B.",
      rating: 3,
      text: "Decent software but pricing could be more competitive compared to alternatives.",
      platform: "Software Advice",
      sentiment: "neutral"
    }
  ]

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-green-500" />
      case "negative": return <ThumbsDown className="h-4 w-4 text-red-500" />
      default: return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "bg-green-100 text-green-800 border-green-200"
      case "negative": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Brand Monitor</h1>
        <p className="text-muted-foreground">Track your brand performance across all touchpoints and platforms</p>
      </div>

      {/* Top Row: Summary Panel & Sentiment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Section 1: Summary Panel */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Brand Sentiment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Positive Highlights</span>
                </div>
                <p className="text-sm text-green-700">
                  Majority of users appreciate our fast customer service and innovative solutions. 
                  Platform reliability and user-friendly interface are frequently mentioned strengths.
                </p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <ThumbsDown className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-red-800">Areas for Improvement</span>
                </div>
                <p className="text-sm text-red-700">
                  Some users expressed concerns over onboarding complexity and response times. 
                  Pricing competitiveness compared to alternatives is also mentioned.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Minus className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Overall Trend</span>
                </div>
                <p className="text-sm text-blue-700">
                  Brand sentiment remains positive with {sentimentData.positive}% positive reviews. 
                  Customer satisfaction has improved by 12% this quarter.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Sentiment Analysis */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Sentiment Bars */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-16 text-green-600">Positive</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full transition-all duration-500" 
                      style={{ width: `${sentimentData.positive}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{sentimentData.positive}%</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-16 text-gray-600">Neutral</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gray-500 h-4 rounded-full transition-all duration-500" 
                      style={{ width: `${sentimentData.neutral}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{sentimentData.neutral}%</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-16 text-red-600">Negative</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-red-500 h-4 rounded-full transition-all duration-500" 
                      style={{ width: `${sentimentData.negative}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12">{sentimentData.negative}%</span>
                </div>
              </div>

              {/* Overall Score */}
              <div className="pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">4.2</div>
                  <div className="flex justify-center mb-2">
                    {renderStars(4)}
                  </div>
                  <div className="text-sm text-gray-600">Overall Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Recent Reviews - Full Width */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentReviews.map((review) => (
              <Card key={review.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{review.name}</span>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <Badge className={`text-xs ${getSentimentColor(review.sentiment)}`}>
                      <span className="flex items-center gap-1">
                        {getSentimentIcon(review.sentiment)}
                        {review.sentiment}
                      </span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{review.text}</p>
                  <div className="text-xs text-gray-500">{review.platform}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
