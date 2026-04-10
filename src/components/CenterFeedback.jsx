import { useApp } from '../AppContext'

export default function CenterFeedback() {
  const { centerFeedback } = useApp()

  if (!centerFeedback) return null

  return (
    <div className="center-feedback-overlay" aria-live="assertive" aria-atomic="true">
      <div className={`center-feedback-card ${centerFeedback.tone || 'success'}`}>
        <div className="center-feedback-icon" aria-hidden="true">
          {centerFeedback.icon || '✓'}
        </div>
        <strong>{centerFeedback.title}</strong>
        {centerFeedback.message ? <p>{centerFeedback.message}</p> : null}
      </div>
    </div>
  )
}
