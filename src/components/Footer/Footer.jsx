const SOCIALS = [
  {
    id: 'vk',
    label: 'ВКонтакте',
    short: 'VK',
    href: 'https://vk.ru/halloween_night_37',
  },
  // { id: 'tg', label: 'Telegram', short: 'TG', href: 'https://t.me/...' },
]

const NAV = [
  { label: 'О вечере', href: '#about' },
  { label: 'Артисты', href: '#artists' },
  { label: 'Билеты', href: '#tickets' },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glowline" aria-hidden="true" />
      <div className="footer-watermark" aria-hidden="true">
        HALLOWEEN
      </div>

      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-wordmark">
            HALLOWEEN NIGHT
            <span>VOL.2</span>
          </div>

          <div className="footer-event">
            <span>31 ОКТЯБРЯ · 17:00</span>
            <span>АМПИР ЛОФТ · ИВАНОВО</span>
          </div>
        </div>

        <nav className="footer-col" aria-label="Разделы">
          <div className="footer-col-title">Разделы</div>
          {NAV.map((item) => (
            <a key={item.href} className="footer-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer-col">
          <div className="footer-col-title">Мы в соцсетях</div>
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              className="footer-social"
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
            >
              <span className="footer-social-icon">{s.short}</span>
              <span className="footer-social-text">{s.label}</span>
              <span className="footer-social-arrow">→</span>
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© 2026 HALLOWEEN NIGHT</div>

        <div className="footer-credit">
          Power by:{' '}
          <a href="https://vk.ru/ygikzzz" target="_blank" rel="noreferrer">
            ygik_zzz
          </a>
        </div>

        <a className="footer-top-btn" href="#top" aria-label="Наверх">
          НАВЕРХ <span>↑</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer