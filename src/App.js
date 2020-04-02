import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Products from "./components/Products";
import Product from "./components/Product";
import EditProduct from "./components/EditProduct";
import CreateProduct from "./components/EditProduct";

class App extends React.Component {
    state = {
        products: {
            "28318217": {
                "name": "Banana",
                "ean": "28318217",
                "price": "1,30",
                "quantity": "5",
                "type": "Fruit and Veg",
                "weight": "150",
                "color": "Yellow"
            },
            "21097003": {
                "name": "Corn",
                "ean": "21097003",
                "price": "0.80",
                "quantity": "8",
                "type": "Fruit and Veg",
                "weight": "100",
                "color": "Yellow"
            },
            "98582358": {
                "name": "Cucumber",
                "ean": "98582358",
                "price": "0.40",
                "quantity": "12",
                "type": "Fruit and Veg",
                "weight": "180",
                "color": "Green"
            },
            "26294551": {
                "name": "Tomato",
                "ean": "26294551",
                "price": "0.50",
                "quantity": "2",
                "type": "Fruit and Veg",
                "weight": "100",
                "color": "Red"
            },
            "54313239": {
                "name": "Potato",
                "ean": "54313239",
                "price": "0.20",
                "quantity": "15",
                "type": "Fruit and Veg",
                "weight": "50",
                "color": "Brown"
            },
            "10003626": {
                "name": "Broccoli",
                "ean": "10003626",
                "price": "1,30",
                "quantity": "7",
                "type": "Fruit and Veg",
                "weight": "200",
                "color": "Green"
            },
            "38172175": {
                "name": "Apple",
                "ean": "38172175",
                "price": "0.65",
                "quantity": "13",
                "type": "Fruit and Veg",
                "weight": "59",
                "color": "Green"
            },
            "44487263": {
                "name": "Orange",
                "ean": "44487263",
                "price": "1.4",
                "quantity": "8",
                "type": "Fruit and Veg",
                "weight": "80",
                "color": "Orange"
            },
            "20051549": {
                "name": "Mango",
                "ean": "20051549",
                "price": "2.20",
                "quantity": "3",
                "type": "Fruit and Veg",
                "weight": "100",
                "color": "Red"
            },
            "91029451": {
                "name": "Watermelon",
                "ean": "91029451",
                "price": "1.65",
                "quantity": "2",
                "type": "Fruit and Veg",
                "weight": "2000",
                "color": "Green"
            },
            "75490096": {
                "name": "Eggs",
                "ean": "75490096",
                "price": "1.20",
                "quantity": "4",
                "type": "Dairy",
                "weight": "200",
                "color": "Brown"
            },
            "85821969": {
                "name": "Milk",
                "ean": "85821969",
                "price": "0.89",
                "quantity": "6",
                "type": "Dairy",
                "weight": "1000",
                "color": "White"
            },
            "12898800": {
                "name": "Cheese",
                "ean": "12898800",
                "price": "2.90",
                "quantity": "7",
                "type": "Dairy",
                "weight": "300",
                "color": "Yellow"
            },
            "17646888": {
                "name": "Yoghurt",
                "ean": "17646888",
                "price": "1.45",
                "quantity": "6",
                "type": "Dairy",
                "weight": "250",
                "color": "White"
            },
            "80841791": {
                "name": "Whipped Cream",
                "ean": "80841791",
                "price": "1.10",
                "quantity": "2",
                "type": "Dairy",
                "weight": "150",
                "color": "White"
            },
            "92917750": {
                "name": "Flour",
                "ean": "92917750",
                "price": "1.15",
                "quantity": "6",
                "type": "Baking",
                "weight": "2000",
                "color": "White"
            },
            "55523189": {
                "name": "Yeast",
                "ean": "55523189",
                "price": "0.10",
                "quantity": "1",
                "type": "Baking",
                "weight": "15",
                "color": "Brown"
            },
            "91899682": {
                "name": "Baking Powder",
                "ean": "91899682",
                "price": "1.05",
                "quantity": "1",
                "type": "Baking",
                "weight": "50",
                "color": "White"
            },
            "70845211": {
                "name": "Wholewheat Flour",
                "ean": "70845211",
                "price": "0.90",
                "quantity": "3",
                "type": "Baking",
                "weight": "2000",
                "color": "Brown"
            },
            "38946561": {
                "name": "Cinnamon",
                "ean": "38946561",
                "price": "0.80",
                "quantity": "1",
                "type": "Baking",
                "weight": "50",
                "color": "Brown"
            }
        }
    };

    render() {
        let products = this.state.products;
        return (
            <div className="App">
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/products"><Products items={products}/></Route>
                            <Route exact path="/products/:productId"
                                   render={(props) => <Product {...props} items={products}/>}
                            />
                            <Route exact path="/products/:productId/edit"
                                   render={(props) => <EditProduct {...props} items={products}/>}
                            />
                            <Route exact path="/products/create"><CreateProduct/></Route>
                            <Route path="/"><Products/></Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
