import '../comics-list/comics-list.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/error-message';
import useMarvelService from '../../services/marvel-service';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [firstLoad, setFirstLoad] = useState(true)

    const {error, loading, getAllComics, clearError} = useMarvelService()

    useEffect(() => {
        clearError()
        onRequest()
    }, [])

    const onRequest = (offset) => {
        console.log('запрос')
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (newArray) => {
        setFirstLoad(false)
        setOffset(offset => offset + 9)
        setComicsList(comicsList => [...comicsList, ...newArray]);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = firstLoad && !error ? <Spinner/> : null;
    const items = View(comicsList);

    let ulStyles = items.length === 0 ? {gridTemplateColumns: '1fr'} : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid"
                style={ulStyles}>
                {spinner}
                {errorMessage}
                {items}
            </ul>
            <button onClick={() => onRequest(offset)} 
                    className="button button__main button__long"
                    disabled={loading}
                    style={firstLoad ? {display: 'none'} : null}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

    function View(arr) {

        return arr.map((item, index) => {

            const {thumbnail, title, price} = item;

            let picStyles;

            if (thumbnail.includes('http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available')) {
                picStyles = {
                    objectFit : 'contain',
                    background: 'black'
                }
            }

            return(

                <li className="comics__item" key={index}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={thumbnail} alt="ultimate war" className="comics__item-img" style={picStyles}/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })
        
    }
    
}

export default ComicsList;