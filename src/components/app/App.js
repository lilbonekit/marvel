import { lazy, Suspense } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import AppHeader from "../app-header/app-header";
import Spinner from '../spinner/Spinner';
// import { MainPage, ComicsPage, SingleComicPage } from '../pages';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage'));
const SingleCharacterPage = lazy(() => import('../pages/singleCharacterPage'));

const App = () => {
  
    return (
        <Router>
            <div className="app">
              <AppHeader/>
              <main>
                <Suspense fallback={<Spinner/>}>
                  <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/comics" element={ <ComicsPage/>}/>
                    <Route path="/comics/:comicId" element={ <SingleComicPage/>}/>
                    <Route path="/character/:characterId" element={ <SingleCharacterPage/>}/>
                    <Route path='*' element={<Page404/>}/>
                  </Routes>
                </Suspense>
              </main>
          </div>
        </Router>
    )
}

export default App;
