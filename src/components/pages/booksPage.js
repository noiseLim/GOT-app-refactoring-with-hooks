import React from 'react';
import ItemList from '../itemList';
import GotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

function booksPage({history}) {
    
    const gotService = new GotService();

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