import './App.css'

import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ArtistCard from './components/ArtistCard/ArtistCard'
import ArtistModal from './components/ArtistModal/ArtistModal'
import Footer from './components/Footer/Footer'
import TicketModal from './components/TicketModal/TicketModal'
import Location from './components/Location/Location'
import Schedule from './components/Schedule/Schedule'
import PhotoCarousel from './components/PhotoCarousel/PhotoCarousel'

import { artists } from './data/artists'
import { asset } from './utils/asset'

function App() {
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)

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

  const openTickets = () => {
    setIsTicketModalOpen(true)
  }

  const closeTickets = () => {
    setIsTicketModalOpen(false)
  }

  return (
    <>
      <div className="site">
        <div className="fx-ambience" aria-hidden="true">
          <div className="fx-glow fx-glow-left" />
          <div className="fx-glow fx-glow-right" />

          <div className="fx-embers">
            <span className="fx-ember" style={{ left: '1.5%', animationDelay: '0s', animationDuration: '7s' }} />
            <span className="fx-ember" style={{ left: '3%', animationDelay: '2.2s', animationDuration: '9s' }} />
            <span className="fx-ember" style={{ left: '0.5%', animationDelay: '4.5s', animationDuration: '6.5s' }} />
            <span className="fx-ember" style={{ left: '4.5%', animationDelay: '1.2s', animationDuration: '8s' }} />
            <span className="fx-ember" style={{ left: '2.2%', animationDelay: '5.5s', animationDuration: '7.5s' }} />
            <span className="fx-ember" style={{ left: '5.5%', animationDelay: '3.3s', animationDuration: '6s' }} />

            <span className="fx-ember" style={{ right: '1.5%', animationDelay: '1s', animationDuration: '7.5s' }} />
            <span className="fx-ember" style={{ right: '3%', animationDelay: '3.5s', animationDuration: '6.5s' }} />
            <span className="fx-ember" style={{ right: '0.5%', animationDelay: '5.2s', animationDuration: '9s' }} />
            <span className="fx-ember" style={{ right: '4.5%', animationDelay: '0.5s', animationDuration: '7s' }} />
            <span className="fx-ember" style={{ right: '2.2%', animationDelay: '4s', animationDuration: '8.5s' }} />
            <span className="fx-ember" style={{ right: '5.5%', animationDelay: '2.6s', animationDuration: '6s' }} />
          </div>
        </div>

        <Header onTicketClick={openTickets} />

        <main>
          <Hero onTicketClick={openTickets} />

          <section id="about" className="about-section">
            <div className="about-section-poster">
              <img
                src={asset('/images/poster.jpg')}
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
                31 ОКТЯБРЯ — самый большой Halloween-вечер,
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
            <div className="section-label"></div>

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

{/* SCHEDULE */}
<Schedule />

{/* PHOTOS */}
<PhotoCarousel />

          {/* Locatio */}
<Location
/>

          {/* TICKETS */}
          <section className="section tickets" id="tickets">
            <div className="section-label"></div>

            <div className="tickets-content">
              <h2>
                УВИДИМСЯ
                <span className="night-flicker"> В НОЧИ.</span>
              </h2>

              <p>31 октября · 17:00</p>

              <button
                type="button"
                className="big-ticket"
                onClick={openTickets}
              >
                Купить билет
                <span>→</span>
              </button>
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

      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={closeTickets}
      />
    </>
  )
}

export default App