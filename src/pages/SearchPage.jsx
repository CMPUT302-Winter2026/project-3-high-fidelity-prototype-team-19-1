import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AppShell from '../components/AppShell'
import SearchField from '../components/SearchField'
import WordCard from '../components/WordCard'
import { getClosestMatches, getSemanticGapExample, searchWords } from '../data'
import { useApp } from '../AppContext'

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
}

function detectSearchLanguage(query, results) {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return 'english'

  const creeExactMatch = results.some(
    (word) =>
      normalize(word.cree) === normalizedQuery || normalize(word.syllabics) === normalizedQuery,
  )

  return creeExactMatch ? 'cree' : 'english'
}

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const { notify } = useApp()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const results = useMemo(() => searchWords(initialQuery), [initialQuery])
  const closestMatches = useMemo(() => getClosestMatches(initialQuery), [initialQuery])
  const semanticGap = useMemo(() => getSemanticGapExample(initialQuery), [initialQuery])
  const showNoDirectTranslation = initialQuery.trim() && results.length === 0
  const displayLanguage = useMemo(
    () => detectSearchLanguage(initialQuery, results),
    [initialQuery, results],
  )

  return (
    <AppShell title="Search" showBack>
      <SearchField
        value={query}
        onChange={setQuery}
        onSubmit={(value) => navigate(`/search?q=${encodeURIComponent(value)}`)}
        onSelectSuggestion={(suggestion) => {
          if (suggestion.kind === 'topic') {
            navigate(`/topic/${suggestion.id}`)
            return
          }
          navigate(`/search?q=${encodeURIComponent(suggestion.query)}`)
        }}
        placeholder="Try dog, family, elephant, or nôhkom"
      />

      {initialQuery ? (
        <p className="result-count">
          Showing results for <strong>{initialQuery}</strong>
        </p>
      ) : (
        <p className="muted">Enter a word or idea to begin.</p>
      )}

      {results.length > 0 && (
        <div className="stack-list">
          {results.map((word) => (
            <WordCard
              key={word.id}
              word={word}
              displayLanguage={displayLanguage}
              onPlayAudio={(item) => notify(`Audio preview: ${item.cree}`, 'info')}
            />
          ))}
        </div>
      )}

      {showNoDirectTranslation && (
        <section className="empty-state-card">
          <div className="gap-badge">No direct translation</div>
          <h2>
            {semanticGap
              ? `There is no direct one-to-one match for “${semanticGap.label}” in this prototype.`
              : `We could not find an exact one-to-one match for “${initialQuery}”.`}
          </h2>
          <p>
            {semanticGap
              ? semanticGap.description
              : 'This might be a spelling issue, a nearby concept, or a real semantic gap between English and nêhiyawêwin.'}
          </p>

          {semanticGap ? (
            <div className="info-strip semantic-gap-callout">
              <strong>Why this matters</strong>
              <p>{semanticGap.explanation}</p>
            </div>
          ) : null}

          <div className="recovery-buttons">

            <button className="secondary-button" onClick={() => navigate('/categories')}>
              Browse Categories
            </button>
          </div>

            <div className="stack-list compact-stack">
              <h3>Closest matches</h3>
              {closestMatches.map((word) => (
                <WordCard
                  key={word.id}
                  word={word}
                  displayLanguage={displayLanguage}
                  onPlayAudio={(item) => notify(`Audio preview: ${item.cree}`, 'info')}
                />
              ))}
            </div>
        </section>
      )}
    </AppShell>
  )
}
