import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData() 
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
            .catch(() => this.onError());            
    }

    componentDidCatch() {
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError() {
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item)
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={ () => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList} = this.state;

        if (this.state.error) {
            return (
                <div className="random-block rounded">
                    <ErrorMessage/>
                </div>
            )
        }

        if (!itemList) {
            return (
                <div className="random-block rounded">
                    <Spinner/>
                </div>
            )
        }

        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}