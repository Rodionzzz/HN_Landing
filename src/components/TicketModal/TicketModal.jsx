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

        <div className="ticket-modal-header">
          <span></span>
          <strong></strong>
        </div>

        <div className="ticket-modal-frame">
          <iframe
            src="https://qtickets.ru/event/258990?base_color=e07400"
            title="Покупка билетов на HALLOWEEN NIGHT VOL. 2"
            frameBorder="0"
          />
        </div>

      </div>
    </div>
  )
}

export default TicketModal