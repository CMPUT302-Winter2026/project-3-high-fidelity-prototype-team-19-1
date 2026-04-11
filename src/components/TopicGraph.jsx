import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getWord } from '../data'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

function px(value) {
  return `${Math.round(value)}px`
}

export default function TopicGraph({ topic, words, expanded }) {
  const viewportRef = useRef(null)
  const pointerRef = useRef({ id: null, startX: 0, startY: 0, originX: 0, originY: 0, moved: false })
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [dragging, setDragging] = useState(false)
  const PAN_LIMIT = 100 / zoom

  useEffect(() => {
    setPan({ x: 0, y: 0 })
    setZoom(1)
  }, [topic.id, expanded])

  const graph = useMemo(() => {
    if (topic.id === 'animals') {
      const dog = getWord('atim')
      const cat = getWord('minos')
      const fish = getWord('kinosew')
      const puppy = getWord('acimosis')
      const kitten = getWord('minosis')

      const nodes = [
        dog && { id: dog.id, word: dog, x: 25, y: 30, kind: 'primary', to: `/related/${dog.id}` },
        cat && { id: cat.id, word: cat, x: 75, y: 30, kind: 'primary', to: `/related/${cat.id}` },
        {
          id: 'gap-elephant',
          label: 'elephant',
          subLabel: 'No direct translation',
          x: 25,
          y: 74,
          kind: 'gap',
          to: '/related/elephant',
        },
        fish && { id: fish.id, word: fish, x: 75, y: 74, kind: 'primary', to: `/related/${fish.id}` },
      ].filter(Boolean)

      const edges = [
        { from: 'topic', to: dog?.id },
        { from: 'topic', to: cat?.id },
        { from: 'topic', to: 'gap-elephant' },
        { from: 'topic', to: fish?.id },
      ].filter((edge) => edge.to)

      if (expanded) {
        if (puppy) {
          nodes.push({ id: puppy.id, word: puppy, x: 10, y: 56, kind: 'secondary', to: `/related/${puppy.id}` })
          edges.push({ from: dog?.id, to: puppy.id })
        }
        if (kitten) {
          nodes.push({ id: kitten.id, word: kitten, x: 90, y: 56, kind: 'secondary', to: `/related/${kitten.id}` })
          edges.push({ from: cat?.id, to: kitten.id })
        }
      }

      const positionsById = Object.fromEntries(nodes.map((node) => [node.id, node]))
      return { nodes, positionsById, edges }
    }

    if (topic.id === 'kinship') {
      const grandmother = getWord('nohkom')
      const grandfather = getWord('nimosom')
      const mother = getWord('nikawiy')
      const father = getWord('nohtawiy')
      const sibling = getWord('nitisan')
      const son = getWord('nikosis')

      const nodes = [
        grandmother && { id: grandmother.id, word: grandmother, x: 25, y: 30, kind: 'primary', to: `/related/${grandmother.id}` },
        grandfather && { id: grandfather.id, word: grandfather, x: 75, y: 30, kind: 'primary', to: `/related/${grandfather.id}` },
        mother && { id: mother.id, word: mother, x: 25, y: 74, kind: 'primary', to: `/related/${mother.id}` },
        father && { id: father.id, word: father, x: 75, y: 74, kind: 'primary', to: `/related/${father.id}` },
      ].filter(Boolean)

      const edges = nodes.map((node) => ({ from: 'topic', to: node.id }))

      if (expanded) {
        if (sibling) {
          nodes.push({ id: sibling.id, word: sibling, x: 15, y: 52, kind: 'primary', to: `/related/${sibling.id}` })
          edges.push({ from: 'topic', to: sibling.id })
        }
        if (son) {
          nodes.push({ id: son.id, word: son, x: 85, y: 52, kind: 'primary', to: `/related/${son.id}` })
          edges.push({ from: 'topic', to: son.id })
        }
      }

      const positionsById = Object.fromEntries(nodes.map((node) => [node.id, node]))
      return { nodes, positionsById, edges }
    }

    if (topic.id === 'weather') {
      const rain = getWord('kimiwan')
      const snow = getWord('mispon')
      const sun = getWord('pisim')
      const northWind = getWord('kiwetin')
      const hot = getWord('kisastew')

      const nodes = [
        rain && { id: rain.id, word: rain, x: 50, y: 22, kind: 'primary', to: `/related/${rain.id}` },
        snow && { id: snow.id, word: snow, x: 25, y: 72, kind: 'primary', to: `/related/${snow.id}` },
        sun && { id: sun.id, word: sun, x: 75, y: 72, kind: 'primary', to: `/related/${sun.id}` },
      ].filter(Boolean)
      const edges = nodes.map((node) => ({ from: 'topic', to: node.id }))

      if (expanded) {
        if (northWind) {
          nodes.push({ id: northWind.id, word: northWind, x: 15, y: 48, kind: 'primary', to: `/related/${northWind.id}` })
          edges.push({ from: 'topic', to: northWind.id })
        }
        if (hot) {
          nodes.push({ id: hot.id, word: hot, x: 86, y: 48, kind: 'primary', to: `/related/${hot.id}` })
          edges.push({ from: 'topic', to: hot.id })
        }
      }
      const positionsById = Object.fromEntries(nodes.map((node) => [node.id, node]))
      return { nodes, positionsById, edges }
    }

    if (topic.id === 'body') {
      const head = getWord('mistikwan')
      const hand = getWord('micihciy')
      const foot = getWord('misit')
      const eye = getWord('miskisik')
      const mouth = getWord('miton')

      const nodes = [
        head && { id: head.id, word: head, x: 50, y: 22, kind: 'primary', to: `/related/${head.id}` },
        hand && { id: hand.id, word: hand, x: 25, y: 72, kind: 'primary', to: `/related/${hand.id}` },
        foot && { id: foot.id, word: foot, x: 75, y: 72, kind: 'primary', to: `/related/${foot.id}` },
      ].filter(Boolean)
      const edges = nodes.map((node) => ({ from: 'topic', to: node.id }))

      if (expanded) {
        if (eye) {
          nodes.push({ id: eye.id, word: eye, x: 15, y: 48, kind: 'primary', to: `/related/${eye.id}` })
          edges.push({ from: 'topic', to: eye.id })
        }
        if (mouth) {
          nodes.push({ id: mouth.id, word: mouth, x: 86, y: 48, kind: 'primary', to: `/related/${mouth.id}` })
          edges.push({ from: 'topic', to: mouth.id })
        }
      }
      const positionsById = Object.fromEntries(nodes.map((node) => [node.id, node]))
      return { nodes, positionsById, edges }
    }

    const primaryWords = expanded ? words : words.slice(0, 4)

    const nodes = primaryWords.map((word, index) => ({
      id: word.id,
      word,
      x: 18 + (index % 2) * 64,
      y: 28 + Math.floor(index / 2) * 36,
      kind: 'primary',
      to: `/related/${word.id}`,
    }))

    const positionsById = Object.fromEntries(nodes.map((node) => [node.id, node]))
    const edges = nodes.map((node) => ({ from: 'topic', to: node.id }))

    return { nodes, positionsById, edges }
  }, [words, expanded, topic.id])

  const onPointerDown = (event) => {
    if (!viewportRef.current) return
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
      moved: false,
    }
    viewportRef.current.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  const onPointerMove = (event) => {
    const pointer = pointerRef.current
    if (pointer.id !== event.pointerId) return
    const dx = event.clientX - pointer.startX
    const dy = event.clientY - pointer.startY
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      pointer.moved = true
    }
    const nextX = clamp(pointer.originX + dx, -PAN_LIMIT, PAN_LIMIT)
    const nextY = clamp(pointer.originY + dy, -PAN_LIMIT, PAN_LIMIT)

    setPan({ x: nextX, y: nextY })
  }

  const onPointerUp = (event) => {
    const pointer = pointerRef.current
    if (pointer.id !== event.pointerId) return
    setDragging(false)
    pointerRef.current.id = null
    pointerRef.current.moved = false
  }

  const onWheel = (event) => {
    event.preventDefault()
    pointerRef.current.moved = false
    const direction = event.deltaY > 0 ? -1 : 1
    const next = clamp(zoom + direction * 0.08, 0.6, 1.8)
    setZoom(next)
  }

  return (
    <div className={`graph-card graph-network-card graph-card-topic ${expanded ? 'expanded' : ''}`}>
      <div
        ref={viewportRef}
        className={dragging ? 'graph-viewport is-dragging' : 'graph-viewport'}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        role="application"
        aria-label="Topic word network. Drag to pan, scroll to zoom."
      >
        <div className="graph-world" style={{ transform: `translate(${px(pan.x)}, ${px(pan.y)}) scale(${zoom})` }}>
          <svg className="graph-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {graph.edges.map((edge, index) => {
              const from = edge.from === 'topic' ? { x: 50, y: 50 } : graph.positionsById[edge.from]
              const to = graph.positionsById[edge.to]
              if (!from || !to) return null
              return (
                <line
                  key={`${edge.from}-${edge.to}-${index}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={edge.from === 'topic' ? 'graph-line graph-line-strong' : 'graph-line graph-line-child'}
                />
              )
            })}
          </svg>

          <div className="topic-center-node">
            <div className="topic-icon">{topic.icon}</div>
            <strong>{topic.label}</strong>
          </div>

          {graph.nodes.map((node) => {
            const title = node.word?.english || node.label
            const subTitle = node.word?.cree || node.subLabel
            const className =
              node.kind === 'gap'
                ? 'graph-node graph-node-circle graph-node-gap'
                : node.kind === 'secondary'
                  ? 'graph-node graph-node-circle graph-node-secondary'
                  : 'graph-node graph-node-circle graph-node-primary'

            return (
              <Link
                onPointerDown={(e) => e.stopPropagation()}
                key={node.id}
                to={node.to}
                className={className}
                style={{ top: `${node.y}%`, left: `${node.x}%` }}
              >
                <span>{title}</span>
                <small>{subTitle}</small>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
