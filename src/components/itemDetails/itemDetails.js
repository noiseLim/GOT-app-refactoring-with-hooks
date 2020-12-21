import React, {useState, useEffect, useRef} from 'react';
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
    console.log(itemId);

    const [item, updateItem] = useState(null);
    const [loading, onLoading] = useState(true);
    const [error, onError] = useState(false);

    const prevItemIdRef = useRef(itemId);

    useEffect(() => {
        if (prevItemIdRef.itemId !== itemId) {
            onCharDetails();
        }
    }, [])

    

    // useEffect(() => {
    //     if (prevItemIdRef !== itemId) {
    //         onCharDetails();
    //     }
    // }, [])

    function onCharDetails() {

        if (!itemId) {
            return;
        }

        onLoading(true);

        getData(itemId)
            .then((data) => {
                updateItem(data);
                console.log('OK')
                onLoading(false);
            })
            .catch(() => {
                updateItem(null);
                onError(true);
                console.log('Not OK')
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
        console.log('Spiner')

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
                        console.log(`children catch ${item.name}`)
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
}

export default ItemDetails;