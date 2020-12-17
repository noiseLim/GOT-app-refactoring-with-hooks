import React, {useState, useEffect} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
// import PropTypes from 'prop-types';

function RandomChar() {
    const {char, updateChar} = useState({});
    const {loading, onLoading} = useState(true);
    const {error, onError} = useState(false);

    const gotService = new GotService();

    useEffect(() => {
        updateCharacter();
        const timerID = setInterval(updateChar, 1500);
        clearInterval(timerID);
        
    }, [])

    const updateCharacter = () => {
        const id = Math.floor(Math.random()*140 + 25);
        gotService.getCharacter(id)
            .then((data) => {
                updateChar(data);
                onLoading(false);
            })
            .catch(() => {
                onError(true);
                onLoading(false);
            });
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    
    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

// RandomChar.defaultProps = {
//     interval: 15000
// }

// RandomChar.propTypes = {
//     interval: PropTypes.number
// }

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character:</h4>
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar;