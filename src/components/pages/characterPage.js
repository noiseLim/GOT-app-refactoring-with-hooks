import React, {useState, useEffect} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

function CharacterPage() {
    
    const gotService = new GotService();

    const [selectedChar, updSelectedChar] = useState(130);

    useEffect(() => {
        onItemSelected();
    }, [])

    const onItemSelected = (id) => {
        updSelectedChar(id);
    }

    const itemList = (
        <ItemList
            onItemSelected={onItemSelected}
            getData={gotService.getAllCharacters}
            renderItem={({name, gender}) => `${name} (${gender})`} />
    )

    const itemDetails = (
        <ItemDetails 
            itemId={selectedChar}
            getData={gotService.getCharacter}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
        </ItemDetails>
    )

    return (
        <RowBlock
            left={itemList}
            right={itemDetails}/>
    )
}

export default CharacterPage;