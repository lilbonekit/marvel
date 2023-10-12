import './char-info.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/error-message';
import useMarvelService from '../../services/marvel-service';



const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const {loading, error, getCharacter} = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;

        if(!charId) {
            return
        }

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }


    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null;


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const cutString = 'http://gateway.marvel.com/v1/public/comics/'

    const renderCharComics = () => {
        const comicsList = comics.map((el, index) => {
            
            const comicId = el.resourceURI.replace(cutString, '');
            
            if(index <= 10) {
                return(
                    <Link key={index} to={`comics/${comicId}`} style={{display : 'block'}}>
                        <li className="char__comics-item">
                            {el.name}
                        </li>
                    </Link>
                )
            } else {
                return null
            }
        })

        return comicsList.length === 0 ? 'По данному персонажу нет комиксов' : comicsList
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail}
                     alt={name}
                     style={{
                        objectFit: `${thumbnail.includes('image_not_available.jpg') ? 'contain' : null}`
                     }}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {renderCharComics()}
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;