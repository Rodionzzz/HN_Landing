import './Schedule.css'

import { useEffect, useState } from 'react'

import ZoneModal from './ZoneModal'
import { artists } from '../../data/artists'
import {
  EVENT_DATE,
  program,
  zones,
  ZONES_HOURS,
} from '../../data/schedule'

// Время слота как Date (Москва). «00:00» в конце — это уже следующие сутки.
function toDate(time, isEnd = false) {
  const date = new Date(`${EVENT_DATE}T${time}:00+03:00`)

  if (isEnd && time === '00:00') {
    date.setDate(date.getDate() + 1)
  }

  return date.getTime()
}

// Начало и конец каждого слота. Если конец не указан (вход),
// слот длится до начала следующего пункта программы.
const slots = program.map((item, index) => {
  const start = toDate(item.start)
  const next = program[index + 1]
  const end = item.end
    ? toDate(item.end, true)
    : next
      ? toDate(next.start)
      : start

  return { ...item, startMs: start, endMs: end }
})

/*
  Проверка без ожидания 31 октября: добавь в адрес ?schedule=live —
  часы «переведутся» на 19:25 в ночь мероприятия (идёт ISSIN).
*/
function getNow() {
  const demo = new URLSearchParams(window.location.search).get('schedule')

  if (demo === 'live') {
    return toDate('19:25')
  }

  return Date.now()
}

function getStatus(slot, now) {
  if (now >= slot.endMs) return 'past'
  if (now >= slot.startMs) return 'live'
  return 'upcoming'
}

function Schedule() {
  const [now, setNow] = useState(getNow)
  const [openZone, setOpenZone] = useState(null)

  // Раз в 30 секунд обновляем «сейчас» — подсветка сама переезжает по программе
  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 30000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="schedule-section" id="schedule">
      <div className="schedule-heading">
        <span>31 ОКТЯБРЯ · ДВЕРИ В 16:00</span>
        <h2>РАСПИСАНИЕ</h2>
      </div>

      <div className="sch-layout">
        {/* ---------- Программа сцены ---------- */}
        <div className="sch-program">
          <h3 className="sch-subtitle">
            Программа сцены
          </h3>

          <p className="sch-disclaimer">
            Время выступлений и порядок коллективов могут быть скорректированы
            ближе к мероприятию — следите за обновлениями.
          </p>

          <ol className="sch-timeline">
            {slots.map((slot) => {
              const status = getStatus(slot, now)
              const artist = slot.artistId
                ? artists.find((item) => item.id === slot.artistId)
                : null

              // У групп показываем только время начала — длительность сетов
              // может меняться, поэтому время окончания не обещаем
              const time = (
                <div className="sch-time">
                  <strong>{slot.start}</strong>
                  {slot.end && !artist && <span>— {slot.end}</span>}
                </div>
              )

              const marker = <span className="sch-dot" aria-hidden="true" />

              const liveBadge = status === 'live' && (
                <span className="sch-live">Сейчас</span>
              )

              if (artist) {
                return (
                  <li
                    key={slot.start}
                    className={`sch-item is-concert is-${status}`}
                  >
                    {time}
                    {marker}

                    <a
                      href={`#artist/${artist.id}`}
                      className="sch-card sch-card-artist"
                      aria-label={`${artist.name} — открыть страницу группы`}
                    >
                      {artist.image ? (
                        <img
                          src={artist.image}
                          alt=""
                          className="sch-artist-logo"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span className="sch-artist-logo is-empty" />
                      )}

                      <span className="sch-card-text">
                        {/* Подпись «Концерт» не нужна — у групп только бейдж «Сейчас» */}
                        {liveBadge && (
                          <span className="sch-label">{liveBadge}</span>
                        )}
                        <span className="sch-title">{artist.name}</span>
                        <span className="sch-note">{artist.genre}</span>
                      </span>

                      <span className="sch-arrow" aria-hidden="true">→</span>
                    </a>
                  </li>
                )
              }

              return (
                <li
                  key={slot.start}
                  className={`sch-item is-${slot.type} is-${status}`}
                >
                  {time}
                  {marker}

                  <div className="sch-card">
                    <span className="sch-card-text">
                      <span className="sch-label">
                        {slot.label}
                        {liveBadge}
                      </span>
                      <span className="sch-title">{slot.title}</span>
                      {slot.note && (
                        <span className="sch-note">{slot.note}</span>
                      )}
                    </span>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        {/* ---------- Зоны на всю ночь ---------- */}
        <div className="sch-zones">
          <h3 className="sch-subtitle">
            Всю ночь
            <span>{ZONES_HOURS}</span>
          </h3>

          <div className="sch-zones-grid">
            {zones.map((zone, index) => (
              <button
                key={zone.id}
                type="button"
                className="sch-zone"
                style={{ '--i': index }}
                onClick={() => setOpenZone(zone)}
              >
                {/* Медальон: вращающееся кольцо + свечение + живая иконка */}
                <span className="sch-zone-orb">
                  <span className="sch-zone-ring" aria-hidden="true" />

                  {zone.photos.length > 0 ? (
                    <img
                      src={zone.photos[0]}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span
                      className={`sch-zone-icon is-${zone.id}`}
                      aria-hidden="true"
                    >
                      {zone.icon}
                    </span>
                  )}
                </span>

                <span className="sch-zone-title">{zone.title}</span>
                <span className="sch-zone-short">{zone.short}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* key — при открытии другой зоны окно начинает с первого фото */}
      <ZoneModal
        key={openZone?.id || 'closed'}
        zone={openZone}
        hours={ZONES_HOURS}
        onClose={() => setOpenZone(null)}
      />
    </section>
  )
}

export default Schedule
