const { Link, NavLink } = ReactRouterDOM

export function Home() {
  return (
    <React.Fragment>
      <img src='./assets/img/home-img.jpg' alt='Books' />
      <section className='home'>
        <h1>
          <span>Lee</span>
          <span>Dor</span>
        </h1>
        <h2>Streamline your day, one app at a time.</h2>
        <nav className='home-nav'>
          <NavLink to='/about'>
            <img src='./assets/img/aboutus2.svg' alt='Mail' />
          </NavLink>
          <NavLink to='/mail'>
            <img src='./assets/img/gmail.svg' alt='Mail' />
          </NavLink>
          <NavLink to='/note'>
            <img src='./assets/img/keep.svg' alt='Notes' />
          </NavLink>
          <NavLink to='/book'>
            <img src='./assets/img/book2.svg' alt='Books' />
          </NavLink>
        </nav>
      </section>
    </React.Fragment>
  )
}
