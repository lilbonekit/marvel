import useHttp from "../hooks/http.hook";

const useMarvelService = () => {

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=3e05fc9201f61b81b182d5b3fe57d4c0';
    const _baseOffset = 0;

    const {loading, request, error, clearError} = useHttp()

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformCharacter(res.data.results[0])
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const getFoundedCharacter = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return _transformFoundedCharacter(res.data.results[0])
    }

    const _transformFoundedCharacter = (char) => {
        if (!char) {
            return
        }
        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'Нет описания',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'Нет информации о количестве страниц',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    const _transformCharacter = (res) => {
        let {description} = res;


        if (!description) {
            description = 'Сорри сейчас нет инфы по этому персу'
        } else if (description.length > 50) {
            description = description.substring(0, 150) + '...'
        }

        return {
            name: res.name,
            description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            id: res.id,
            comics: res.comics.items,
            total: res.total
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics, getComic, getFoundedCharacter}
}

export default useMarvelService