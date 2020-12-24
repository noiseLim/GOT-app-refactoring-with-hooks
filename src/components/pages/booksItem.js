import React from 'react';
import GotService from '../../services/gotService';
import ItemDetails, {Field} from '../itemDetails';

function BooksItem({bookId}) {

    const gotService = new GotService();

    return (
        <ItemDetails
        itemId={bookId}
        getData={gotService.getBook} >
            <Field field='numberOfPages' label='Number of pages'/>
            <Field field='publisher' label='Publisher'/>
            <Field field='released' label='Released'/>
        </ItemDetails>
    )

}

export default BooksItem;