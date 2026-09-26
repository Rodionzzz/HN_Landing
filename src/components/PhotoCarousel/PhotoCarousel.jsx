import { useEffect, useState } from 'react'
import { photos } from '../../data/photos'

const AUTOPLAY_INTERVAL = 5000

function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isArchiveOpen, setIsArchiveOpen] = useState(false)
  const [fullPhoto, setFullPhoto] = useState(null)

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

  // Автолистание карусели
  useEffect(() => {
    if (!total || total < 2 || isPaused || isArchiveOpen) {
      return
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total)
    }, AUTOPLAY_INTERVAL)

    return () => clearInterval(timer)
  }, [total, isPaused, isArchiveOpen])

  // Закрытие модалок по Esc
  useEffect(() => {
    if (!isArchiveOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') {
        return
      }

      if (fullPhoto) {
        setFullPhoto(null)
      } else {
        setIsArchiveOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isArchiveOpen, fullPhoto])

  const openArchive = () => {
    setIsArchiveOpen(true)
  }

  const closeArchive = () => {
    setIsArchiveOpen(false)
    setFullPhoto(null)
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

        <div className="photo-carousel-stage">

          <div className="photo-carousel-side photo-carousel-side-left">
            <img
              src={previousPhoto.src}
              alt={previousPhoto.alt}
            />
          </div>

          <div
            className="photo-carousel-main"
            onClick={() => setFullPhoto(currentPhoto)}
            role="button"
            tabIndex={0}
            aria-label="Открыть фото в полный размер"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                setFullPhoto(currentPhoto)
              }
            }}
          >

            <img
              key={currentPhoto.id}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
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
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  className="photo-archive-item"
                  onClick={() => setFullPhoto(photo)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {fullPhoto && (
        <div
          className="photo-fullsize-overlay"
          onClick={() => setFullPhoto(null)}
        >
          <button
            type="button"
            className="photo-fullsize-close"
            onClick={() => setFullPhoto(null)}
            aria-label="Закрыть фото"
          >
            ✕
          </button>

          <img
            className="photo-fullsize-img"
            src={fullPhoto.src}
            alt={fullPhoto.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

    </section>
  )
}

export default PhotoCarousel