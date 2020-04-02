import React from 'react';
import '../products.css';
import ProductsTable from "./ProductsTable";

class Products extends React.Component {
    render() {
        return (
            <div className="table-wrapper">
                <div>
                    <ProductsTable items={this.props.items}/>
                </div>
            </div>
        );
    }
}

export default Products;