import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addPhonebook, searchContact, searchContactReset } from '../actions'

class FormPhonebook extends Component {
    constructor(props) {
        super(props);
        this.state = { addButton: false, id: "", name: "", phone: "", value: '', search: false };
        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleButtonSearch = this.handleButtonSearch.bind(this)
        this.handleButtonCancel = this.handleButtonCancel.bind(this)

    }

    handleAddButton(event) {
        event.preventDefault();
        this.setState({ addButton: true })
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangePhone(event) {
        this.setState({ phone: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addPhonebook(this.state.name, this.state.phone);
        this.setState({ name: '', phone: '' })
    }

    handleButtonSearch() {
        this.setState({
            search: true
        })
    }

    handleButtonCancel() {
        this.setState({
            search: false
        })
        this.props.searchContactReset()
    }

    handleFilterChange(event) {
        let value = event.target.value
        this.setState({
            value: event.target.value
        })
        this.props.searchContact(value)
    }

    handleReset(event) {
        event.preventDefault();
        this.setState({
            value: ''
        })
        this.props.searchContactReset()
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <button className="btn mr-2 btn-primary" type="button" data-toggle="collapse" data-target="#addForm" aria-expanded="false" aria-controls="addForm">
                            <i className="fas fa-plus"></i> Add
                        </button>
                        {/* <button className="btn my-4 mr-2 btn-secondary" onClick={this.handleButtonSearch} type="button" data-toggle="collapse" data-target="#searchForm" aria-expanded="false" aria-controls="searchForm">
                            <i className="fas fa-search"></i> Search
                        </button> */}
                    </p>
                    <div className="collapse" id="addForm">
                        <div className="card-header"
                            style={{ backgroundColor: 'rgb(50, 100, 101)', color: 'white' }}>ADD CONTACT</div>
                        <div className="card-body">
                            <div className="form-inline">
                                <label className="my-1 mr-2 mx-sm-1" placeholder="Name" >Name</label>
                                <input className="form-control mx-sm-1" type="text" value={this.state.name} onChange={this.handleChangeName} />
                                <label className="my-1 mr-2 mx-sm-1" placeholder="Phone" >Phone</label>
                                <input className="form-control mx-sm-1" type="text" value={this.state.phone} onChange={this.handleChangePhone} />
                                <button className="btn btn-success" type="submit" onClick={this.handleSubmit}><i className="fas fa-save"></i> Simpan</button>
                                <button type="button" className="btn btn-danger" data-toggle="collapse" data-target="#addForm" aria-expanded="false" aria-controls="addForm"><i className="fas fa-times"></i> Cancel</button>
                            </div>
                        </div>
                    </div >
                    {/* <div className="collapse mt-3" id="searchForm">
                        <div className="card-header"
                            style={{ backgroundColor: 'rgb(50, 100, 101)', color: 'white' }}>SEARCH CONTACT</div>
                        <div className="card card-body">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon2" htmlFor="inlineFormInputGroup"><i
                                                className="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" id="inlineFormInputGroup" className="form-control" placeholder="Name / Phone Number" value={this.state.value} onChange={this.handleFilterChange} />
                                    </div>
                                </div>
                                <div className="form-group mr-2">
                                    <button type="button" onClick={this.handleReset} className="btn "><i className="fas fa-undo"></i> Reset</button>
                                </div>
                                <div className="form-group">
                                    <button type="button" onClick={this.handleButtonCancel} className="btn" data-toggle="collapse" data-target="#searchForm" aria-expanded="false" aria-controls="searchForm"><i className="fas fa-times"></i> Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </form>
            </div >
        );
    }

}

const mapDispatchToProps = dispatch => ({
    addPhonebook: (name, phone) => dispatch(addPhonebook(name, phone)),
    searchContact: (value) => { dispatch(searchContact(value)) },
    searchContactReset: () => { dispatch(searchContactReset()) }
})

export default connect(
    null,
    mapDispatchToProps
)(FormPhonebook)