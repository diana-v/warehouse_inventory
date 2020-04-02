import * as React from 'react';

export default class EditProduct extends React.Component {

    state = {
        productId: ''
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
        const { productId } = this.state.productId;
        return (
            <h3>Requested product ID: {this.state.productId}</h3>
        );
    }
}