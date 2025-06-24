
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, MessageSquare, Heart, Share, ThumbsUp, ThumbsDown, Minus, Instagram, Linkedin, Twitter } from "lucide-react"

export function BrandMonitor() {
  const sentimentData = {
    positive: 245,
    negative: 38,
    neutral: 127
  }

  const recentReviews = [
    {
      id: 1,
      platform: "linkedin",
      timestamp: "2 hours ago",
      text: "Excellent service and support. The team went above and beyond to help us implement their solution.",
      sentiment: "positive"
    },
    {
      id: 2,
      platform: "instagram",
      timestamp: "5 hours ago", 
      text: "Good product but the onboarding process could be smoother. Overall satisfied with the results.",
      sentiment: "neutral"
    },
    {
      id: 3,
      platform: "twitter",
      timestamp: "1 day ago",
      text: "Not impressed with the customer service response time. Took 3 days to get a basic question answered.",
      sentiment: "negative"
    },
    {
      id: 4,
      platform: "linkedin",
      timestamp: "2 days ago",
      text: "Outstanding platform! It has transformed our workflow and increased our productivity by 40%.",
      sentiment: "positive"
    }
  ]

  const platformIcons = {
    linkedin: Linkedin,
    instagram: Instagram,
    twitter: Twitter
  }

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

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Brand Monitor</h1>
        <p className="text-muted-foreground">Track your brand performance across all touchpoints and platforms</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Reach</p>
                <p className="text-2xl font-semibold">24.5K</p>
                <p className="text-sm text-green-500">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Heart className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-semibold">8.2%</p>
                <p className="text-sm text-green-500">+2.1% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <MessageSquare className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mentions</p>
                <p className="text-2xl font-semibold">156</p>
                <p className="text-sm text-red-500">-5% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Share className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shares</p>
                <p className="text-2xl font-semibold">89</p>
                <p className="text-sm text-green-500">+18% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Analysis Section - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column: Sentiment Summary */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Sentiment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <ThumbsUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Positive</span>
              </div>
              <span className="text-2xl font-bold text-green-600">{sentimentData.positive}</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <Minus className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-800">Neutral</span>
              </div>
              <span className="text-2xl font-bold text-gray-600">{sentimentData.neutral}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-3">
                <ThumbsDown className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-800">Negative</span>
              </div>
              <span className="text-2xl font-bold text-red-600">{sentimentData.negative}</span>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Sentiment Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sentiment Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Positive</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full" 
                    style={{ width: `${(sentimentData.positive / (sentimentData.positive + sentimentData.neutral + sentimentData.negative)) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{Math.round((sentimentData.positive / (sentimentData.positive + sentimentData.neutral + sentimentData.negative)) * 100)}%</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Neutral</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gray-500 h-3 rounded-full" 
                    style={{ width: `${(sentimentData.neutral / (sentimentData.positive + sentimentData.neutral + sentimentData.negative)) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{Math.round((sentimentData.neutral / (sentimentData.positive + sentimentData.neutral + sentimentData.negative)) * 100)}%</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-16">Negative</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-red-500 h-3 rounded-full" 
                    style={{ width: `${(sentimentData.negative / (sentimentData.positive + sentimentData.neutral + sentimentData.negative)) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{Math.round((sentimentData.negative / (sentimentData.positive + sentimentData.neutral + sentimentData.negative)) * 100)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews Section - Full Width */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentReviews.map((review) => {
              const PlatformIcon = platformIcons[review.platform as keyof typeof platformIcons]
              return (
                <Card key={review.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <PlatformIcon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm text-gray-500">{review.timestamp}</span>
                      </div>
                      <Badge className={`text-xs ${getSentimentColor(review.sentiment)}`}>
                        <span className="flex items-center gap-1">
                          {getSentimentIcon(review.sentiment)}
                          {review.sentiment}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
