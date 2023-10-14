import './single-comic-page.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/error-message';
import useMarvelService from '../../services/marvel-service';
import AppBanner from '../app-banner/app-banner';

const SingleCharacterPage = () => {

    const {characterId} = useParams()
    const [character, setCharacter] = useState(null)
    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateCharacter()
    }, [characterId])

    const updateCharacter = () => {
        clearError()
        getCharacter(characterId)
            .then(onCharacterLoaded)
    }

    const onCharacterLoaded = (char) => {
        setCharacter(char)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !character) ? <View character={character}/> : null;

    return(
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({character}) => {
    const {name, description, thumbnail} = character;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img" style={{objectFit: "cover"}}/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/" className="single-comic__back">Back to main page</Link>
        </div>
    )
}

export default SingleCharacterPage