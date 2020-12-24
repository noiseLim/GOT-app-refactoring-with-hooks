// function gotService() {

//     const _apiBase = 'https://www.anapioficeandfire.com/api';

//     const getResource = async (url) => {
//         const res = await fetch(`${_apiBase}${url}`);
    
//         if (!res.ok) {
//           throw new Error(`Could not fetch ${url}` +
//             `, received ${res.status}`);
//         }
//         return await res.json();
//     }

//     const getAllBooks = async () => {
//         const res = await getResource(`/books/`);
//         return res.map(_transformBook)
//     }
    
//     const getBook = async (id) => {
//         const book = await getResource(`/books/${id}/`);
//         return _transformBook(book);
//     }
    
//     const getAllCharacters = async () => {
//         const res = await getResource(`/characters?page=5&pageSize=10`);
//         return res.map(_transformCharacter);
//     }
    
//     const getCharacter = async (id) => {
//         const character = await getResource(`/characters/${id}`);
//         return _transformCharacter(character);
//     }
    
//     const getAllHouses = async () => {
//         const res = await getResource(`/houses/`);
//         return res.map(_transformHouse);
//     }
    
//     const getHouse = async (id) => {
//         const house = await getResource(`/houses/${id}/`);
//         return _transformHouse(house);
//     }

//     function checkData(data) {
//         if (data) {
//             return data
//         } else {
//             return 'sorry, no data'
//         }
//     }

//     const _extractId = (item) => {
//         const idRegExp = /\/([0-9]*)$/;
//         return item.url.match(idRegExp)[1];
//     }

//     const _transformCharacter = (char) => {
//         return {
//             id: _extractId(char),
//             name: checkData(char.name),
//             gender: checkData(char.gender),
//             born: checkData(char.born),
//             died: checkData(char.died),
//             culture: checkData(char.culture)
//         };
//     }

//     const _transformHouse = (house) => {
//         return {
//             id: _extractId(house),
//             name: checkData(house.name),
//             region: checkData(house.region),
//             words: checkData(house.words),
//             titles: checkData(house.titles),
//             overload: checkData(house.overload),
//             ancestraWeapons: checkData(house.ancestraWeapons)
//         }
//     }

//     const _transformBook = (book) => {
//         return {
//             id: _extractId(book),
//             name: checkData(book.name),
//             numberOfPages: checkData(book.numberOfPages),
//             publiser: checkData(book.publiser),
//             released: checkData(book.released)
//         }
//     }
// }

// export default gotService;

export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook)
    }
    
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    checkData(data) {
        if (data) {
            return data
        } else {
            return 'sorry, no data'
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.checkData(char.name),
            gender: this.checkData(char.gender),
            born: this.checkData(char.born),
            died: this.checkData(char.died),
            culture: this.checkData(char.culture)
        };
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.checkData(house.name),
            region: this.checkData(house.region),
            words: this.checkData(house.words),
            titles: this.checkData(house.titles),
            overload: this.checkData(house.overload),
            ancestraWeapons: this.checkData(house.ancestraWeapons)
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.checkData(book.name),
            numberOfPages: this.checkData(book.numberOfPages),
            publiser: this.checkData(book.publiser),
            released: this.checkData(book.released)
        }
    }
}