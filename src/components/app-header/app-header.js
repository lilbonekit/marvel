import './app-header.scss';

const AppHeader = () => {
    return(
        <header>
            <a href="#" className="app-header">
                <h1>Marvel <span>information portal</span></h1>
            </a>
            <nav>
                <a href="#" className="app-header__link app-header__link-active">Characters</a>
                /
                <a href="#" className="app-header__link">Comics</a>
            </nav>
        </header>
    )
}

export default AppHeader