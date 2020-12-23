import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemDetails.css';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

function ItemDetails({itemId, getData, children}) {

    const [item, updateItem] = useState(null);
    const [loading, onLoading] = useState(true);
    const [error, onError] = useState(false);

    useEffect(() => {
        onCharDetails();
    }, [itemId])

    function onCharDetails() {

        if (!itemId) {
            return;
        }

        onLoading(true);

        getData(itemId)
            .then((data) => {
                updateItem(data);
                onLoading(false);
            })
            .catch(() => {
                updateItem(null);
                onError(true);
            })
    }


    if (!item && error) {
        return (
            <div className="random-block rounded">
                <ErrorMessage/>
            </div>
        )
    } else if (!item) {
        return <span className="select-error">Please select a character</span>
    }        

    const {name} = item;

    if (loading) {
        return (
            <div className="char-details rounded">
                <Spinner/>
            </div>
        )
        
    }

    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
}

export default ItemDetails;