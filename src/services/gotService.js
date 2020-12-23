function GotService(getAllBooks, getBook, getAllCharacters, getCharacter, getAllHouses, getHouse) {

    const _apiBase = 'https://www.anapioficeandfire.com/api';

    const getResource = async (url) => {
        const res = await fetch(`${_apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks = async () => {
        const res = await getResource(`/books/`);
        return res.map(_transformBook)
    }
    
    getBook = async (id) => {
        const book = await getResource(`/books/${id}/`);
        return _transformBook(book);
    }
    
    getAllCharacters = async () => {
        const res = await getResource(`/characters?page=5&pageSize=10`);
        return res.map(_transformCharacter);
    }
    
    getCharacter = async (id) => {
        const character = await getResource(`/characters/${id}`);
        return _transformCharacter(character);
    }
    
    getAllHouses = async () => {
        const res = await getResource(`/houses/`);
        return res.map(_transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await getResource(`/houses/${id}/`);
        return _transformHouse(house);
    }

    function checkData(data) {
        if (data) {
            return data
        } else {
            return 'sorry, no data'
        }
    }

    const _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    const _transformCharacter = (char) => {
        return {
            id: _extractId(char),
            name: checkData(char.name),
            gender: checkData(char.gender),
            born: checkData(char.born),
            died: checkData(char.died),
            culture: checkData(char.culture)
        };
    }

    const _transformHouse = (house) => {
        return {
            id: _extractId(house),
            name: checkData(house.name),
            region: checkData(house.region),
            words: checkData(house.words),
            titles: checkData(house.titles),
            overload: checkData(house.overload),
            ancestraWeapons: checkData(house.ancestraWeapons)
        }
    }

    const _transformBook = (book) => {
        return {
            id: _extractId(book),
            name: checkData(book.name),
            numberOfPages: checkData(book.numberOfPages),
            publiser: checkData(book.publiser),
            released: checkData(book.released)
        }
    }
}

export default GotService;