function Header({ onTicketClick }) {
  return (
    <header className="header">
      <h1 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit' }}>
        <a href="#top" className="logo" aria-label="Halloween 🎃 Night">
          <span className="logo-word logo-word-top">Halloween</span>

          <span className="logo-pumpkin" aria-hidden="true">
            🎃
          </span>

          <span className="logo-word logo-word-bottom">Night</span>
        </a>
      </h1>

      <nav className="nav">
        <a href="#about">О мероприятии</a>
        <a href="#artists">Группы</a>
        <a href="#schedule">Расписание</a>
        <a href="#photos">Фото</a>
        <a href="#location">Локация</a>
        <a href="#tickets">Билеты</a>
      </nav>

<button
  type="button"
  className="header-ticket"
  onClick={onTicketClick}
>
  Купить билет
</button>

</header>
  )
}

export default Header