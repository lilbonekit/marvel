class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=3e05fc9201f61b81b182d5b3fe57d4c0';
    _baseOffset = 0;

    getResource =  async (url) => {
        let res =  await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json()
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(this._transformCharacter)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }

    getTotal = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
        return res.data.total
    }

    _transformCharacter = (res) => {
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
}

export default MarvelService