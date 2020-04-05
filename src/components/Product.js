import * as React from 'react';
import {
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBModalHeader,
    MDBModalFooter,
    MDBModal,
    MDBCardHeader
} from 'mdbreact';
import {MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink} from "mdbreact";
import '../product.css';
import {NavLink, Redirect} from "react-router-dom";
import BaseData from "../BaseData";


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
            "color": '',
            "active": false
        },
        modal: false,
        redirect: null,
        activeItem: "1"
    };

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.save = this.save.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'active' ? target.checked : target.value;
        const name = target.name;
        this.state.item[name]=value;
        this.setState(this.state);
    }

    async componentDidMount() {
        if (this.props.match.params) {
            try {
                let productList = JSON.parse(localStorage.getItem('productList'));

                for (let key in productList) {
                    if (key === this.props.match.params.productId) {
                        this.setState({
                            productId: this.props.match.params.productId,
                            item: productList[key]
                        });
                        break;
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    deleteItem() {
        let productList = JSON.parse(localStorage.getItem('productList'));
        for (let product in productList) {
            if (this.state.productId === product) {
                delete productList[product];
                break;
            }
        }
        localStorage.setItem('productList', JSON.stringify(productList));
        this.toggleModal();
        this.setState({redirect: '/products'})
    }

    save() {
        let productList = JSON.parse(localStorage.getItem('productList'));
        let newItem = this.state.item;
        productList[newItem.ean]= newItem;
        localStorage.setItem('productList', JSON.stringify(productList));
        this.setState({redirect: '/products'})
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    };

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    render() {
        const readOnly = this.props.readOnly;
        const create = this.props.create;
        const {productId, item} = this.state;
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.redirect}/>
            )
        }
        return (
            <div>
                <MDBCol className="product-column">
                    <MDBCard className="product-card">
                        <MDBCardHeader
                            className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2">
                            <div>
                                <MDBNav className="nav-tabs product-tabs">
                                    <MDBNavItem>
                                        <MDBNavLink className="product-tab" link to="#"
                                                    active={this.state.activeItem === "1"} onClick={this.toggle("1")}
                                                    role="tab">
                                            Product Details
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    {!create &&
                                    <MDBNavItem>
                                        <MDBNavLink className="product-tab" link to="#"
                                                    active={this.state.activeItem === "2"} onClick={this.toggle("2")}
                                                    role="tab">
                                            Quantity Modifications
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    }
                                    {!create &&
                                    <MDBNavItem>
                                        <MDBNavLink className="product-tab" link to="#"
                                                    active={this.state.activeItem === "3"} onClick={this.toggle("3")}
                                                    role="tab">
                                            Price Modifications
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    }
                                </MDBNav>
                            </div>
                        </MDBCardHeader>
                        <MDBTabContent activeItem={this.state.activeItem}>
                            <MDBTabPane tabId="1" role="tabpanel">
                                <MDBCardBody className="product-card-body">
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
                                                name="name"
                                                onChange={this.handleInputChange}
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
                                                name="ean"
                                                onChange={this.handleInputChange}
                                                value={item.ean}
                                                disabled={!this.props.create}
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
                                                name="price"
                                                onChange={this.handleInputChange}
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
                                                name="quantity"
                                                onChange={this.handleInputChange}
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
                                                name="type"
                                                onChange={this.handleInputChange}
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
                                                name="weight"
                                                onChange={this.handleInputChange}
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
                                                name="color"
                                                onChange={this.handleInputChange}
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
                                                name="active"
                                                onChange={this.handleInputChange}
                                                checked={item.active}
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
                                                <MDBBtn className="btn btn-outline-green mr-5" type="submit" onClick={this.save}>
                                                    <MDBIcon far icon="save" className="mr-2"/>
                                                    Save
                                                </MDBBtn>
                                            </NavLink>
                                            }
                                            <MDBBtn className="btn btn-outline-red mr-5" onClick={this.toggleModal}>
                                                <MDBIcon far icon="trash-alt" className="mr-2"/>
                                                Delete
                                            </MDBBtn>
                                        </div>
                                    </form>
                                </MDBCardBody>
                            </MDBTabPane>
                            <MDBTabPane tabId="2" role="tabpanel">
                                <p className="mt-2">
                                    Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                    voluptate odit minima. Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Nihil odit magnam minima,
                                    soluta doloribus reiciendis molestiae placeat unde eos
                                    molestias.
                                </p>
                                <p>
                                    Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                    voluptate odit minima. Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Nihil odit magnam minima,
                                    soluta doloribus reiciendis molestiae placeat unde eos
                                    molestias.
                                </p>
                            </MDBTabPane>
                            <MDBTabPane tabId="3" role="tabpanel">
                                <p className="mt-2">
                                    Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                                    voluptate odit minima. Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit. Nihil odit magnam minima,
                                    soluta doloribus reiciendis molestiae placeat unde eos
                                    molestias.
                                </p>
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBCard>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggleModal} size="sm">
                        <MDBModalHeader toggle={this.toggleModal}>Are you sure you want to delete
                            this item?</MDBModalHeader>
                        <MDBModalFooter className="flex-center">
                            <MDBBtn color="green" className="action-button" onClick={this.deleteItem}><MDBIcon
                                icon="check"/> Yes</MDBBtn>
                            <MDBBtn color="red" className="action-button" onClick={this.toggleModal}><MDBIcon
                                icon="times"/> Cancel</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBCol>
            </div>
        )
    }
}