import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info";
import ErrorBoundary from "../error-boundaries/ErrorBoundary";
import SearchCharForm from "../char-search-form/char-search-form";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }

    return(
        <>
            <Helmet>    
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected}/>
                <div>
                    <CharInfo charId={selectedChar}/>
                    <SearchCharForm/>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage