const { Link, NavLink } = ReactRouterDOM

export function AppHeader({ onSetPage }) {
  return (
    <header className='app-header'>
      <Link to='/'className="logo">
      <img src='assets/img/Logo_Long.png' alt='Notes' />
      </Link>
      <nav>
        <NavLink onClick={() => onSetPage('home')} to='/'>Home</NavLink>
        <NavLink onClick={() => onSetPage('about')}  to='/about'>About</NavLink>
        <NavLink onClick={() => onSetPage('gmail')} to='/mail'><img src='assets/img/gmail.svg' alt='Mail' /></NavLink>
        <NavLink onClick={() => onSetPage('keep')} to='/note'><img src='assets/img/keep.svg' alt='Notes' /></NavLink>
      </nav>
    </header>
  )
}
