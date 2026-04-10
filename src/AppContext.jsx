import { createContext, useContext, useMemo, useState } from 'react'
import { getInitialSavedTopics } from './data'

const AppContext = createContext(null)

function makeToast(message, tone = 'success') {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    message,
    tone,
  }
}

function makeCenterFeedback({
  title,
  message = '',
  tone = 'success',
  icon = '✓',
}) {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    message,
    tone,
    icon,
  }
}

function normalize(text) {
  return String(text || '').trim().toLowerCase()
}

export function AppProvider({ children }) {
  const [savedTopics, setSavedTopics] = useState(getInitialSavedTopics())
  const [toasts, setToasts] = useState([])
  const [centerFeedback, setCenterFeedback] = useState(null)

  const notify = (message, tone = 'success') => {
    const toast = makeToast(message, tone)
    setToasts((current) => [...current, toast])
    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== toast.id))
    }, 2800)
  }

  const showCenterFeedback = ({ title, message = '', tone = 'success', icon = '✓' }) => {
    const feedback = makeCenterFeedback({ title, message, tone, icon })
    setCenterFeedback(feedback)
    window.setTimeout(() => {
      setCenterFeedback((current) => (current?.id === feedback.id ? null : current))
    }, 1700)
  }

  const createTopic = ({ name, note = '' }) => {
    const topicName = name.trim() || 'Untitled topic'
    let createdTopic = null

    setSavedTopics((current) => {
      const existing = current.find((topic) => normalize(topic.name) === normalize(topicName))
      if (existing) {
        createdTopic = existing
        return current
      }

      createdTopic = {
        id: `topic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        name: topicName,
        words: [],
        note,
      }

      return [createdTopic, ...current]
    })

    return createdTopic || {
      id: `topic-pending-${Date.now()}`,
      name: topicName,
      words: [],
      note,
    }
  }

  const addWordsToTopic = ({ topicId, wordIds, announce = true }) => {
    let topicName = 'Topic'
    let addedCount = 0

    setSavedTopics((current) =>
      current.map((topic) => {
        if (topic.id !== topicId) return topic
        topicName = topic.name
        const merged = Array.from(new Set([...topic.words, ...wordIds]))
        addedCount = merged.length - topic.words.length
        return { ...topic, words: merged }
      }),
    )

    if (announce && addedCount > 0) {
      showCenterFeedback({
        title: 'Saved',
        message: `Added to “${topicName}”.`,
      })
    }

    if (announce && addedCount === 0) {
      notify(`This word is already in “${topicName}”.`, 'info')
    }

    return { topicName, addedCount }
  }

  const saveWordToTopic = ({ wordId, topicId = '', topicName = '' }) => {
    if (topicId) {
      return addWordsToTopic({ topicId, wordIds: [wordId], announce: true })
    }

    const createdTopic = createTopic({ name: topicName })
    const result = addWordsToTopic({ topicId: createdTopic.id, wordIds: [wordId], announce: false })
    showCenterFeedback({
      title: 'Topic created',
      message: `Saved to “${createdTopic.name}”.`,
    })
    return result
  }

  const saveTopic = ({ name, words, note = '' }) => {
    const createdTopic = createTopic({ name, note })
    addWordsToTopic({ topicId: createdTopic.id, wordIds: words, announce: false })
    showCenterFeedback({
      title: 'Topic saved',
      message: `Saved to “${createdTopic.name}”.`,
    })
  }

  const deleteTopic = (topicId) => {
    setSavedTopics((current) => current.filter((topic) => topic.id !== topicId))
    notify('Topic deleted.', 'danger')
  }

  const removeWordFromTopic = (topicId, wordId) => {
    let topicName = 'Topic'
    setSavedTopics((current) =>
      current.map((topic) => {
        if (topic.id !== topicId) return topic
        topicName = topic.name
        return { ...topic, words: topic.words.filter((id) => id !== wordId) }
      }),
    )
    notify(`Word removed from “${topicName}”.`, 'info')
  }

  const value = useMemo(
    () => ({
      savedTopics,
      createTopic,
      addWordsToTopic,
      saveWordToTopic,
      saveTopic,
      deleteTopic,
      removeWordFromTopic,
      notify,
      showCenterFeedback,
      toasts,
      centerFeedback,
    }),
    [savedTopics, toasts, centerFeedback],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
