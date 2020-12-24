import React from 'react';
import ItemList from '../itemList';
// import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

function booksPage({history}) {
    
    const gotService = new GotService();

    // const [error, onError] = useState(false);

    // componentDidCatch() {
    //     this.setState({
    //         error: true
    //     })
    // }

    // if (error) {
    //     return <ErrorMessage/>
    // }

    return (
        <ItemList
            onItemSelected={(itemId) => {
                history.push(itemId)
            }}
            getData={gotService.getAllBooks}
            renderItem={({name}) => name} />
    )
}

export default withRouter(booksPage);