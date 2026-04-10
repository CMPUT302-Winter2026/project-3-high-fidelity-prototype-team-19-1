import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import AppShell from '../components/AppShell'
import Modal from '../components/Modal'
import { getWord } from '../data'
import { useApp } from '../AppContext'

function normalize(text) {
  return String(text || '').trim().toLowerCase()
}

export default function DetailsPage() {
  const { wordId } = useParams()
  const [searchParams] = useSearchParams()
  const displayLanguage = searchParams.get('lang') === 'cree' ? 'cree' : 'english'
  const { notify, savedTopics, saveWordToTopic } = useApp()
  const word = getWord(wordId)
  const defaultForm = word?.forms?.[0]?.key || null
  const [activeForm, setActiveForm] = useState(defaultForm)
  const [saveOpen, setSaveOpen] = useState(false)
  const [topicFilter, setTopicFilter] = useState('')
  const [newTopicName, setNewTopicName] = useState('')

  const selectedForm = useMemo(() => {
    if (!word?.forms?.length) return null
    return word.forms.find((form) => form.key === activeForm) || word.forms[0]
  }, [word, activeForm])

  const filteredTopics = useMemo(() => {
    const normalizedFilter = normalize(topicFilter)
    if (!normalizedFilter) return savedTopics
    return savedTopics.filter((topic) => normalize(topic.name).includes(normalizedFilter))
  }, [savedTopics, topicFilter])

  if (!word) {
    return (
      <AppShell title="Details" showBack>
        <section className="empty-state-card">
          <h2>That word is not in this prototype.</h2>
        </section>
      </AppShell>
    )
  }

  const handleAddToExisting = (topicId) => {
    saveWordToTopic({ wordId: word.id, topicId })
    setSaveOpen(false)
    setTopicFilter('')
    setNewTopicName('')
  }

  const handleCreateAndAdd = () => {
    if (!newTopicName.trim()) return
    saveWordToTopic({ wordId: word.id, topicName: newTopicName })
    setSaveOpen(false)
    setTopicFilter('')
    setNewTopicName('')
  }

  return (
    <AppShell title="Details" showBack>
      <section className="detail-hero-card">
        <div>
          <p className="eyebrow">Word details</p>
          <h2>{word.cree}</h2>
          <p className="muted">
            {word.english} · {word.syllabics}
          </p>
        </div>
        <div className="detail-hero-actions">
          <button className="icon-button icon-soft" onClick={() => notify(`Audio preview: ${word.cree}`, 'info')}>
            🔊
          </button>
          <button className="primary-button details-cta" onClick={() => setSaveOpen(true)}>
            Save to Topic
          </button>
        </div>
      </section>

      <section className="section-card">
        <h3>Meaning</h3>
        <p>{word.shortDefinition}</p>
        <p className="muted">{word.description}</p>
      </section>

      <section className="section-card two-column-card">
        <div>
          <h3>Pronunciation</h3>
          <p>{word.pronunciation}</p>
        </div>
        <div>
          <h3>Grammar</h3>
          <p>{word.grammar.learner}</p>
        </div>
      </section>

      {word.forms.length > 0 && (
        <section className="section-card">
          <h3>Quick possessor view</h3>
          <div className="segment-control">
            {word.forms.map((form) => (
              <button
                key={form.key}
                className={selectedForm?.key === form.key ? 'segment-active' : 'segment'}
                onClick={() => setActiveForm(form.key)}
              >
                {form.label}
              </button>
            ))}
          </div>
          <div className="form-preview">
            <strong>{selectedForm?.value}</strong>
            <p className="muted">This keeps the kinship forms visible without opening a dense grammar table.</p>
          </div>
        </section>
      )}

      <section className="section-card">
        <h3>Example</h3>
        <p>{word.example}</p>
      </section>

      <section className="section-card">
        <div className="section-header-inline">
          <h3>Related next steps</h3>
          <Link className="secondary-button small" to={`/related/${word.id}?lang=${displayLanguage}`}>
            Related Words
          </Link>
        </div>
        <div className="chip-row compact-chip-row">
          {word.relations.slice(0, 4).map((relation) => {
            const relatedWord = getWord(relation.id)
            if (!relatedWord) return null
            return (
              <Link key={relation.id} className="chip chip-neutral chip-link" to={`/details/${relatedWord.id}`}>
                {relatedWord.english}
              </Link>
            )
          })}
        </div>
      </section>

      {saveOpen && (
        <Modal title="Save to Topic" onClose={() => setSaveOpen(false)} wide>
          <div className="save-flow-block">
            <div>
              <strong>Add “{word.english}” to an existing topic</strong>
              <p className="muted small-copy">Choose one list below, or create a new topic if you need a new set.</p>
            </div>

            <label className="inline-search-card" aria-label="Search saved topics">
              <span className="search-icon">⌕</span>
              <input
                value={topicFilter}
                onChange={(event) => setTopicFilter(event.target.value)}
                placeholder="Search saved topics"
              />
            </label>

            <div className="stack-list compact-stack">
              {filteredTopics.length === 0 ? (
                <div className="preview-box">
                  <strong>No matching topics</strong>
                  <p className="muted small-copy">Create a new topic below.</p>
                </div>
              ) : (
                filteredTopics.map((topic) => {
                  const alreadySaved = topic.words.includes(word.id)
                  return (
                    <div key={topic.id} className="selection-row save-topic-row">
                      <div>
                        <strong>{topic.name}</strong>
                        <p className="muted small-copy">{topic.words.length} word(s)</p>
                      </div>
                      <button
                        className={alreadySaved ? 'secondary-button small disabled-look' : 'primary-button small'}
                        onClick={() => !alreadySaved && handleAddToExisting(topic.id)}
                        disabled={alreadySaved}
                      >
                        {alreadySaved ? 'Added' : 'Add'}
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="save-flow-divider" />

          <div className="save-flow-block">
            <div>
              <strong>Create a new topic</strong>
              <p className="muted small-copy">Example names: My Animals, Week 2 Vocabulary, or Family Review.</p>
            </div>

            <label className="form-field">
              <span>New topic name</span>
              <input
                value={newTopicName}
                onChange={(event) => setNewTopicName(event.target.value)}
                placeholder="My Animals"
              />
            </label>

            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setSaveOpen(false)}>
                Cancel
              </button>
              <button className="primary-button" onClick={handleCreateAndAdd} disabled={!newTopicName.trim()}>
                Create and add
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AppShell>
  )
}
