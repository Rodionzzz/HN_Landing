import { useState } from 'react'

const VK_HOST = /(^|\.)(vk\.com|vk\.ru|vk\.me)$/

// Пришёл ли человек из ВК: по ?from=vk в ссылке или по referrer.
// Результат запоминаем, чтобы он не терялся при переходах по #якорям.
function detectCameFromVk() {
  try {
    if (sessionStorage.getItem('cameFromVk') === '1') return true

    const fromParam =
      new URLSearchParams(window.location.search).get('from') === 'vk'

    let fromReferrer = false
    if (document.referrer) {
      fromReferrer = VK_HOST.test(new URL(document.referrer).hostname)
    }

    const result = fromParam || fromReferrer
    if (result) sessionStorage.setItem('cameFromVk', '1')
    return result
  } catch {
    return false
  }
}

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
  const [cameFromVk] = useState(detectCameFromVk)

  // Гость пришёл из ВК → вместо второй вкладки пробуем закрыть эту.
  // Если браузер не даёт закрыть — открываем ВК в этой же вкладке.
  const handleSocialClick = (e, social) => {
    if (social.id !== 'vk' || !cameFromVk) return

    e.preventDefault()
    window.close()

    setTimeout(() => {
      window.location.href = social.href
    }, 200)
  }

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
              target={s.id === 'vk' && cameFromVk ? '_self' : '_blank'}
              rel="noreferrer"
              aria-label={s.label}
              onClick={(e) => handleSocialClick(e, s)}
            >
              <span className="footer-social-icon">{s.short}</span>
              <span className="footer-social-text">
                {s.id === 'vk' && cameFromVk ? 'Вернуться в ВК' : s.label}
              </span>
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