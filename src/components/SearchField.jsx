import { useMemo, useState } from 'react'
import { getAutocompleteSuggestions } from '../data'

export default function SearchField({
  value,
  onChange,
  onSubmit,
  onSelectSuggestion,
  placeholder = 'Search',
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestions = useMemo(() => {
    if (!value.trim()) return []
    return getAutocompleteSuggestions(value)
  }, [value])

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false)
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion)
      return
    }
    onSubmit(suggestion.query)
  }

  return (
    <div className="search-field">
      <form
        className="search-box"
        onSubmit={(event) => {
          event.preventDefault()
          setShowSuggestions(false)
          onSubmit(value)
        }}
      >
        <span className="search-icon">⌕</span>
        <input
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          aria-label="Search"
        />
        <button type="submit" className="primary-button">
          Search
        </button>
      </form>

      {showSuggestions && value.trim() && suggestions.length > 0 && (
        <div className="suggestion-menu">
          {suggestions.map((suggestion) => (
            <button
              key={`${suggestion.kind}-${suggestion.id}`}
              type="button"
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <span>{suggestion.label}</span>
              <span className="muted suggestion-kind">{suggestion.kind === 'topic' ? 'Topic' : 'Word'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
