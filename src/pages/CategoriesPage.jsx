import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { TOPICS, getWord } from '../data'
import { useApp } from '../AppContext'

function normalize(text) {
  return String(text || '').trim().toLowerCase()
}

export default function CategoriesPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { notify } = useApp()

  const filteredTopics = useMemo(() => {
    const normalizedQuery = normalize(query)

    if (!normalizedQuery) return TOPICS

    return TOPICS.filter((topic) => {
      const topicMatch = [topic.label, topic.description]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)

      const wordMatch = (topic.words || []).some((wordId) => {
        const word = getWord(wordId)
        if (!word) return false

        return [word.english, word.cree, word.syllabics]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      })

      const gapMatch = (topic.semanticGapExamples || []).some((gap) =>
        [gap.label, gap.query, gap.description]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)
      )

      return topicMatch || wordMatch || gapMatch
    })
  }, [query])

  return (
    <AppShell title="Categories">
      {/* 🔍 YOUR ORIGINAL STYLE SEARCH (NOT homepage one) */}
      <section className="hero-card compact-card">
        <div>
          <p className="eyebrow">Browse all topics</p>
          <h2>Find a category</h2>
        </div>

        <label className="inline-search-card" aria-label="Search categories">
          <span className="search-icon">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Animals, family, fish, elephant..."
          />
        </label>
      </section>

      {/* 🧱 SAME CARDS AS HOMEPAGE */}
      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Browse Topics</p>
            <h2>All categories</h2>
          </div>
        </div>

        <div className="topic-grid">
          {filteredTopics.length === 0 ? (
            <div className="empty-state-card">
              <h3>No matching categories</h3>
              <p>Try Animals, fish, or grandmother.</p>
              <button
                className="secondary-button"
                onClick={() => setQuery('')}
              >
                Clear search
              </button>
            </div>
          ) : (
            filteredTopics.map((topic) => (
              <button
                key={topic.id}
                className={`topic-card ${
                  topic.prototypeReady ? '' : 'disabled-card'
                }`}
                onClick={() => {
                  if (!topic.prototypeReady) {
                    notify(
                      `${topic.label} is planned for a later prototype round.`,
                      'info'
                    )
                    return
                  }
                  navigate(`/topic/${topic.id}`)
                }}
              >
                <span className="topic-emoji" aria-hidden="true">
                  {topic.icon}
                </span>

                <strong>{topic.label}</strong>

                <p>{topic.description}</p>

                {!topic.prototypeReady && (
                  <span className="chip chip-neutral">
                    Prototype later
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </section>
    </AppShell>
  )
}