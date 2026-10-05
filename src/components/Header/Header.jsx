import { useEffect, useState } from 'react'
import './Header.css'

const NAV_ITEMS = [
  { href: '#about', label: 'О мероприятии' },
  { href: '#artists', label: 'Группы' },
  { href: '#schedule', label: 'Расписание' },
  { href: '#photos', label: 'Фото' },
  { href: '#location', label: 'Локация' },
  { href: '#tickets', label: 'Билеты' },
]

// Ширина, с которой в App.css прячется десктопное меню (.nav)
const MOBILE_QUERY = '(max-width: 900px)'

function Header({ onTicketClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  // Пока меню открыто: блокируем прокрутку страницы, закрываем по Esc
  // и при повороте/расширении экрана до десктопной ширины.
  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    const mediaQuery = window.matchMedia(MOBILE_QUERY)
    const handleMediaChange = (event) => {
      if (!event.matches) {
        setIsMenuOpen(false)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleKeyDown)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      document.body.style.overflow = originalOverflow
      document.removeEventListener('keydown', handleKeyDown)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [isMenuOpen])

  const handleMenuTicketClick = () => {
    setIsMenuOpen(false)
    onTicketClick()
  }

  return (
    <>
      <header className={`header${isMenuOpen ? ' is-menu-open' : ''}`}>
        <h1 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
          <a href="#top" className="logo" aria-label="Halloween 🎃 Night" onClick={closeMenu}>
            <span className="logo-word logo-word-top">Halloween</span>

            <span className="logo-pumpkin" aria-hidden="true">
              🎃
            </span>

            <span className="logo-word logo-word-bottom">Night</span>
          </a>
        </h1>

        <nav className="nav">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-ticket"
            onClick={onTicketClick}
          >
            Купить билет
          </button>

          <button
            type="button"
            className={`header-burger${isMenuOpen ? ' is-open' : ''}`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Мобильное меню — вне <header>: у шапки есть backdrop-filter,
          и fixed-элемент внутри неё позиционировался бы от шапки, а не от экрана */}
      <div
        id="mobile-menu"
        className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        onClick={(event) => {
          // Клик по затемнённому фону под панелью закрывает меню
          if (event.target === event.currentTarget) {
            closeMenu()
          }
        }}
      >
        <div className="mobile-menu-panel">
          <nav className="mobile-menu-nav" aria-label="Разделы">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-menu-link"
                style={{ '--i': index }}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mobile-menu-footer" style={{ '--i': NAV_ITEMS.length }}>
            <div className="mobile-menu-event">
              31 ОКТЯБРЯ · 17:00 · АМПИР ЛОФТ
            </div>

            <button
              type="button"
              className="mobile-menu-ticket"
              onClick={handleMenuTicketClick}
            >
              Купить билет
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
