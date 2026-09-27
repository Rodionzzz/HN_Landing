import { useEffect, useMemo, useRef, useState } from 'react'
import { photos } from '../../data/photos'

const AUTOPLAY_INTERVAL = 5000
const SWIPE_THRESHOLD = 50

// Дата мероприятия vol.2 — пока не наступит, год без фото считается
// "запертым" в переключателе годов и подписывается "СКОРО".
const EVENT_DATE = new Date('2026-10-31T23:59:59')

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
  // Все года, встречающиеся в данных, плюс "следующий" год мероприятия —
  // так вкладка "2026" видна заранее, даже пока в data/photos.js для неё
  // нет ни одной фотографии.
  const years = useMemo(() => {
    const fromData = photos.map((photo) => photo.year).filter(Boolean)
    const nextYear = EVENT_DATE.getFullYear()

    return [...new Set([...fromData, nextYear])].sort((a, b) => a - b)
  }, [])

  const isYearLocked = (year) => {
    const hasPhotos = photos.some((photo) => photo.year === year)
    return !hasPhotos && new Date() < EVENT_DATE
  }

  const defaultYear =
    [...years].reverse().find((year) => !isYearLocked(year)) ?? years[0]

  const [selectedYear, setSelectedYear] = useState(defaultYear)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const yearPhotos = useMemo(
    () => photos.filter((photo) => photo.year === selectedYear),
    [selectedYear]
  )

  const total = yearPhotos.length

  // Год сменили — сбрасываем позицию, иначе индекс может указывать
  // за пределы нового, более короткого списка фото.
  useEffect(() => {
    setCurrentIndex(0)
    setLightboxIndex(null)
  }, [selectedYear])

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
    if (!total || total < 2 || isArchiveOpen || lightboxIndex !== null) {
      return
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [total, isArchiveOpen, lightboxIndex])

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

  const selectYear = (year) => {
    if (isYearLocked(year)) return
    setSelectedYear(year)
  }

  const yearTabs = years.length > 1 && (
    <div className="photo-year-tabs">
      {years.map((year) => {
        const locked = isYearLocked(year)

        return (
          <button
            key={year}
            type="button"
            className={[
              'photo-year-tab',
              year === selectedYear && 'photo-year-tab-active',
              locked && 'photo-year-tab-locked',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => selectYear(year)}
            disabled={locked}
            aria-pressed={year === selectedYear}
          >
            {year}
            {locked && <span className="photo-year-tab-soon">СКОРО</span>}
          </button>
        )
      })}
    </div>
  )

  if (!total) {
    return (
      <section className="photo-carousel-section" id="photos">
        <div className="photo-carousel-heading">
          <div>
            <span></span>
            <h2>ФОТО</h2>
          </div>
        </div>

        {yearTabs}

        <div className="photo-carousel-empty">
          <div className="photo-carousel-empty-icon">
            ◉
          </div>

          <span>ФОТОАРХИВ СКОРО</span>
        </div>
      </section>
    )
  }

  const previousPhoto = yearPhotos[previousIndex]
  const currentPhoto = yearPhotos[currentIndex]
  const nextPhoto = yearPhotos[nextIndex]

  const lightboxPhoto = lightboxIndex !== null ? yearPhotos[lightboxIndex] : null

  return (
    <section
      className="photo-carousel-section"
      id="photos"
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

      {yearTabs}

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
              src={previousPhoto.thumb || previousPhoto.src}
              alt={previousPhoto.alt}
              draggable={false}
              loading="lazy"
              decoding="async"
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
              loading="eager"
              decoding="async"
              fetchpriority="high"
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
              src={nextPhoto.thumb || nextPhoto.src}
              alt={nextPhoto.alt}
              draggable={false}
              loading="lazy"
              decoding="async"
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

            <h3 className="photo-archive-title">Весь архив {selectedYear}</h3>

            <div className="photo-archive-grid">
              {yearPhotos.map((photo, index) => (
                <button
                  key={photo.id}
                  type="button"
                  className="photo-archive-item"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={photo.thumb || photo.src}
                    alt={photo.alt}
                    draggable={false}
                    loading="lazy"
                    decoding="async"
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
              decoding="async"
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