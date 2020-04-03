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
        field: 'active',
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
        itemIdToDelete: null
    };

    transformDataForTable(items) {
        let data = {
            columns: columns,
            rows: []
        };
        Object.keys(items).forEach((item) => {
            let copy = items[item];
            copy['active'] = this.checkboxRender(item);
            copy['actions'] = this.buttonRender(item);
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
        this.toggle();
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

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
                <MDBModal  isOpen={this.state.modal} toggle={this.toggle} size="sm">
                    <MDBModalHeader toggle={this.toggle}>Are you sure you want to delete
                        this item?</MDBModalHeader>
                    <MDBModalFooter className="flex-center">
                        <MDBBtn color="green" className="action-button" onClick={() => {this.deleteItem(this.state.itemIdToDelete)}}><MDBIcon
                            icon="check"/> Yes</MDBBtn>
                        <MDBBtn color="red" className="action-button" onClick={this.toggle}><MDBIcon
                            icon="times"/> Cancel</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBCard>

        );
    }

    checkboxRender(id) {
        return (
            <div className="checkbox"><MDBInput type="checkbox" id="checkbox2"/></div>
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
}

export default ProductsTable;