import { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error-message/error-message';
import MarvelService from '../../services/marvel-service';
import './char-list.scss';

class CharList extends Component {
    
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 9,
        charEnded : false,
        hasScrolled: false,
    }

    itemRefs = [];

    setCharRef = elem => {
        this.charRef = elem
        this.itemRefs.push(elem)
    }

    focusChar = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
    }

 /*    componentDidUpdate(prevProps) {
        //Проверяем поменялся ли у нас стейт альтернатива рефам тут, для этого нужен стейт
        Айди передается в качестве пропсов
        if (this.props.selectedChar !== prevProps.selectedChar) {
            this.setState({
                selectedCharId: this.props.selectedChar
            }, () => {
                // Вызовите focusChar после обновления состояния
                this.focusChar();
            });
        }
    } */

    marvelService = new MarvelService();

    onScrollRequest = () => {
        if (!this.state.hasScrolled && window.scrollY >= (document.body.scrollHeight - window.innerHeight)) {
            this.onRequest(this.state.offset);
            this.setState({ hasScrolled: true });
        }
    }

    componentDidMount() {
        this.onRequest()
        window.addEventListener('scroll', this.onScrollRequest)

        this.setState({
            selectedCharId: this.props.selectedChar
        });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScrollRequest)
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService
            .getAllCharacters(offset)
            //Неявно передаем аргумент response который получили в зене
            .then(this.onCharListLoaded)
            .catch(this.onError)

    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharListLoaded = async (newChars) => {
        let ended = false;
        if (newChars.length < 9 || newChars[0].total <= this.state.offset || newChars[0].total <= 1553) {
          ended = true;
        }
      
        try {
          const total = await this.marvelService.getTotal();
          this.setState((prevState) => ({
            chars: [...prevState.chars, ...newChars],
            loading: false,
            newItemsLoading: false,
            offset: prevState.offset + 9,
            charEnded: ended,
            hasScrolled: false,
            total,
          }));
        } catch (error) {
          console.error("Error fetching total:", error);
        }
      };
      


    onError = () => {
        this.setState({
            loading: false,
            error: true,
            hasScrolled: false
        })
    }

    

    render() {
        // window.innerHeight - высота экрана
        // window.scrollY - сколько пикселей проскролено от верха
        // document.body.scrollHeight - общая высота

       
        const {chars, loading, error, charEnded} = this.state;
        const isError = error ? <ErrorMessage/> : null;
        const isLoading = loading ? <Spinner/> : null;
        const renderChars = !(error || loading) ? <RenderList 
                                                        chars={chars} 
                                                        onCharSelected={this.props.onCharSelected}
                                                        setCharRef={this.setCharRef}
                                                        focusChar={this.focusChar}
                                                        selectedCharId={this.state.selectedCharId}
                                                        itemRefs={this.itemRefs}/>
                                                 : null

        const listStyles = 
            isLoading ? 
            {
                "gridTemplateColumns" : "1fr",
                "justifyContent": "center", 
                "alignItems": "center"
            }
            
            : null

        const isButtonShown =
            isLoading || charEnded ?
            {
                "display" : "none"
            }

            : null

        return (
            <div className="char__list">
                <ul className="char__grid" style={listStyles}>
                    {isError}
                    {isLoading}
                    {renderChars}
                </ul>
                <button 
                    className="button button__main button__long"
                    style={isButtonShown}
                    disabled={this.state.newItemsLoading}
                    onClick={() => this.onRequest(this.state.offset)}>
                    <div className="inner">Load more</div>
                </button>
            </div>
        )
    }
}



const RenderList = ({chars, onCharSelected, setCharRef, focusChar}) => {
    return chars.map((el, i) => {

        let isContain;

        if (el.thumbnail.includes('image_not_available')) {
            isContain = 'contain'
        }

        return(
            <li className={'char__item'}
                ref={setCharRef}
                key={el.id}
                onClick={() => {
                    onCharSelected(el.id);
                    focusChar(i)
                    }}>
                <img src={el.thumbnail} 
                alt={el.name}
                style={
                {objectFit: isContain}
                }/>
                <div className="char__name">{el.name.substring(0, 27) + '...'}</div>
            </li>
        )
    })

}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}


export default CharList;