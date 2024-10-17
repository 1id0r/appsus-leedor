const { Link, NavLink } = ReactRouterDOM

export function AppHeader({ onSetPage }) {
  return (
    <header className='app-header'>
      <Link to='/' className='logo'>
        <img src='assets/img/Logo_Long.png' alt='Notes' />
      </Link>
      <nav>
        <NavLink to='/'>
          {' '}
          <img src='assets/img/home2.svg' alt='home' />
        </NavLink>
        <NavLink to='/about'>
          {' '}
          <img src='assets/img/aboutus2.svg' alt='about' />
        </NavLink>
        <NavLink to='/mail'>
          <img src='assets/img/gmail.svg' alt='Mail' />
        </NavLink>
        <NavLink to='/note'>
          <img src='assets/img/keep.svg' alt='Notes' />
        </NavLink>
        <NavLink to='/book'>
          <img src='assets/img/book2.svg' alt='Books' />
        </NavLink>
      </nav>
    </header>
  )
}
