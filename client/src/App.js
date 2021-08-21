import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route path='/' exact>
                        <Home />
                    </Route>
                    <Route path='/products' exact>
                        <AddProduct />
                    </Route>
                    <Route path='/products/:id' exact>
                        <Product />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
