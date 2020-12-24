import React, {useState, useEffect} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
// import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

function HousesPage() {

    const gotService = new GotService();

    const [selectedHouse, updSelectedHouse] = useState(null);
    // const [error, onError] = useState(false);

    useEffect(() => {
        onItemSelected();
    }, [])
    
    const onItemSelected = (id) => {
        updSelectedHouse(id);
    }

    // componentDidCatch() {
    //     this.setState({
    //         error: true
    //     })
    // }

    // if (this.state.error) {
    //     return <ErrorMessage/>
    // }

    const itemList = (
        <ItemList 
            onItemSelected={onItemSelected}
            getData={gotService.getAllHouses}
            renderItem={({name}) => name}/>
    )

    const itemDetails = (
        <ItemDetails
            itemId={selectedHouse}
            getData={gotService.getHouse} >
            <Field field='region' label='Region'/>
            <Field field='words' label='Words'/>
            <Field field='titles' label='Titles'/>
            <Field field='ancestralWeapons' label='Ancestral Weapons'/>
        </ItemDetails>
    )

    return (
        <RowBlock
            left={itemList}
            right={itemDetails} />
    )
}

export default HousesPage;