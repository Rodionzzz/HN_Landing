import { useCallback, useEffect, useRef, useState } from 'react'
import './ZoneModal.css'

// Окно зоны (ярмарка, бар, шатёр…). Каркас и анимации — как у окна
// группы (классы artist-modal-* из App.css), сверху — слайдшоу:
// фото листаются сами, свайпом/перетаскиванием, стрелками и клавишами.

const AUTOPLAY_MS = 5000
const SWIPE_THRESHOLD = 45

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ZoneModal({ zone, hours, onClose }) {
  const [index, setIndex] = useState(0)
  // cycle перезапускает таймер и полоску прогресса при ручном листании
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const drag = useRef(null)
  const [autoplay] = useState(() => !prefersReducedMotion())

  const photos = zone?.photos || []
  const count = photos.length

  const go = useCallback(
    (step) => {
      if (count < 2) {
        return
      }
      setIndex((current) => (current + step + count) % count)
      setCycle((current) => current + 1)
    },
    [count],
  )

  useEffect(() => {
    if (!zone) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    document.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [zone, onClose, go])

  // Автолистание: таймер заново заводится после каждой смены фото
  useEffect(() => {
    if (!autoplay || paused || dragging || count < 2) {
      return
    }

    const timer = setTimeout(() => go(1), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [autoplay, paused, dragging, count, cycle, go])

  if (!zone) {
    return null
  }

  // ---------- Свайп (палец) и перетаскивание (мышь) ----------

  const handlePointerDown = (event) => {
    if (count < 2 || event.button > 0 || event.target.closest('button')) {
      return
    }
    drag.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
  }

  const handlePointerMove = (event) => {
    const start = drag.current
    if (!start || start.id !== event.pointerId) {
      return
    }

    const dx = event.clientX - start.x
    const dy = event.clientY - start.y

    if (!dragging) {
      // Вертикальное движение — это прокрутка окна, не свайп
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        drag.current = null
        return
      }
      if (Math.abs(dx) < 8) {
        return
      }
      event.currentTarget.setPointerCapture?.(event.pointerId)
      setDragging(true)
    }

    setDragX(dx)
  }

  const handlePointerEnd = () => {
    if (!drag.current) {
      return
    }

    if (dragX <= -SWIPE_THRESHOLD) go(1)
    if (dragX >= SWIPE_THRESHOLD) go(-1)

    drag.current = null
    setDragging(false)
    setDragX(0)
  }

  const handleBackdropMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const current = photos[index]

  return (
    <div
      className="artist-modal zone-modal"
      onMouseDown={handleBackdropMouseDown}
      role="dialog"
      aria-modal="true"
      aria-label={zone.title}
    >
      {/* Размытый фон — текущее фото зоны */}
      <div
        className="artist-modal-background"
        style={current ? { backgroundImage: `url(${current})` } : undefined}
      />
      <div className="artist-modal-background-overlay" />

      <div className="artist-modal-window zone-modal-window">
        <div className="artist-modal-embers" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <button
          type="button"
          className="artist-modal-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <span></span>
          <span></span>
        </button>

        <div className="artist-modal-content">
          <header className="artist-modal-header zone-modal-header">
            {count > 0 ? (
              <div
                className={`zone-slider${dragging ? ' is-dragging' : ''}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div
                  className="zone-slider-track"
                  style={{
                    transform: `translate3d(calc(${-index * 100}% + ${dragX}px), 0, 0)`,
                  }}
                >
                  {photos.map((src, i) => (
                    <div
                      key={src}
                      className={`zone-slide${i === index ? ' is-active' : ''}`}
                    >
                      <img
                        // перезапуск «наезда камеры» на каждом показе
                        key={i === index ? `on-${cycle}` : 'off'}
                        src={src}
                        alt={`${zone.title} — фото ${i + 1}`}
                        draggable="false"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  ))}
                </div>

                <div className="artist-modal-cover-overlay" />

                {count > 1 && (
                  <>
                    <div className="zone-slider-progress" aria-hidden="true">
                      {photos.map((src, i) => (
                        <span
                          key={src}
                          className={i < index ? 'is-done' : undefined}
                        >
                          {i === index && (
                            <i
                              key={cycle}
                              className={
                                autoplay ? 'is-running' : 'is-static'
                              }
                              style={{
                                animationDuration: `${AUTOPLAY_MS}ms`,
                                animationPlayState:
                                  paused || dragging ? 'paused' : 'running',
                              }}
                            />
                          )}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="zone-slider-arrow is-prev"
                      onClick={() => go(-1)}
                      aria-label="Предыдущее фото"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      className="zone-slider-arrow is-next"
                      onClick={() => go(1)}
                      aria-label="Следующее фото"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="zone-slider zone-slider-empty">
                <span
                  className={`sch-zone-icon is-${zone.id}`}
                  aria-hidden="true"
                >
                  {zone.icon}
                </span>
                <small>Фото появятся ближе к ночи</small>
              </div>
            )}

            <div className="artist-modal-title-block">
              <h2>{zone.title}</h2>
              <p>Работает всю ночь · {hours}</p>
            </div>
          </header>

          <section className="artist-modal-section">
            <div className="artist-modal-section-label">О ЗОНЕ</div>
            <div className="artist-modal-section-content">
              <p className="artist-modal-description">{zone.description}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ZoneModal
