import * as React from 'react';
import {MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBModalHeader, MDBModalFooter, MDBModal} from 'mdbreact';
import '../product.css';
import {NavLink, Redirect} from "react-router-dom";


export default class Product extends React.Component {
    state = {
        productId: null,
        item: {
            "name": '',
            "ean": '',
            "price": '',
            "quantity": '',
            "type": '',
            "weight": '',
            "color": ''
        },
        modal: false,
        redirect: null
    };

    async componentDidMount() {
        if (this.props.match.params) {
            try {
                this.setState({
                    productId: this.props.match.params.productId,
                    item: this.getProductById(this.props.match.params.productId)
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    getProductById(id) {
        if (id) {
            return this.props.items[id];
        }
    }

    deleteItem() {
        this.props.deleteMethod(this.state.productId);
        this.toggle();
        this.setState({redirect: '/products'})
    }

    toggle() {
        this.setState({
            modal : !this.state.modal
        });
    };

    render() {
        const readOnly = this.props.readOnly;
        const {productId, item} = this.state;
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.redirect} />
            )
        }
        return (
            <div>
                <MDBCol className="product-column">
                    <MDBCard className="product-card">
                        <MDBCardBody>
                            <form>
                                <p className="h4 text-center py-4">Requested product ID: {productId}</p>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardNameEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Name
                                    </label>
                                    <input
                                        value={item.name}
                                        disabled={readOnly}
                                        type="text"
                                        id="defaultFormCardNameEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        EAN
                                    </label>
                                    <input
                                        value={item.ean}
                                        disabled={readOnly}
                                        type="text"
                                        id="defaultFormCardEmailEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Price
                                    </label>
                                    <input
                                        value={item.price}
                                        disabled={readOnly}
                                        type="text"
                                        id="defaultFormCardEmailEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        value={item.quantity}
                                        disabled={readOnly}
                                        type="text"
                                        id="defaultFormCardEmailEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Type
                                    </label>
                                    <input
                                        value={item.type}
                                        disabled={readOnly}
                                        type="text"
                                        id="defaultFormCardEmailEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Weight
                                    </label>
                                    <input
                                        value={item.weight}
                                        disabled={readOnly}
                                        type="text"
                                        id="defaultFormCardEmailEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Color
                                    </label>
                                    <input
                                        value={item.color}
                                        disabled={readOnly}
                                        type="text"
                                        id="defaultFormCardEmailEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <br/>
                                <div>
                                    <label
                                        htmlFor="defaultFormCardEmailEx"
                                        className="grey-text font-weight-light"
                                    >
                                        Active
                                    </label>
                                    <input
                                        value={item.active}
                                        disabled={readOnly}
                                        type="checkbox"
                                        id="defaultFormCardEmailEx"
                                        className="form-control product-form-input"
                                    />
                                </div>
                                <div className="text-center py-4">
                                    <NavLink to={`/products`}>
                                        <MDBBtn className="btn btn-outline-grey mr-5" type="submit">
                                            <MDBIcon icon="backspace" className="mr-2"/>
                                            Back
                                        </MDBBtn>
                                    </NavLink>
                                    {readOnly &&
                                    <NavLink to={`/products/${productId}/edit`}>
                                        <MDBBtn className="btn btn-outline-blue mr-5" type="submit">
                                            <MDBIcon far icon="edit" className="mr-2"/>
                                            Edit
                                        </MDBBtn>
                                    </NavLink>
                                    }
                                    {!readOnly &&
                                    <NavLink to={`/products`}>
                                        <MDBBtn className="btn btn-outline-green mr-5" type="submit">
                                            <MDBIcon far icon="save" className="mr-2"/>
                                            Save
                                        </MDBBtn>
                                    </NavLink>
                                    }
                                    <MDBBtn className="btn btn-outline-red mr-5" onClick={() => {this.toggle()}}>
                                        <MDBIcon far icon="trash-alt" className="mr-2"/>
                                        Delete
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCardBody>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="sm">
                            <MDBModalHeader toggle={this.toggle}>Are you sure you want to delete
                                this item?</MDBModalHeader>
                            <MDBModalFooter className="flex-center">
                                <MDBBtn color="green" className="action-button" onClick={() => {this.deleteItem(this.state.productId)}}><MDBIcon
                                    icon="check"/> Yes</MDBBtn>
                                <MDBBtn color="red"  className="action-button" onClick={() => {this.toggle()}}><MDBIcon
                                    icon="times"/> Cancel</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBCard>
                </MDBCol>
            </div>
        )
    }
}