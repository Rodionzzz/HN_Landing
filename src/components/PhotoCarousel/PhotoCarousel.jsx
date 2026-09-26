import { useEffect, useRef, useState } from 'react'
import { photos } from '../../data/photos'

const AUTOPLAY_INTERVAL = 5000
const SWIPE_THRESHOLD = 50

// Свайп мышью/тачем: даёт живой drag-эффект (как перелистывание
// обложек в Apple Music) и сообщает, было ли движение свайпом,
// чтобы отличить его от обычного клика/тапа.
function useSwipeNav({ onSwipeLeft, onSwipeRight, disabled = false }) {
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const isDraggingRef = useRef(false)
  const draggedRef = useRef(false)
  const dragXRef = useRef(0)

  const [dragX, setDragX] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePointerDown = (event) => {
    if (disabled) return

    isDraggingRef.current = true
    draggedRef.current = false

    startXRef.current = event.clientX
    startYRef.current = event.clientY

    setIsAnimating(false)
  }

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current || disabled) return

    const deltaX = event.clientX - startXRef.current
    const deltaY = event.clientY - startYRef.current

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return
    }

    if (Math.abs(deltaX) > 8) {
      draggedRef.current = true
    }

    dragXRef.current = deltaX
    setDragX(deltaX)
  }

  const endDrag = () => {
    if (!isDraggingRef.current) return

    isDraggingRef.current = false

    const delta = dragXRef.current

    setIsAnimating(true)
    setDragX(0)
    dragXRef.current = 0

    if (delta <= -SWIPE_THRESHOLD) {
      onSwipeLeft?.()
    } else if (delta >= SWIPE_THRESHOLD) {
      onSwipeRight?.()
    }

    window.setTimeout(() => {
      draggedRef.current = false
    }, 0)
  }

  return {
    dragX,
    isAnimating,
    wasDragged: () => draggedRef.current,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: endDrag,
      onPointerLeave: endDrag,
      onPointerCancel: endDrag,
    },
  }
}

function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const total = photos.length

  const previousIndex = total
    ? (currentIndex - 1 + total) % total
    : 0

  const nextIndex = total
    ? (currentIndex + 1) % total
    : 0

  const goPrevious = () => {
    setCurrentIndex(previousIndex)
  }

  const goNext = () => {
    setCurrentIndex(nextIndex)
  }

  const goLightboxPrevious = () => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev - 1 + total) % total
    )
  }

  const goLightboxNext = () => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % total
    )
  }

  const carouselSwipe = useSwipeNav({
    onSwipeLeft: goNext,
    onSwipeRight: goPrevious,
    disabled: total < 2,
  })

  const lightboxSwipe = useSwipeNav({
    onSwipeLeft: goLightboxNext,
    onSwipeRight: goLightboxPrevious,
    disabled: total < 2,
  })

  // Автолистание карусели
  useEffect(() => {
    if (!total || total < 2 || isPaused || isArchiveOpen || lightboxIndex !== null) {
      return
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [total, isPaused, isArchiveOpen, lightboxIndex])

  // Esc закрывает верхний открытый слой, стрелки листают фото в лайтбоксе
  useEffect(() => {
    if (!isArchiveOpen && lightboxIndex === null) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (lightboxIndex !== null) {
          setLightboxIndex(null)
        } else {
          closeArchive()
        }
        return
      }

      if (lightboxIndex === null) {
        return
      }

      if (event.key === 'ArrowLeft') {
        goLightboxPrevious()
      } else if (event.key === 'ArrowRight') {
        goLightboxNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isArchiveOpen, lightboxIndex])

  const openArchive = () => {
    setIsArchiveOpen(true)
  }

  const closeArchive = () => {
    setIsArchiveOpen(false)
    setLightboxIndex(null)
  }

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  if (!total) {
    return (
      <section className="photo-carousel-section" id="photos">
        <div className="photo-carousel-heading">
          <div>
            <span></span>
            <h2>ФОТО</h2>
          </div>
        </div>

        <div className="photo-carousel-empty">
          <div className="photo-carousel-empty-icon">
            ◉
          </div>

          <span>ФОТОАРХИВ СКОРО</span>
        </div>
      </section>
    )
  }

  const previousPhoto = photos[previousIndex]
  const currentPhoto = photos[currentIndex]
  const nextPhoto = photos[nextIndex]

  const lightboxPhoto = lightboxIndex !== null ? photos[lightboxIndex] : null

  return (
    <section
      className="photo-carousel-section"
      id="photos"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="photo-carousel-heading">
        <div>
          <span>АРХИВ</span>
          <h2>ФОТО</h2>
        </div>

        <button
          type="button"
          className="photo-carousel-all"
          onClick={openArchive}
        >
          Смотреть весь архив
          <span>↗</span>
        </button>
      </div>

      <div className="photo-carousel">

        <button
          type="button"
          className="photo-carousel-arrow photo-carousel-arrow-left"
          onClick={goPrevious}
          aria-label="Предыдущее фото"
        >
          ←
        </button>

        <div
          className="photo-carousel-stage"
          {...carouselSwipe.handlers}
          style={{
            transform: `translateX(${carouselSwipe.dragX}px)`,
            transition: carouselSwipe.isAnimating ? 'transform 0.35s ease' : 'none',
          }}
        >

          <div className="photo-carousel-side photo-carousel-side-left">
            <img
              src={previousPhoto.src}
              alt={previousPhoto.alt}
              draggable={false}
            />
          </div>

          <div
            className="photo-carousel-main"
            onClick={() => {
              if (carouselSwipe.wasDragged()) return
              openLightbox(currentIndex)
            }}
            role="button"
            tabIndex={0}
            aria-label="Открыть фото в полный размер"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openLightbox(currentIndex)
              }
            }}
          >

            <img
              key={currentPhoto.id}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              draggable={false}
            />

            <div className="photo-carousel-overlay" />

            <div className="photo-carousel-counter">
              {String(currentIndex + 1).padStart(2, '0')}
              {' / '}
              {String(total).padStart(2, '0')}
            </div>

          </div>

          <div className="photo-carousel-side photo-carousel-side-right">
            <img
              src={nextPhoto.src}
              alt={nextPhoto.alt}
              draggable={false}
            />
          </div>

        </div>

        <button
          type="button"
          className="photo-carousel-arrow photo-carousel-arrow-right"
          onClick={goNext}
          aria-label="Следующее фото"
        >
          →
        </button>

      </div>

      {isArchiveOpen && (
        <div
          className="photo-archive-overlay"
          onClick={closeArchive}
        >
          <div
            className="photo-archive-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="photo-archive-close"
              onClick={closeArchive}
              aria-label="Закрыть архив"
            >
              ✕
            </button>

            <h3 className="photo-archive-title">Весь архив</h3>

            <div className="photo-archive-grid">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  className="photo-archive-item"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {lightboxPhoto && (
        <div
          className="photo-lightbox-overlay"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="photo-lightbox-close"
            onClick={closeLightbox}
            aria-label="Закрыть фото"
          >
            ✕
          </button>

          <div
            className="photo-lightbox-stage"
            onClick={(event) => event.stopPropagation()}
            {...lightboxSwipe.handlers}
          >
            <img
              key={lightboxPhoto.id}
              className="photo-lightbox-img"
              src={lightboxPhoto.src}
              alt={lightboxPhoto.alt}
              draggable={false}
              style={{
                transform: `translateX(${lightboxSwipe.dragX}px)`,
                transition: lightboxSwipe.isAnimating ? 'transform 0.35s ease' : 'none',
              }}
            />
          </div>

          {total > 1 && (
            <div className="photo-lightbox-counter">
              {String(lightboxIndex + 1).padStart(2, '0')}
              {' / '}
              {String(total).padStart(2, '0')}
            </div>
          )}
        </div>
      )}

    </section>
  )
}

export default PhotoCarousel