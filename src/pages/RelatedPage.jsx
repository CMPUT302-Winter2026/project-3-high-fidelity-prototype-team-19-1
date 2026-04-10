import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import AppShell from '../components/AppShell'
import { getWord } from '../data'
import { useApp } from '../AppContext'

function getDisplayText(word, displayLanguage) {
  const isCreeFirst = displayLanguage === 'cree'

  return {
    title: isCreeFirst ? word.cree : word.english,
    form: word.syllabics || '',
    translation: isCreeFirst ? word.english : word.cree,
  }
}

function RelationBubble({ word, position, displayLanguage }) {
  const cree = word.cree || word.english
  const english = word.english || word.cree
  const form = word.syllabics || ''

  return (
    <Link className="relation-bubble" to={`/related/${word.id}?lang=${displayLanguage}`} style={position}>
      <strong>{cree}</strong>
      {form ? <small>{form}</small> : null}
      <span>{english}</span>
    </Link>
  )
}

const relationPositions = [
  { top: '7%', left: '35%' },
  { top: '54%', left: '6%' },
  { top: '54%', left: '67%' },
  { top: '77%', left: '35%' },
]

export default function RelatedPage() {
  const { wordId } = useParams()
  const [searchParams] = useSearchParams()
  const displayLanguage = searchParams.get('lang') === 'cree' ? 'cree' : 'english'
  const { notify } = useApp()
  const [showAll, setShowAll] = useState(false)

  const word = getWord(wordId)

  const allRelations = useMemo(() => {
    if (!word) return []
    return word.relations
      .map((relation) => ({ ...relation, word: getWord(relation.id) }))
      .filter((relation) => relation.word)
  }, [word])

  if (!word) {
    return (
      <AppShell title="Related Words" showBack>
        <section className="empty-state-card">
          <h2>That word is not in this prototype.</h2>
        </section>
      </AppShell>
    )
  }

  const focusCree = word.cree || word.english
  const focusEnglish = word.english || word.cree
  const focusForm = word.syllabics || ''
  const visibleRelations = showAll ? allRelations : allRelations.slice(0, 4)

  return (
    <AppShell title="Related Words" showBack>
      <section className="detail-hero-card">
        <div>
          <p className="eyebrow">Current focus</p>
          <h2>{focusCree}</h2>
          {focusForm ? <p className="muted">{focusForm}</p> : null}
          <p className="muted">{focusEnglish}</p>
        </div>
        <div className="detail-hero-actions">
          <button className="icon-button icon-soft" onClick={() => notify(`Audio preview: ${word.cree}`, 'info')}>
            🔊
          </button>
          <Link className="primary-button small details-prominent" to={`/details/${word.id}?lang=${displayLanguage}`}>
            Open Details
          </Link>
        </div>
      </section>

      <section className="relationship-map-card compact-map-card">
        <div className="focus-bubble">
          <strong>{focusCree}</strong>
          {focusForm ? <small>{focusForm}</small> : null}
          <span>{focusEnglish}</span>
        </div>

        {allRelations.slice(0, 4).map((relation, index) => (
          <RelationBubble
            key={relation.word.id}
            word={relation.word}
            position={relationPositions[index]}
            displayLanguage={displayLanguage}
          />
        ))}
      </section>

      <section className="section-card">
        <div className="section-header-inline">
          <div>
            <h3>Nearby words</h3>
            <p className="muted">This page is only for exploration. Saving now starts from the Details page.</p>
          </div>
          {allRelations.length > 4 ? (
            <button className="secondary-button small" onClick={() => setShowAll((value) => !value)}>
              {showAll ? 'Show fewer' : 'Show all'}
            </button>
          ) : null}
        </div>

        <div className="stack-list compact-stack">
          {visibleRelations.map((relation) => {
            const relationText = getDisplayText(relation.word, displayLanguage)
            return (
              <article key={relation.word.id} className="related-list-card">
                <div>
                  <div className="chip-row compact-chip-row">
                    <span className="chip chip-soft">{relation.label}</span>
                  </div>
                  <h3>{relationText.title}</h3>
                  {relationText.form ? <p className="cree-line">{relationText.form}</p> : null}
                  <p className="muted">{relationText.translation}</p>
                </div>
                <div className="card-actions vertical-actions related-actions">
                  <Link className="primary-button small details-prominent" to={`/details/${relation.word.id}?lang=${displayLanguage}`}>
                    Details
                  </Link>
                  <Link className="secondary-button small" to={`/related/${relation.word.id}?lang=${displayLanguage}`}>
                    Explore
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </AppShell>
  )
}
