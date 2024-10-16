const { Link, NavLink } = ReactRouterDOM

export function AppHeader({ onSetPage }) {
  return (
    <header className='app-header'>
      <Link to='/'className="logo">
      <img src='assets/img/Logo_Long.png' alt='Notes' />
      </Link>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/mail'><img src='assets/img/gmail.svg' alt='Mail' /></NavLink>
        <NavLink to='/note'><img src='assets/img/keep.svg' alt='Notes' /></NavLink>
        <NavLink to='/book'><img src='assets/img/book.svg' alt='Books' /></NavLink>
      </nav>
    </header>
  )
}
