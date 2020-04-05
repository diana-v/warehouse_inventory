import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Products from "./components/Products";
import Product from "./components/Product";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/products">
                                <Products/>
                            </Route>
                            <Route exact path="/products/create"
                                render={(props) => <Product {...props} create/>}
                                />
                            <Route exact path="/products/:productId"
                                   render={(props) => <Product {...props} readOnly/>}
                            />
                            <Route exact path="/products/:productId/edit"
                                   render={(props) => <Product {...props} />}
                            />
                            <Route path="/"><Products/></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
