
import { useState } from "react"

interface PromptSuggestionsProps {
  onPromptSelect: (prompt: string) => void
}

export function PromptSuggestions({ onPromptSelect }: PromptSuggestionsProps) {
  const [isVisible, setIsVisible] = useState(true)

  const suggestions = [
    "Create a quick post for LinkedIn",
    "Summarize my brand tone",
    "What's my Instagram voice?",
    "Generate content ideas for this week"
  ]

  const handlePromptClick = (prompt: string) => {
    onPromptSelect(prompt)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => handlePromptClick(suggestion)}
          className="px-4 py-2 bg-gray-50 hover:bg-sky-50 border border-gray-200 hover:border-sky-200 rounded-full text-sm text-gray-700 hover:text-sky-600 transition-all duration-200 hover:shadow-sm"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
