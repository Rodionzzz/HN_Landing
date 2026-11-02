import { useEffect } from 'react'

function TicketModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="ticket-modal"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
      aria-describedby="ticket-modal-description"
    >
      <div className="ticket-modal-window">
        <button
          type="button"
          className="ticket-modal-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <span />
          <span />
        </button>

        <div className="ticket-modal-upcoming">
          <span className="ticket-modal-upcoming-label">
            HALLOWEEN NIGHT
          </span>

          <h2 id="ticket-modal-title">
            Билеты на
            <span>VOL. 3</span>
          </h2>

          <p id="ticket-modal-description">
            Продажа откроется позже. Следите за анонсами,
            чтобы не пропустить начало продаж.
          </p>

          <button
            type="button"
            className="ticket-modal-upcoming-button"
            onClick={onClose}
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  )
}

export default TicketModal