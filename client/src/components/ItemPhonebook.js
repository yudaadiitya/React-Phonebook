import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editPhonebook, deletePhonebook, resendPhonebook } from '../actions';

class ItemContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            phone: '',
            onEdit: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeContact = this.handleChangeContact.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleResend = this.handleResend.bind(this);
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeContact(event) {
        this.setState({ phone: event.target.value });
    }

    handleSave(event) {
        event.preventDefault();
        const { name, phone } = this.state;
        if (name && phone) {
            this.props.editPhonebook(name, phone);
            this.setState({ editButton: false });
        }
    }

    handleEditButton(event) {
        event.preventDefault();
        this.setState({ editButton: true, name: this.props.name, phone: this.props.phone });
    }

    handleCancel(event) {
        event.preventDefault();
        this.setState({ editButton: false });
    }

    handleDelete() {
        const { id } = this.state;
        this.props.deletePhonebook(id);
    }

    handleResend() {
        const { id, name, phone } = this.state;
        this.props.resendPhonebook(id, name, phone);
    }

    item() {
        const { no, name, phone, sent } = this.props;

        return (
            <tr>
                <td>{no + 1}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>
                    <button
                        type="submit"
                        className="btn btn-info"
                        onClick={this.handleEditButton}
                    >
                        <i className="fas fa-pencil-alt mr-1" />
                        Edit
                    </button>
                    <button
                        type="submit"
                        className="btn btn-danger ml-3"
                        onClick={sent ? this.handleDelete : this.handleResend}
                    >
                        {sent ? <i className="far fa-trash-alt mr-1" /> : <i className="fas fa-redo" />}
                        {sent ? 'Delete' : 'Resend'}
                    </button>
                </td>
            </tr>
        )
    }

    edit() {
        let { index } = this.props;

        return (
            <tr>
                <td>{index}</td>
                <td>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                    />
                </td>
                <td>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={this.state.phone}
                        onChange={this.handleChangeContact}
                    />
                </td>
                <td>
                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={this.handleSave}
                    >
                        <i className="far fa-sticky-note mr-2" />
                        Save
                </button>
                    <button
                        type="submit"
                        className="btn btn-danger ml-3"
                        onClick={this.handleCancel}
                    >
                        <i className="fas fa-window-close mr-2" />
                        Cancel
                </button>
                </td>
            </tr>
        )
    }

    render() {
        if (this.state.editButton) {
            return this.edit();
        } else {
            return this.item();
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    deletePhonebook: () => dispatch(deletePhonebook(ownProps.id)),
    resendPhonebook: () => dispatch(resendPhonebook(ownProps.id, ownProps.name, ownProps.phone)),
    editPhonebook: (name, phone) => dispatch(editPhonebook(ownProps.id, name, phone))
})

export default connect(
    null,
    mapDispatchToProps
)(ItemContact);