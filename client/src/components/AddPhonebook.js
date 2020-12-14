import React, { Component } from 'react'

export default class FormPhonebook extends Component {
    constructor(props) {
        super(props);
        this.state = { addButton: false, id: '', name: '', phone: '' };
        this.handleAddButton = this.handleAddButton.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelButton = this.handleCancelButton.bind(this);
        
    }

    handleAddButton(event) {
        event.preventDefault();
        this.setState({ addButton: true })
    }

    handleCancelButton(event) {
        event.preventDefault();
        this.setState({ addButton: false })
    }

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangePhone(event) {
        this.setState({ phone: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.add(this.state.name, this.state.phone);
        this.setState({ name: '', phone: '' })
    }

    Form() {
        return (
            <div>
                <div className="card">
                    <div className="card-header"
                        style={{ backgroundColor: 'rgb(200, 100, 111)', color: 'white' }}>Adding Form</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-inline">
                                <label className="my-1 mr-2 mx-sm-1" placeholder="Name" >Name</label>
                                <input className="form-control mx-sm-1" type="text" value={this.state.name} onChange={this.handleChangeName} />
                                <label className="my-1 mr-2 mx-sm-1" placeholder="Phone" >Phone</label>
                                <input className="form-control mx-sm-1" type="text" value={this.state.phone} onChange={this.handleChangePhone} />
                                <button className="btn btn-primary" type="submit" onClick={this.handleAddButton}>Simpan</button>
                                <button className="btn btn-danger" type="button" onClick={this.handleCancelButton}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        );
    }
    Add() {
        return (
            <div>
                <br />
                <button href='/' onClick={this.handleAddButton} type="button" className="btn btn-primary" >
                    + add
            </button>
            </div>
        )
    }

    render() {
        if (this.state.addButton) {
            return this.Form();
        }
        else {
            return this.Add();
        }
    }

}