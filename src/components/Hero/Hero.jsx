import { useEffect, useState } from 'react'

function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date('2026-10-31T17:00:00+03:00')

    const updateCountdown = () => {
      const difference = targetDate.getTime() - Date.now()

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      setTimeLeft({
        days: Math.floor(
          difference / (1000 * 60 * 60 * 24)
        ),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      })
    }

    updateCountdown()

    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])


  const addToCalendar = () => {
    const start = '20261031T170000'
    const end = '20261031T230000'

    const calendarEvent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Halloween Night//Event//RU',
      'BEGIN:VEVENT',
      `DTSTART;TZID=Europe/Moscow:${start}`,
      `DTEND;TZID=Europe/Moscow:${end}`,
      'SUMMARY:HALLOWEEN NIGHT vol.2',
      'DESCRIPTION:Самая жуткая вечеринка года',
      'LOCATION:',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob(
      [calendarEvent],
      { type: 'text/calendar;charset=utf-8' }
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'halloween-night-vol-2.ics'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }


  return (
    <section className="hero" id="top">

      <div className="hero-background">

    <div className="signal-glitch" aria-hidden="true">
      <span className="glitch-bar glitch-bar-1"></span>
      <span className="glitch-bar glitch-bar-2"></span>
      <span className="glitch-bar glitch-bar-3"></span>

      <span className="glitch-slice glitch-slice-1"></span>
      <span className="glitch-slice glitch-slice-2"></span>

      <span className="glitch-flash"></span>
    </div>


        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="fog fog-one" />
        <div className="fog fog-two" />
        <div className="fog fog-three" />

        <div className="grain" />

      </div>

      <div className="hero-lines" />


      <div className="hero-content">

        <button
          className="hero-topline hero-date"
          onClick={addToCalendar}
          type="button"
          aria-label="Добавить мероприятие в календарь"
        >
          <span>31 OCTOBER 2026</span>

          <span className="topline-line" />

          <span>17:00</span>

          <span className="calendar-tooltip">
            Добавить в календарь
          </span>
        </button>


        <div className="hero-title">

          <div className="title-small">
            HALLOWEEN
          </div>

          <div className="title-main">
            NIGHT
          </div>

          <div className="title-vol">
            <span>VOL.</span>
            <strong>2</strong>
          </div>

        </div>


        <div className="hero-bottom">

          <div className="hero-description">

            <div>
              <p>
                Самая жуткая вечеринка года
              </p>

              <small>
                Музыка · Хэллоуин · Ночь
              </small>
            </div>

          </div>


          <a
            href="#tickets"
            className="hero-ticket"
          >
            <span>
              Купить билет
            </span>

            <span className="ticket-arrow">
              ↗
            </span>
          </a>

        </div>

      </div>


      <div className="hero-countdown">

        <div className="countdown-label">
          ДО НАЧАЛА
        </div>

        <div className="countdown">

          <div className="countdown-item">
            <strong>
              {String(timeLeft.days).padStart(2, '0')}
            </strong>

            <span>
              ДНЕЙ
            </span>
          </div>


          <div className="countdown-divider">
            :
          </div>


          <div className="countdown-item">
            <strong>
              {String(timeLeft.hours).padStart(2, '0')}
            </strong>

            <span>
              ЧАСОВ
            </span>
          </div>


          <div className="countdown-divider">
            :
          </div>


          <div className="countdown-item">
            <strong>
              {String(timeLeft.minutes).padStart(2, '0')}
            </strong>

            <span>
              МИНУТ
            </span>
          </div>


          <div className="countdown-divider">
            :
          </div>


          <div className="countdown-item seconds">
            <strong>
              {String(timeLeft.seconds).padStart(2, '0')}
            </strong>

            <span>
              СЕКУНД
            </span>
          </div>

        </div>

      </div>


      <div className="hero-scroll">
        <span>
          SCROLL
        </span>

        <i />
      </div>


      <div className="hero-corner hero-corner-left" />
      <div className="hero-corner hero-corner-right" />

    </section>
  )
}

export default Hero