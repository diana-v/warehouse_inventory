import React from 'react';
import '../products.css';
import ProductsTable from "./ProductsTable";
import BaseData from "../BaseData.js";

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.deleteItemById = this.deleteItemById.bind(this);
        this.checkItem = this.checkItem.bind(this);
    }

    state = {
        products: {}
    };

    deleteItemById(id) {
        let productList = JSON.parse(localStorage.getItem('productList'));
        for (let product in productList) {
            if (id === product) {
                delete productList[product];
                break;
            }
        }
        this.setState({products:productList});
        localStorage.setItem('productList', JSON.stringify(productList));
    }

    checkItem(id) {
        let productList = JSON.parse(localStorage.getItem('productList'));
        for (let product in productList) {
            if (id === product) {
                productList[product].active = !productList[product].active;
                break;
            }
        }
        this.setState({products:productList});
        localStorage.setItem('productList', JSON.stringify(productList));
    }

    componentDidMount() {
        let productList = localStorage.getItem('productList');
        // We found products in localstorage
        if (productList) {
            this.setState({
                products: JSON.parse(productList)
            })
        } else {
            // If localstorage is empty load BaseData
            this.setState({
                products: BaseData
            });
            localStorage.setItem('productList',JSON.stringify(BaseData));
        }
    }

    render() {
        return (
            <div className="table-wrapper">
                <div>
                    <ProductsTable deleteMethod={this.deleteItemById} items={this.state.products} checkMethod={this.checkItem}/>
                </div>
            </div>
        );
    }
}

export default Products;