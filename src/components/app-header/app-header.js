import './app-header.scss';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {

    const currentStyleLink = ({isActive}) => 
        isActive ? 
        'app-header__link app-header__link-active' :
        'app-header__link'

    return(
        <header className="app-header">
            <Link to="/">
                <h1 className="app__title">Marvel <span>information portal</span></h1>
            </Link>
            <nav>
                <NavLink end to="/" 
                className={currentStyleLink}>Characters</NavLink>
                /
                <NavLink className={currentStyleLink} to="/comics">Comics</NavLink>
            </nav>
        </header>
    )
}

export default AppHeader