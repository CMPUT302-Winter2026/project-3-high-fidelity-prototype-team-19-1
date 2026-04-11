import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import AppShell from '../components/AppShell'
import Modal from '../components/Modal'
import { getWord } from '../data'
import { useApp } from '../AppContext'

function normalize(text) {
  return String(text || '').trim().toLowerCase()
}

export default function SavedPage() {
  const { savedTopics, createTopic, deleteTopic, removeWordFromTopic, showCenterFeedback } = useApp()
  const [viewTopicId, setViewTopicId] = useState(null)
  const [deleteTopicState, setDeleteTopicState] = useState(null)
  const [search, setSearch] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [newTopicName, setNewTopicName] = useState('')
  const [newTopicNote, setNewTopicNote] = useState('')

  const viewTopic = savedTopics.find((topic) => topic.id === viewTopicId) || null

  const filteredTopics = useMemo(() => {
    const normalizedSearch = normalize(search)
    if (!normalizedSearch) return savedTopics

    return savedTopics.filter((topic) => {
      const topicText = [topic.name, topic.note].join(' ').toLowerCase()
      const wordText = topic.words
        .map((wordId) => {
          const word = getWord(wordId)
          return word ? `${word.english} ${word.cree}` : ''
        })
        .join(' ')
        .toLowerCase()

      return topicText.includes(normalizedSearch) || wordText.includes(normalizedSearch)
    })
  }, [savedTopics, search])

  const handleCreateTopic = () => {
    if (!newTopicName.trim()) return
    createTopic({ name: newTopicName, note: newTopicNote })
    showCenterFeedback({ title: 'Topic created', message: `Created “${newTopicName.trim()}”.` })
    setCreateOpen(false)
    setNewTopicName('')
    setNewTopicNote('')
  }

  return (
    <AppShell title="Saved Topics">
      <section className="hero-card compact-card">
        <div className="saved-toolbar">
          <label className="inline-search-card" aria-label="Search saved topics">
            <span className="search-icon">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search topics"
            />
          </label>
          <button className="primary-button" onClick={() => setCreateOpen(true)}>
            Create Topic
          </button>
        </div>
      </section>

      {savedTopics.length === 0 ? (
        <section className="empty-state-card">
          <h2>No topics saved yet.</h2>
          <p>Save a word from the Details page or create an empty topic here.</p>
          <div className="card-actions">
            <button className="primary-button" onClick={() => setCreateOpen(true)}>
              Create Topic
            </button>
            <Link className="secondary-button" to="/categories">
              Browse Categories
            </Link>
          </div>
        </section>
      ) : filteredTopics.length === 0 ? (
        <section className="empty-state-card">
          <h2>No matching saved topics</h2>
          <p>Try a different search, or create a new topic.</p>
          <div className="card-actions">
            <button className="secondary-button" onClick={() => setSearch('')}>
              Clear search
            </button>
            <button className="primary-button" onClick={() => setCreateOpen(true)}>
              Create Topic
            </button>
          </div>
        </section>
      ) : (
        <div className="stack-list">
          {filteredTopics.map((topic) => (
            <article key={topic.id} className="topic-list-card">
              <div>
                <h3>{topic.name}</h3>
                <p className="muted">{topic.words.length} word(s)</p>
                {topic.note ? <p className="small-copy muted">{topic.note}</p> : null}
              </div>
              <div className="card-actions vertical-actions">
                <button className="secondary-button small" onClick={() => setViewTopicId(topic.id)}>
                  View
                </button>
                <button className="danger-button small" onClick={() => setDeleteTopicState(topic)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {viewTopic && (
        <Modal title={viewTopic.name} onClose={() => setViewTopicId(null)} wide>
          <div className="stack-list compact-stack">
            {viewTopic.words.length === 0 ? (
              <div className="preview-box">
                <strong>No words yet</strong>
                <p className="muted small-copy">Add words from any Details page.</p>
              </div>
            ) : (
              viewTopic.words.map((wordId) => {
                const word = getWord(wordId)
                if (!word) return null
                return (
                  <div key={wordId} className="selection-row">
                    <div>
                      <strong>{word.english}</strong>
                      <p className="muted small-copy">{word.cree}</p>
                    </div>
                    <div className="mini-actions">
                      <Link className="primary-button small details-prominent" to={`/details/${word.id}`} onClick={() => setViewTopicId(null)}>
                        Details
                      </Link>
                      <button className="danger-button small" onClick={() => removeWordFromTopic(viewTopic.id, word.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Modal>
      )}

      {createOpen && (
        <Modal title="Create Topic" onClose={() => setCreateOpen(false)}>
          <label className="form-field">
            <span>Topic name</span>
            <input
              value={newTopicName}
              onChange={(event) => setNewTopicName(event.target.value)}
              placeholder="My Animals"
            />
          </label>
          <label className="form-field">
            <span>Optional note</span>
            <input
              value={newTopicNote}
              onChange={(event) => setNewTopicNote(event.target.value)}
              placeholder="Study list for next class"
            />
          </label>
          <div className="modal-actions">
            <button className="secondary-button" onClick={() => setCreateOpen(false)}>
              Cancel
            </button>
            <button className="primary-button" onClick={handleCreateTopic} disabled={!newTopicName.trim()}>
              Create Topic
            </button>
          </div>
        </Modal>
      )}

      {deleteTopicState && (
        <Modal title="Delete topic?" onClose={() => setDeleteTopicState(null)}>
          <p>
            Are you sure you want to delete <strong>{deleteTopicState.name}</strong>?
          </p>
          <div className="modal-actions">
            <button className="secondary-button" onClick={() => setDeleteTopicState(null)}>
              No
            </button>
            <button
              className="danger-button"
              onClick={() => {
                deleteTopic(deleteTopicState.id)
                setDeleteTopicState(null)
              }}
            >
              Yes, delete
            </button>
          </div>
        </Modal>
      )}
    </AppShell>
  )
}
