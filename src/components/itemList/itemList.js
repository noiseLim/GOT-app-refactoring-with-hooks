import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

function ItemList({getData, renderItem, onItemSelected}) {

    const [itemList, updateList] = useState([]);
    const [loading, onLoading] = useState(true);
    const [error, onError] = useState(false);

    useEffect(() => {
        getData() 
            .then((data) => {
                updateList(data);
                onLoading(false);
            })
            .catch(() => {
                onError(true);
                onLoading(false);
            });
    }, [])

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item)
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    if (error) {
        return (
            <div className="random-block rounded">
                <ErrorMessage/>
            </div>
        )
    }

    if (!itemList || loading) {
        return (
            <div className="random-block rounded">
                <Spinner/>
            </div>
        )
    }

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;