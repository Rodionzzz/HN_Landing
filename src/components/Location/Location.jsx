function Location() {
  return (
    <section className="location-section" id="location">
      <div className="location-content">
        <div className="location-info">
          <span className="section-label">КАК ДОБРАТЬСЯ</span>

          <h2>АМПИР ЛОФТ</h2>

          <p className="location-address">
            Иваново, улица Жиделёва, 1к19
          </p>

          <a
            href="https://yandex.ru/maps/?text=Иваново,%20улица%20Жиделёва,%201к19"
            target="_blank"
            rel="noreferrer"
            className="location-link"
          >
            Открыть в Яндекс Картах
            <span>↗</span>
          </a>
        </div>

        <div className="location-map">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A0e123e058693e0899e4b39e7a94bb72abc047b719e55cfa577995d137b91434a&amp;source=constructor"
            width="100%"
            height="100%"
            frameBorder="0"
            title="АМПИР ЛОФТ — Яндекс Карты"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

export default Location
