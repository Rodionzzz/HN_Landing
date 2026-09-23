import './App.css'

import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ArtistCard from './components/ArtistCard/ArtistCard'
import ArtistModal from './components/ArtistModal/ArtistModal'
import Footer from './components/Footer/Footer'
import { events } from './data/events'

import { artists } from './data/artists'

function App() {
  const [selectedArtist, setSelectedArtist] = useState(null)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash

      const match = hash.match(/^#artist\/(.+)$/)

      if (!match) {
        setSelectedArtist(null)
        return
      }

      const artistId = match[1]

      const artist = artists.find(
        (item) => item.id === artistId
      )

      setSelectedArtist(artist || null)
    }

    handleHashChange()

    window.addEventListener(
      'hashchange',
      handleHashChange
    )

    return () => {
      window.removeEventListener(
        'hashchange',
        handleHashChange
      )
    }
  }, [])

  return (
    <>
      <div className="site">
        <Header />

        <main>
          <Hero />

<section id="about" className="about-section">
  <div className="about-section-poster">
    <img
      src="/images/poster.jpg"
      alt="HALLOWEEN NIGHT vol.2"
    />
  </div>

  <div className="about-section-content">

    <div className="about-kicker">
      🩸 HALLOWEEN NIGHT VOL. 2
    </div>

    <h2>
      Ночь, которую
      <span>ты не забудешь.</span>
    </h2>

    <p className="about-lead">
      31 ОКТЯБРЯ — большой Halloween-вечер,
      где музыка, костюмы и атмосфера
      встретятся в одном месте.
    </p>

    <div className="about-features">
      <div className="about-feature">
        <strong>🎸 7 ГРУПП ИЗ 3 ГОРОДОВ</strong>
        <span>
          Семь групп. Разные стили. Один большой Halloween-вечер.
        </span>
      </div>

      <div className="about-feature">
        <strong>👗 COSTUME PARTY</strong>
        <span>
          Доставай свой самый безумный образ.
          В эту ночь можно быть кем угодно. 🎃
        </span>
      </div>
    </div>

    <div className="about-event">
      <strong>🎃 31 ОКТЯБРЯ • START 17:00</strong>

      <span>
         🏛 АМПИР ЛОФТ / AMPiR LOFT
      </span>

      <small>
        Иваново, улица Жиделёва, 1к19
      </small>
    </div>

  </div>
</section>

          {/* ARTISTS */}
          <section className="section artists" id="artists">
            <div className="section-label">
            </div>

            <div className="section-heading">
              <h2>ARTISTS</h2>
            </div>

            <div className="artists-grid">
              {artists.map((artist, index) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  index={index}
                />
              ))}
            </div>
          </section>

          {/* PHOTOS */}
          <section className="section photos" id="photos">
            <div className="section-label">
            </div>

            <h2>ФОТО</h2>

            <div className="photo-placeholder">
              <span>PHOTO ARCHIVE</span>
            </div>
          </section>

          {/* MUSIC */}
          <section className="section music" id="music">
            <div className="section-label">
            </div>

            <h2>МУЗЫКА</h2>

            <div className="music-placeholder">
              <span>LISTEN TO THE BANDS</span>
            </div>
          </section>

          {/* TICKETS */}
          <section className="section tickets" id="tickets">
            <div className="section-label">
            </div>

            <div className="tickets-content">
              <h2>
                УВИДИМСЯ
                <span> В НОЧИ.</span>
              </h2>

              <p>
                31 октября · 17:00
              </p>

              <a
                href="#"
                className="big-ticket"
              >
                <span>Купить билет</span>
                <span>↗</span>
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ArtistModal
        artist={selectedArtist}
        onClose={() => {
          setSelectedArtist(null)
          window.history.replaceState(
            null,
            '',
            window.location.pathname + window.location.search
          )
        }}
      />
    </>
  )
}

export default App