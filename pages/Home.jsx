const { Link, NavLink } = ReactRouterDOM

export function Home() {

    return <section className="home">
        <h1><span>Lee</span><span>Dor</span></h1>
        <h2>Streamline your day, one app at a time.</h2>
        <nav className="home-nav">
            <NavLink to='/about'>About</NavLink>
            <NavLink to='/mail'><img src='assets/img/gmail.svg' alt='Mail' /></NavLink>
            <NavLink to='/note'><img src='assets/img/keep.svg' alt='Notes' /></NavLink>
            <NavLink to='/book'><img src='assets/img/book.svg' alt='Books' /></NavLink>
        </nav>
    </section>
}