import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import { Button } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import {CharacterPage, HousesPage, BooksPage, BooksItem} from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';


import TestHooks from '../testHooks'

import './app.css';


export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    delRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                                <Button 
                                    className='rand' 
                                    color="warning"
                                    onClick={this.delRandomChar}>Delete Random Character</Button>
                            </Col>
                        </Row>
                        {/* <Route path='/' exact component={() => <h1>Hello</h1>}/> */}
                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/hooks' component={TestHooks}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                
                            return <BooksItem bookId={id}/>
                            }
                        }/>

                    </Container>
                </div>
            </Router>
            
        )
    }
};
