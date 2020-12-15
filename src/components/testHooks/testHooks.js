import React, {useState, useEffect} from 'react';
import './testHooks.css';

function TestHooks() {

    const [count, setCount] = useState(0);
    const [data, refreshData] = useState([{name: 'Aleksey', sex: 'male'}]);

    useEffect(() => {
        console.log(data);
    })
        
    return (
        <dev className='upd'>
            <h3>Вы кликнули {count} раз</h3>
            <button onClick={() => setCount(count + 1)}>Кнопка</button>
            {data.map(item => {
                return (
                    <h3>Name: {item.name}, sex: {item.sex}</h3>
                )
            })}
            
            <button 
                onClick={() => refreshData(data => ([...data, {name:'Igor', sex: 'male'}]))}
                >Кнопка</button>
        </dev>
    )
}

export default TestHooks;