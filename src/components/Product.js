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
import {MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink} from "mdbreact";
import '../product.css';
import {NavLink, Redirect} from "react-router-dom";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
            "active": false,
            "history": []
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
        // Different value logic for checkbox
        const value = target.name === 'active' ? target.checked : target.value;
        const name = target.name;
        let copy = this.state.item;
        copy[name] = value;
        this.setState({item: copy});
    }

    async componentDidMount() {
        if (this.props.match.params) {
            try {
                // Get all products from localstorage
                let productList = JSON.parse(localStorage.getItem('productList'));
                for (let key in productList) {
                    // Search for the product id that we navigated to
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
        // Old data in database
        let productList = JSON.parse(localStorage.getItem('productList'));
        // New item being edited by user
        let newItem = this.state.item;
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        // Creating a new history entry upon save
        newItem['history'].push({
            'quantity': newItem.quantity,
            'price': newItem.price,
            'dateTime': dateTime
        });
        // Making sure that history count does not exceed more than 5 entries
        if (newItem['history'].length > 5) {
            newItem['history'] = newItem['history'].slice(newItem['history'].length - 5, newItem['history'].length)
        }
        productList[newItem.ean] = newItem;
        localStorage.setItem('productList', JSON.stringify(productList));
        this.setState({redirect: '/products'})
    }

    toggleModal() {
        // Shows/Hides 'Are you sure you want to delete?' modal window
        this.setState({
            modal: !this.state.modal
        });
    };

    toggle = tab => e => {
        // Changes tabs from 'Product Details' to 'Quantity Modifications' to 'Price Modifications'
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    getHistory(field) {
        // Retrieves formatted history for line graph
        let history = this.state.item.history;
        let itemHistory = [];
        for (let i = 0; i < history.length; i++) {
            itemHistory.push([history[i].dateTime, Number(history[i][field])]);
        }
        return itemHistory;
    }

    render() {
        const readOnly = this.props.readOnly;
        const create = this.props.create;
        const {productId, item} = this.state;
        if (this.state.redirect) {
            return (
                <Redirect to={this.state.redirect}/>
            )
        }

        const quantityChanges = {
            chart: {
                type: 'spline'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                min: 0
            },
            title: {
                text: 'Quantity'
            },
            series: [
                {
                    name: 'Quantity',
                    data: this.getHistory('quantity')
                }
            ],
            datalabels: {
                enabled: true
            },
        };

        const priceChanges = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Price'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                min: 0
            },
            series: [
                {
                    name: 'Price',
                    data: this.getHistory('price')
                }
            ],
            datalabels: {
                enabled: true
            },
        };

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
                                                <MDBBtn className="btn btn-outline-green mr-5" type="submit"
                                                        onClick={this.save}>
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
                                <div>
                                    <HighchartsReact highcharts={Highcharts} options={quantityChanges}/>
                                </div>
                            </MDBTabPane>
                            <MDBTabPane tabId="3" role="tabpanel">
                                <div>
                                    <HighchartsReact highcharts={Highcharts} options={priceChanges}/>
                                </div>
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