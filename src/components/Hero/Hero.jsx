import { useEffect, useState } from 'react'

// Текущий выпуск: считаем до 31 октября 2026, 17:00 (Москва)
const EVENT_TIME = new Date('2026-10-31T17:00:00+03:00').getTime()

// 1 ноября 2026, 12:00 (Москва) — момент, когда прошедший выпуск
// сменяется на следующий: VOL. 2 -> VOL. 3, и отсчёт стартует заново
const VOL_SWITCH_TIME = new Date('2026-11-01T12:00:00+03:00').getTime()

// Дата следующего выпуска (VOL. 3), до которой пойдёт новый отсчёт
const NEXT_EVENT_TIME = new Date('2027-10-31T17:00:00+03:00').getTime()

// Момент открытия страницы — нужен только для ?demo=soon (см. ниже)
const pageLoadTime = Date.now()

/*
  Симуляция для проверки без ожидания реальных дат.
  Добавь в адресную строку:
    ?demo=soon     — таймер сам досчитает до нуля за 10 секунд,
                     и ты увидишь вспышку/тряску/«НАЧАЛОСЬ» вживую
    ?demo=finished — сразу состояние "началось" (VOL. 2, оверлей)
    ?demo=vol3     — сразу состояние VOL. 3, отсчёт к 2027 году
  Без параметра — обычная логика по реальным датам.
*/
const getNow = () => {
  const demo = new URLSearchParams(window.location.search).get('demo')

  if (demo === 'soon') {
    const elapsed = Date.now() - pageLoadTime
    return EVENT_TIME - 10000 + elapsed
  }

  if (demo === 'finished') {
    return EVENT_TIME + 5000
  }

  if (demo === 'vol3') {
    return VOL_SWITCH_TIME + 5000
  }

  return Date.now()
}

const computeTimeLeft = (msDiff) => {
  if (msDiff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(
      msDiff / (1000 * 60 * 60 * 24)
    ),
    hours: Math.floor(
      (msDiff / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (msDiff / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (msDiff / 1000) % 60
    ),
  }
}

function Hero({ onTicketClick }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Номер выпуска, который показываем рядом с NIGHT (VOL. 2 / VOL. 3 ...)
  const [volNumber, setVolNumber] = useState(2)

  // true в промежутке между началом текущего выпуска и переключением
  // на следующий — показываем "НАЧАЛОСЬ" и финальные эффекты таймера
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const updateCountdown = () => {
      const now = getNow()

      if (now >= VOL_SWITCH_TIME) {
        setVolNumber(3)
        setIsFinished(false)
        setTimeLeft(computeTimeLeft(NEXT_EVENT_TIME - now))
        return
      }

      if (now >= EVENT_TIME) {
        setVolNumber(2)
        setIsFinished(true)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      setVolNumber(2)
      setIsFinished(false)
      setTimeLeft(computeTimeLeft(EVENT_TIME - now))
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
    <section
      className={`hero${isFinished ? ' is-finished' : ''}`}
      id="top"
    >

      {isFinished && (
        <div className="hero-finale-message" aria-hidden="true">
          НАЧАЛОСЬ
        </div>
      )}

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
          <span>31 OCTOBER {volNumber === 2 ? 2026 : 2027}</span>

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
            <strong>{volNumber}</strong>
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


<button
  type="button"
  className="header-ticket"
  onClick={onTicketClick}
>
  Купить билет
</button>

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
  <i></i>
</div>


      <div className="hero-corner hero-corner-left" />
      <div className="hero-corner hero-corner-right" />

    </section>
  )
}

export default Hero