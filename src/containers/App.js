import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import Shelf from '../components/shelf/Shelf';
import FloatCart from './../components/floatCart/FloatCart';
import store from '../store';


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <main>
                        <Shelf/>
                    </main>
                    <FloatCart/>
                </div>
            </Provider>
        )
    }
}

export default App;
