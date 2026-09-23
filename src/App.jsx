import './App.css'

import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import ArtistCard from './components/ArtistCard/ArtistCard'
import ArtistModal from './components/ArtistModal/ArtistModal'
import Footer from './components/Footer/Footer'

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

          {/* ABOUT */}
          <section className="section about" id="about">
            <div className="section-label">
              01 / ABOUT
            </div>

            <div className="about-content">
              <h2>
                Ночь, которую
                <span> ты не забудешь.</span>
              </h2>

              <p>
                HALLOWEEN NIGHT возвращается.
                Музыка, тёмная атмосфера и шесть
                групп на одной сцене.
              </p>
            </div>
          </section>

          {/* ARTISTS */}
          <section className="section artists" id="artists">
            <div className="section-label">
              02 / ARTISTS
            </div>

            <div className="section-heading">
              <h2>ГРУППЫ</h2>
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
              03 / PHOTOS
            </div>

            <h2>ФОТО</h2>

            <div className="photo-placeholder">
              <span>PHOTO ARCHIVE</span>
            </div>
          </section>

          {/* MUSIC */}
          <section className="section music" id="music">
            <div className="section-label">
              04 / MUSIC
            </div>

            <h2>МУЗЫКА</h2>

            <div className="music-placeholder">
              <span>LISTEN TO THE BANDS</span>
            </div>
          </section>

          {/* TICKETS */}
          <section className="section tickets" id="tickets">
            <div className="section-label">
              05 / TICKETS
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