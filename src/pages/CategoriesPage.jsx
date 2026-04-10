import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { TOPICS, getTopic, getWord } from '../data'

function normalize(text) {
  return String(text || '').trim().toLowerCase()
}

function getTopicPreviewItems(topic) {
  const words = (topic.words || []).map((wordId) => getWord(wordId)).filter(Boolean)
  const wordItems = words.map((word) => ({
    id: word.id,
    type: 'word',
    label: word.english,
    subLabel: word.cree,
    to: `/details/${word.id}`,
  }))

  const gapItems = (topic.semanticGapExamples || []).map((gap) => ({
    id: `gap-${gap.query}`,
    type: 'gap',
    label: gap.label,
    subLabel: 'No direct translation',
    to: `/search?q=${encodeURIComponent(gap.query)}`,
  }))

  return [...wordItems.slice(0, 4), ...gapItems]
}

export default function CategoriesPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filteredTopics = useMemo(() => {
    const normalizedQuery = normalize(query)
    if (!normalizedQuery) return TOPICS.filter((topic) => topic.prototypeReady)

    return TOPICS.filter((topic) => {
      if (!topic.prototypeReady) return false

      const topicMatch = [topic.label, topic.description].join(' ').toLowerCase().includes(normalizedQuery)
      const wordMatch = (topic.words || []).some((wordId) => {
        const word = getWord(wordId)
        if (!word) return false
        return [word.english, word.cree, word.syllabics].join(' ').toLowerCase().includes(normalizedQuery)
      })
      const gapMatch = (topic.semanticGapExamples || []).some((gap) =>
        [gap.label, gap.query, gap.description].join(' ').toLowerCase().includes(normalizedQuery),
      )

      return topicMatch || wordMatch || gapMatch
    })
  }, [query])

  return (
    <AppShell title="Categories">
      <section className="hero-card compact-card">
        <div>
          <p className="eyebrow">Browse all topics</p>
          <h2>Find a category or a sample node</h2>
          <p className="muted">Use search to jump to a topic, then open its network to explore more words.</p>
        </div>
        <label className="inline-search-card" aria-label="Search categories">
          <span className="search-icon">⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search Animals, family, fish, elephant..."
          />
        </label>
      </section>

      <section className="stack-list">
        {filteredTopics.length === 0 ? (
          <section className="empty-state-card">
            <h2>No matching categories</h2>
            <p>Try a topic name like Animals, or a word like fish or grandmother.</p>
            <button className="secondary-button" onClick={() => setQuery('')}>
              Clear search
            </button>
          </section>
        ) : (
          filteredTopics.map((topic) => {
            const previewItems = getTopicPreviewItems(topic)
            return (
              <article key={topic.id} className="category-panel">
                <div className="category-panel-top">
                  <div>
                    <p className="eyebrow">{topic.icon} Category</p>
                    <h3>{topic.label}</h3>
                    <p className="muted">{topic.description}</p>
                  </div>
                  <button className="primary-button small" onClick={() => navigate(`/topic/${topic.id}`)}>
                    Open topic
                  </button>
                </div>

                <div className="preview-node-grid">
                  {previewItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.to}
                      className={item.type === 'gap' ? 'preview-node-card preview-node-gap' : 'preview-node-card'}
                    >
                      <strong>{item.label}</strong>
                      <span>{item.subLabel}</span>
                    </Link>
                  ))}
                </div>
              </article>
            )
          })
        )}
      </section>
    </AppShell>
  )
}
