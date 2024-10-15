const { Link, NavLink } = ReactRouterDOM

export function Home({ onSetPage }) {

    return <section className="home">
        <h1><span>Lee</span><span>Dor</span></h1>
        <img src="assets/img/home-img.jpg"></img>
        <nav className="home-nav">
            <NavLink onClick={() => onSetPage('about')} to='/about'>About</NavLink>
            <NavLink onClick={() => onSetPage('gmail')} to='/mail'><img src='assets/img/gmail.svg' alt='Mail' /></NavLink>
            <NavLink onClick={() => onSetPage('keep')} to='/note'><img src='assets/img/keep.svg' alt='Notes' /></NavLink>
        </nav>
    </section>
}