import * as React from 'react';

export default class Product extends React.Component {
    state = {
        productId: 'NULL'
    };

    async componentDidMount() {
        if(this.props.match.params){
            try{
                this.setState({productId: this.props.match.params.productId})
            }
            catch (err){
                console.log(err)
            }
        }
    }

    render() {
        const { productId } = this.state;
        return (
            <h3>Requested product ID: {productId}</h3>
        );
    }
}