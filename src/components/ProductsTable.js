import React from 'react';
import {NavLink} from 'react-router-dom';
import {
    MDBBtn,
    MDBIcon,
    MDBCard,
    MDBCardHeader,
    MDBInput,
    MDBDataTable,
    MDBModal,
    MDBModalHeader,
    MDBModalFooter,
} from 'mdbreact';
import '../products.css';

const columns = [
    {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
    },
    {
        label: 'EAN',
        field: 'ean',
        sort: 'asc',
        width: 270
    },
    {
        label: 'Price ($ per kg)',
        field: 'price',
        sort: 'asc',
        width: 270
    },
    {
        label: 'Quantity (cases)',
        field: 'quantity',
        sort: 'asc',
        width: 270
    },
    {
        label: 'Type',
        field: 'type',
        sort: 'asc',
        width: 200
    },
    {
        label: 'Weight (g)',
        field: 'weight',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Color',
        field: 'color',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Active',
        field: 'activeCheckbox',
        sort: 'asc',
        width: 100
    },
    {
        label: 'Actions',
        field: 'actions',
        width: 100
    }
];

class ProductsTable extends React.Component {
    state = {
        items: {},
        modal: false,
        itemIdToDelete: null,
    };

    transformDataForTable(items) {
        let data = {
            columns: columns,
            rows: []
        };
        let hightlightStyle = {color: 'white', background: '#d32f2f', padding: '7px', borderRadius: '3px', whiteSpace: 'nowrap'}

        Object.keys(items).forEach((key) => {
            let copy = items[key];
            // Highlighting functionality if the quantity is 0
            if (copy['quantity'] === '0') {
                copy['name'] = <span style={hightlightStyle}>{copy['name']}</span>
                copy['quantity'] = <span style={hightlightStyle}>{copy['quantity']}</span>
            }
            copy['activeCheckbox'] = this.checkboxRender(copy);
            copy['actions'] = this.buttonRender(key);
            data.rows.push(copy);
        });
        return data;
    }

    openDeleteDialog(id){
        this.setState({
            itemIdToDelete: id,
            modal: !this.state.modal
        });
    }

    deleteItem() {
        this.props.deleteMethod(this.state.itemIdToDelete);
        this.toggleModal();
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    checkboxRender(item) {
        return (
            <div className="checkbox"><MDBInput checked={item.active} onClick={() => {this.props.checkMethod(item.ean)}} type="checkbox" id="checkbox2"/></div>
        )
    }

    buttonRender(id) {
        return (
            <div>
                <NavLink to={`/products/${id}`}>
                    <MDBBtn color="grey" size="sm" className="action-button"><MDBIcon far icon="eye"/> View</MDBBtn>
                </NavLink>
                <NavLink to={`/products/${id}/edit`}>
                    <MDBBtn color="blue" size="sm" className="action-button"><MDBIcon far icon="edit"/> Edit</MDBBtn>
                </NavLink>

                <MDBBtn color="red" size="sm" className="action-button" onClick={()=>{this.openDeleteDialog(id)}}>
                    <MDBIcon far icon="trash-alt"/> Delete
                </MDBBtn>
            </div>
        )
    }

    render() {
        let items = this.props.items;
        return (
            <MDBCard>
                <MDBCardHeader
                    className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mb-3">
                    <span className="white-text table-header">Warehouse Inventory</span>
                    <div>
                        <MDBBtn href="/products/create" className="btn btn-white"><MDBIcon icon="plus"/> New
                            Entry</MDBBtn>
                    </div>
                </MDBCardHeader>
                <div className="products-table">
                    <MDBDataTable
                        striped
                        hover
                        small
                        responsive
                        data={this.transformDataForTable(items)}
                    />
                </div>
                <MDBModal  isOpen={this.state.modal} toggle={this.toggleModal} size="sm">
                    <MDBModalHeader toggle={this.toggleModal}>Are you sure you want to delete
                        this item?</MDBModalHeader>
                    <MDBModalFooter className="flex-center">
                        <MDBBtn color="green" className="action-button" onClick={() => {this.deleteItem(this.state.itemIdToDelete)}}><MDBIcon
                            icon="check"/> Yes</MDBBtn>
                        <MDBBtn color="red" className="action-button" onClick={this.toggleModal}><MDBIcon
                            icon="times"/> Cancel</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBCard>

        );
    }
}

export default ProductsTable;