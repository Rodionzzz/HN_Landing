function Header({ onTicketClick }) {
  return (
    <header className="header">
      <a href="#top" className="logo" aria-label="Halloween Night">
        <span>Halloween</span>
        <span>Night</span>
      </a>

      <nav className="nav">
        <a href="#about">О мероприятии</a>
        <a href="#artists">Группы</a>
        <a href="#photos">Фото</a>
        <a href="#music">Музыка</a>
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