import './char-info.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/error-message';
import MarvelService from '../../services/marvel-service';



class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    marvelService = new MarvelService();

    updateChar = () => {
        const {charId} = this.props;

        if(!charId) {
            return
        }

        this.onCharLoading()

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

   render() {
        const {char, loading, error} = this.state

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
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    
    const renderCharComics = () => {
        const comicsList = comics.map((el, index) => {

            
            if(index <= 10) {
                return(
                    <li className="char__comics-item"
                        key={index}>
                        {el.name}
                    </li>
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