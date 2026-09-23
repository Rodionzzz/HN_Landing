function Header() {
  return (
    <header className="header">
      <a href="#top" className="logo" aria-label="Halloween Night">
        <span>H</span>
        <span>N</span>
      </a>

      <nav className="nav">
        <a href="#about">О мероприятии</a>
        <a href="#artists">Группы</a>
        <a href="#photos">Фото</a>
        <a href="#music">Музыка</a>
        <a href="#tickets">Билеты</a>
      </nav>

      <a href="#tickets" className="header-ticket">
        Купить билет
      </a>
    </header>
  )
}

export default Header