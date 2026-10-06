import './Artists.css'

import { useState } from 'react'

import ArtistCard from '../ArtistCard/ArtistCard'
import { artists } from '../../data/artists'

// Выпуски HALLOWEEN NIGHT по хронологии: слева старые, справа новые.
// locked — анонс будущего выпуска: показан размытым, выбрать нельзя.
// По умолчанию открыт последний доступный (текущий) выпуск.
// Состав каждого берётся из поля vol у артистов в data/artists.js.
const EDITIONS = [
  {
    vol: 1,
    year: 2025,
    meta: '31.10.2025 · AL_ROCK · ИВАНОВО',
    caption: 'Те, с кого всё началось. Мы помним всех.',
    // Порядок карточек в VOL. 1 (кого нет в списке — в конец, по artists.js)
    order: [
      'vincent-drinks-absinth',
      'queen-of-witches',
      'madbillys-trio',
      'rockin-bones',
      'methtripper',
    ],
  },
  {
    vol: 2,
    year: 2026,
    meta: '31.10.2026 · АМПИР ЛОФТ · ИВАНОВО',
  },
  {
    vol: 3,
    year: 2027,
    locked: true,
  },
]

function getLineup(edition) {
  const lineup = artists.filter((artist) =>
    artist.vol?.includes(edition.vol)
  )

  if (edition.order) {
    // Кого нет в order — в конец, в исходном порядке
    const rank = (artist) => {
      const index = edition.order.indexOf(artist.id)
      return index === -1 ? edition.order.length : index
    }

    lineup.sort((a, b) => rank(a) - rank(b))
  }

  return lineup
}

// Для групп, игравших в нескольких выпусках: «2025 · 2026»
function getYearsBadge(artist) {
  if (!artist.vol || artist.vol.length < 2) {
    return null
  }

  return EDITIONS
    .filter((edition) => !edition.locked && artist.vol.includes(edition.vol))
    .map((edition) => edition.year)
    .join(' · ')
}

// 1 группа, 2 группы, 5 групп
function pluralizeGroups(count) {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) return 'группа'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'группы'
  return 'групп'
}

// Индекс последнего доступного выпуска — он открыт по умолчанию
const LAST_OPEN_INDEX = EDITIONS.findLastIndex((edition) => !edition.locked)

function Artists() {
  const [activeIndex, setActiveIndex] = useState(LAST_OPEN_INDEX)

  // Счётчик «всколыхиваний» тумана над закрытым выпуском: новый key
  // пересоздаёт слой тумана, и анимация вспышки проигрывается заново
  const [fogStir, setFogStir] = useState(0)

  const edition = EDITIONS[activeIndex]
  const lineup = getLineup(edition)

  // Доля линии, «пройденная» до активного выпуска: 0 — первый, 1 — последний
  const progress =
    EDITIONS.length > 1 ? activeIndex / (EDITIONS.length - 1) : 0

  return (
    <section className="section artists" id="artists">
      <div className="section-label"></div>

      <div className="section-heading">
        <h2>ARTISTS</h2>
      </div>

      {/* Таймлайн выпусков: линия «прорастает» от первого выпуска к выбранному */}
      <div
        className="artists-timeline"
        role="tablist"
        aria-label="Выпуски HALLOWEEN NIGHT"
        style={{
          '--count': EDITIONS.length,
          '--progress': progress,
        }}
      >
        <span className="artists-timeline-track" aria-hidden="true">
          <span className="artists-timeline-fill" />
        </span>

        {EDITIONS.map((item, index) => {
          const isActive = index === activeIndex

          if (item.locked) {
            // Будущий выпуск: в дымке, открыть нельзя — по нажатию туман лишь всколыхнётся
            return (
              <button
                key={item.vol}
                type="button"
                className="artists-timeline-node is-locked"
                aria-disabled="true"
                aria-label={`VOL. ${item.vol} — пока в тумане`}
                onClick={() => setFogStir((count) => count + 1)}
              >
                <span className="artists-timeline-dot" aria-hidden="true" />
                <span className="artists-timeline-vol" aria-hidden="true">VOL. {item.vol}</span>
                <span className="artists-timeline-year" aria-hidden="true">{item.year}</span>

                <span
                  key={fogStir}
                  className={`artists-timeline-fog${fogStir > 0 ? ' is-stirred' : ''}`}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.vol}
              type="button"
              role="tab"
              id={`artists-tab-${item.vol}`}
              aria-selected={isActive}
              aria-controls="artists-panel"
              className={`artists-timeline-node${isActive ? ' is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="artists-timeline-dot" aria-hidden="true" />
              <span className="artists-timeline-vol">VOL. {item.vol}</span>
              <span className="artists-timeline-year">{item.year}</span>
            </button>
          )
        })}
      </div>

      {/* key = выпуск: при переключении блок пересоздаётся и карточки
          заново проигрывают анимацию появления */}
      <div
        key={edition.vol}
        id="artists-panel"
        role="tabpanel"
        aria-labelledby={`artists-tab-${edition.vol}`}
        className="artists-edition"
      >
        <div className="artists-edition-info">
          <span className="artists-edition-meta">{edition.meta}</span>
          <span className="artists-edition-count">
            {lineup.length} {pluralizeGroups(lineup.length)}
          </span>
        </div>

        {edition.caption && (
          <p className="artists-edition-caption">{edition.caption}</p>
        )}

        <div className="artists-grid">
          {lineup.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              index={index}
              badge={getYearsBadge(artist)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Artists
