import { Component } from "react";
import AppHeader from "../app-header/app-header";
import RandomChar from "../random-char/random-char";
import CharList from "../char-list/char-list";
import CharInfo from "../char-info/char-info";
import ErrorBoundary from "../error-boundaries/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }

  render() {
        return (
          <div className="app">
            <AppHeader/>
            <main>
              <ErrorBoundary>
                <RandomChar/>
              </ErrorBoundary>
              <div className="char__content">
                  <CharList onCharSelected={this.onCharSelected}/>
                  <CharInfo charId={this.state.selectedChar}/>
              </div>
              <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
          </div>
        )
  }
}

export default App;
